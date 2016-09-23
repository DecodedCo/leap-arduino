/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014, Decoded Ltd dev@decoded.com
 */

// Map six servos to two hands, trip axis for each hand

// Define acceptable ranges, see leap-range.js

leap_ranges = Array(
  Array(
    Array(-250,-70),
    Array(50,500),
    Array(-100,200)
    ),
  Array(
    Array(40,300),
    Array(50,500),
    Array(-100,200)
    )
  );

servo_ranges = Array(
  Array(
    Array(0,179),
    Array(0,179),
    Array(0,179)
    ),
  Array(
    Array(0,179),
    Array(0,179),
    Array(0,179)
    )
  );

// grab the leap data
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    // mm range of leap motion to use, see leap-range.js to find
    frame, palm = Array();

// parse the data and respond
board.on('ready', function() {
    // setup six servos on the six pwn pins of an Arduino Uno
    servos = Array(
      Array(
        new five.Servo({ pin: 3 }),
        new five.Servo({ pin: 5 }),
        new five.Servo({ pin: 6 })
        ),
      Array(
        new five.Servo({ pin: 9 }),
        new five.Servo({ pin: 10 }),
        new five.Servo({ pin: 11 }))
    );

    // set to 90
    servos.forEach(function(servo) {
      servo.forEach(function(s) {
        s.to(90);
      });
    });

    ws.on('message', function(data, flags) {
        frame = JSON.parse(data);
        if (frame.hands && frame.hands.length == 2) {
            // extract centre palm position in mm [x,y,z]
            palm[0] = frame.hands[0].palmPosition;
            palm[1]  = frame.hands[1].palmPosition;

            // make sure the 0th palm is always the left one
            if (palm[1][0] < (palm[0][0])) {
              var newpalm = Array();
              newpalm[1]=palm[0];
              newpalm[0]=palm[1];
              palm=newpalm;
            }
            // map x,y,z positions of leap to servos
            //console.log("output", palm[0].map(1,2))
            //console.log("left:", palm[0][2]);
            //console.log("right:", palm[1][2]);

            for (hand=0; hand<2; hand++) {
              for (axis=0; axis<3; axis++) {
                servos[hand][axis].to(palm[hand][axis].map(hand,axis));
              }
            }
        }
    });
});

// map two number ranges, adapted from SO: 10756313
Number.prototype.map = function (hand, axis) {
  var output = Math.round((this - leap_ranges[hand][axis][0]) * (servo_ranges[hand][axis][1] - servo_ranges[hand][axis][0]) / (leap_ranges[hand][axis][1] - leap_ranges[hand][axis][0]) + servo_ranges[hand][axis][0]);

  // check output is within range, or cap
  output = (output > servo_ranges[hand][axis][1]) ? servo_ranges[hand][axis][1] : output;
  output = (output < servo_ranges[hand][axis][0]) ? servo_ranges[hand][axis][0] : output;
  return output;
}
