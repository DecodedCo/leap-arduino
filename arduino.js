/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014, Decoded Ltd dev@decoded.com
 */

// Johnny-five speaks StandardFirmata
var five = require('johnny-five'),
    board = new five.Board(),
    led;

// Built-in functionality
board.on('ready', function() {
    led = new five.Led(13);
    led.strobe();
});
