# Leapmotion + Arduino

Getting leapmotion to talk to arduino.

Top level: Leapmotion makes data available via websockets on ```ws://127.0.0.1:6437```. Node.js can parse this. There is also a Node.js library for talking to Arduino called Johnny-five. You need something called StandardFirmata which standardises commands sent between the Arduino and a host computer, which Johnny-five speaks.

**Note: the `serialport` library only works with node 0.12.x**

## 1. Setup

1. Install [nodejs](http://www.nodejs.org/)
1. Run ``npm install``

## 2. Leapmotion + Node.js

2. Enable websockets on Leapmotion:
	![Enable websockets on Leapmotion](docs/leap_enable_ws.png?raw=true "Enable websockets on Leapmotion")
3. Run ``node leap.js``
4. Sit-back and enjoy the raw JSON feed! Example frame in ``leap.json``

## 3. Arduino + Node.js

1. Flash the Arduino with [StandardFirmata](http://arduino.cc/en/reference/firmata):
	![Install StandardFirmata](docs/arduino_firmata.png?raw=true "Install StandardFirmata")
2. Run ``node arduino.js``

## 4. Arduino + Leapmotion via Node.js

1. Run ``node leap-arduino.js`` (ref [@xavier_seignard](http://xseignard.github.io/2013/06/25/interfacing-leap-motion-with-arduino-thanks-to-nodejs/))
2. Placing one or more hands above leap will switch built-in LED on pin 13 on, otherwise off.
3. Run ``node leap-gestures.js``
4. You should see console output for a Screen Tap, Key Tap, Circle and Swipe.

## 5. Detecting valid ranges from your Leapmotion

1. Run ``node leap-range.js``
2. Move both hands around for a while in all directions
3. Stop program when you stop seeing changes. The final values are the min and max ranges (in mm) of your current setup.

## 6. Leapmotion + Servo (via Arduino and Node.js)

1. Wire up a servo to pin 9.
2. Run ```node servo.js```.
3. Tweak ranges in code if need (servo and leap). Here is a demo video:
	[![Leap Servo demo](http://img.youtube.com/vi/DMbuZKZWZlk/0.jpg)](https://www.youtube.com/watch?v=DMbuZKZWZlk)

## 7. Leapmotion + 6 Servos

Tested using 6 degrees of freedom robot arm from: http://www.lynxmotion.com/c-130-al5d.aspx

1. Open ``six-servos.js`` and adjust parameters
2. Run ``node six-servos.js``

## Resources

* [Johnny-five API](https://github.com/rwaldron/johnny-five/wiki)
* [Leapmotion API](https://developer.leapmotion.com/documentation/cpp/api/Leap_Classes.html)
* [Robotic hand demo](http://www.instructables.com/id/Robotic-Hand-controlled-by-Gesture-with-Arduino-Le/)
* [Robotic lamp demo](http://xseignard.github.io/2013/06/25/interfacing-leap-motion-with-arduino-thanks-to-nodejs/)
