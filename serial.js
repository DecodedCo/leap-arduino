// TODO: set up 6 ranges for x1,x2,x3,
// grab the leap data: leap reports x,z,y
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    SerialPort = require("serialport").SerialPort,
    leap_range = { x: [-150,120], y: [-20,100], z: [40,300] }, // mm
    frame, palm,
    serialPort = new SerialPort("/dev/tty.NoZAP-PL2303-00001014", {
        baudrate: 115200
    }),
    servo_range = { x: [500,2500], y: [500,2500], z: [500,2500] };

serialPort.on("open", function () {
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data);
        // if only one hand is present
        //if (frame.hands && frame.hands.length == 1) {
        if (frame.hands && frame.hands.length >= 2) {
            // extract centre palm position in mm [x,y,z]
            palm = {  left: frame.hands[0].palmPosition,
                    right: frame.hands[1].palmPosition };

            //console.log(palm[0],palm[1],palm[2]);
            //console.log(map(palm[0],'x'),map(palm[2],'y'),map(palm[1],'z'));

            serialPort.write("#0 P" + map(palm.left[0],'x') + " #1 P" + map(palm.left[2],'y') + " #2 P" + map(palm.left[1],'z') + " #3 P" + map(palm.right[1],'z') + " #4 P" + map(palm.right[1],'z') + " #5 P" + map(palm.right[1],'z') + " T1000\r\n");
        } else {
            console.log(frame.hands.length);
        }
    });
});

// map leap input to servo range
function map(input,axis) {
    switch (axis) {
        case 'x':
            servo=servo_range.x;
            leap=leap_range.x;
            break;
        case 'y':
            servo=servo_range.y;
            leap=leap_range.y;
            break;
        case 'z':
            servo=servo_range.z;
            leap=leap_range.z;
    }

    var pos = Math.round(  // round to integer
        servo[0] + ( (servo[1]-servo[0]) / (leap[1]-leap[0]) )
            * (input - leap[0])
    );

    // bounds checking
    pos = pos > servo[1] ? servo[1] : pos;
    pos = pos < servo[0] ? servo[0] : pos;

    return pos;
}

function sleep(millis) {
    setTimeout(function() {}, millis);
}
