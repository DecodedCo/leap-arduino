// Map six servos to two hands, trip axis for each hand

// Define acceptable ranges, see leap-range.js

leap_ranges = Array(
  Array(
    Array(-250,100),
    Array(70,550),
    Array(-100,250)
    ),
  Array(
    Array(-350,270),
    Array(40,550),
    Array(-80,250)
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
            // map x,y,z positions of leap to servos
            //console.log("input",palm[0]);
            //console.log("output", palm[0].map(1,2))
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
