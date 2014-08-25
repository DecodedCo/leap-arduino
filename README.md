# Leapmotion + Arduino


Getting leapmotion to talk to arduino.

## 1. Setup

1. Run ``npm install``

## 2. Leapmotion + Node.js

2. Enable websockets on Leapmotion:
	![Enable websockets on Leapmotion](http://git.decoded.co/amadeuspzs/leapmotion-arduino/raw/master/docs/leap_enable_ws.png "Enable websockets on Leapmotion")
3. Run ``node leap.js``
4. Sit-back and enjoy the raw JSON feed! Example frame in ``leap.json``

## 3. Arduino + Node.js

1. Flash the Arduino with [StandardFirmata](http://arduino.cc/en/reference/firmata):
	![Install StandardFirmata](http://git.decoded.co/amadeuspzs/leapmotion-arduino/raw/master/docs/arduino_firmata.png "Install StandardFirmata")
2. Run ``node arduino.js``

## Resources

* [Johnny-five API](https://github.com/rwaldron/johnny-five/wiki)
* [Leapmotion frame API](https://developer.leapmotion.com/documentation/cpp/devguide/Leap_Frames.html)
* [Robotic hand demo](http://www.instructables.com/id/Robotic-Hand-controlled-by-Gesture-with-Arduino-Le/)
* [Robotic lamp demo](http://xseignard.github.io/2013/06/25/interfacing-leap-motion-with-arduino-thanks-to-nodejs/)