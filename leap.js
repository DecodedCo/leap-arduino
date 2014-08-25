var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');

ws.on('message', function(data, flags) {
    console.log(data);
});
