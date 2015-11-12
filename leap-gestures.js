// Leap motion enables a websocket with all frame data
var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');

// On successful connection
ws.onopen = function(event) {
  var enableMessage = JSON.stringify({enableGestures: true});
  ws.send(enableMessage); // Enable gestures
};

// We can parse this
ws.on('message', function(data, flags) {
  frame = JSON.parse(data);
  if(frame.gestures && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              break;
        }
    });
  }
});
