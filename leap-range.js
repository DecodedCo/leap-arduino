/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014, Decoded Ltd dev@decoded.com
 */

// Find the max and min range (in mm) of your leap motion
// Run for a few minutes while moving hands around

// startup
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    frame,
    palm = Array(),
    min = Array(Array(1e4,1e4,1e4), Array(1e4,1e4,1e4)),
    max = Array(Array(-1e4,-1e4,-1e4), Array(-1e4,-1e4,-1e4));

// process leap data
ws.on('message', function(data, flags) {
    frame = JSON.parse(data);
    // both hands at once
    if (frame.hands && frame.hands.length > 1) {
        // output x,y,z range in mm from controller
        // y is up down
        // x is left right
        // z is forward backward
        // left hand is 0, right hand is 1
        palm[0] = frame.hands[0].palmPosition;
        palm[1]  = frame.hands[1].palmPosition;
        // for both palms
        for (i=0; i<2; i++) {
            // for each axis
            for (j=0; j<3; j++) {
                min[i][j] = (palm[i][j] < min[i][j]) ? palm[i][j] : min[i][j];
                max[i][j] = (palm[i][j] > max[i][j]) ? palm[i][j] : max[i][j];
            }
        }
        console.log("Min", min);
        console.log("Max", max);
    }
});
