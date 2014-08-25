// Leap motion enables a websocket with all frame data
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');

// We can parse this
ws.on('message', function(data, flags) {
    console.log(data);
});
