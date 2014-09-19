
// TODO: set up 6 ranges for x1,x2,x3,
// grab the leap data: leap reports x,z,y
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    SerialPort = require("serialport").SerialPort,
    leap_range = { x1: [-150,120], y1: [-20,100], z1: [40,300], x2: [-150,120], y2: [-20,100], z2: [40,300] }, // mm
    frame, palm,
    serialPort = new SerialPort("/dev/tty.NoZAP-PL2303-00001014", {
        baudrate: 115200
    }),
    servo_range = { x1: [500,2500], y1: [500,2500], z1: [500,2500], x2: [500,2500], y2: [500,2500], z2: [500,2500] };

serialPort.on("open", function () {
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data);
        // if only one hand is present
        //if (frame.hands && frame.hands.length == 1) {
        if (frame.hands && frame.hands.length >= 2) {
            // extract centre palm position in mm [x,y,z]
            palm = {  left: frame.hands[0].palmPosition,
                    right: frame.hands[1].palmPosition };

            console.log(palm.left[0],palm.left[1],palm.left[2],palm.right[0],palm.right[1],palm.right[2]);
            //console.log(map(palm[0],'x'),map(palm[2],'y'),map(palm[1],'z'));

            serialPort.write("#0 P" + map(palm.left[0],'x1') + " #1 P" + map(palm.left[2],'y1') + " #2 P" + map(palm.left[1],'z1') + " #3 P" + map(palm.right[0],'x2') + " #4 P" + map(palm.right[2],'y2') + " #5 P" + map(palm.right[1],'z2') + " T1000\r\n");
        } else {
            console.log(frame.hands.length);
        }
    });
});

// map leap input to servo range
function map(input,axis) {
    switch (axis) {
        case 'x1':
            servo=servo_range.x1;
            leap=leap_range.x1;
            break;
        case 'y1':
            servo=servo_range.y1;
            leap=leap_range.y1;
            break;
        case 'z1':
            servo=servo_range.z1;
            leap=leap_range.z1;
            break;
        case 'x2':
            servo=servo_range.x1;
            leap=leap_range.x1;
            break;
        case 'y2':
            servo=servo_range.y1;
            leap=leap_range.y1;
            break;
        case 'z2':
            servo=servo_range.z1;
            leap=leap_range.z1;
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
