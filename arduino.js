// Johnny-five speaks StandardFirmata
var five = require('johnny-five'),
    board = new five.Board(),
    led;

// Built-in functionality
board.on('ready', function() {
    led = new five.Led(13);
    led.strobe();
});
