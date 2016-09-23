/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2014, Decoded Ltd dev@decoded.com
 */

// Leap motion enables a websocket with all frame data
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');

// We can parse this
ws.on('message', function(data, flags) {
    console.log(data);
});
