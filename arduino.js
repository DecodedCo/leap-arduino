var five = require('johnny-five'),
    board = new five.Board(),
    led;

board.on('ready', function() {
    led = new five.Led(13);
    led.strobe();
});
