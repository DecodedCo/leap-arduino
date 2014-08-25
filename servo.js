// grab the leap data
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    five = require('johnny-five'),
    board = new five.Board(),
    leap_range = [-100,100], // mm range of leap motion to use
    frame, palm;

// parse the data and respond
board.on('ready', function() {
    // setup a servo on pin 9
    servo = new five.Servo({
      pin: 9,
      range: [9, 169] // dependent on servo
    });

    // set to midpoint
    servo.to(90);

    ws.on('message', function(data, flags) {
        frame = JSON.parse(data);
        // if only one hand is present
        if (frame.hands && frame.hands.length == 1) {
            // extract centre palm position in mm [x,y,z]
            palm = frame.hands[0].palmPosition;
            // map x position of leap to servo
            // console.log(map(palm[0]))
            servo.to(map(palm[0]));
        }
    });
});

// map leap input to servo range
function map(input) {
    var pos = Math.round(  // round to integer
        servo.range[1] - (  // test servo was reversed (e.g. 170 to 10)
            ( (servo.range[1]-servo.range[0]) / (leap_range[1]-leap_range[0]) )
            * (input - leap_range[0])
        ) + servo.range[0]
    );
    // bounds checking
    pos = pos > servo.range[1] ? servo.range[1] : pos;
    pos = pos < servo.range[0] ? servo.range[0] : pos;
    return pos;
}
