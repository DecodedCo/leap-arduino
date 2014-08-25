# Leapmotion + Arduino

Getting leapmotion to talk to arduino. 

Top level: Leapmotion makes data available via websockets on ```ws://127.0.0.1:6437```. Node.js can parse this. There is also a Node.js library for talking to Arduino called Johnny-five. You need something called StandardFirmata which standardises commands sent between the Arduino and a host computer, which Johnny-five speaks.

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

## 4. Arduino + Leapmotion via Node.js

1. Run ``node leap-arduino.js``
2. Placing two hands above leap will switch built-in LED on pin 13 on, otherwise off.
3. Sit-back and think of the possibilities!

## Resources

* [Johnny-five API](https://github.com/rwaldron/johnny-five/wiki)
* [Leapmotion frame API](https://developer.leapmotion.com/documentation/cpp/devguide/Leap_Frames.html)
* [Robotic hand demo](http://www.instructables.com/id/Robotic-Hand-controlled-by-Gesture-with-Arduino-Le/)
* [Robotic lamp demo](http://xseignard.github.io/2013/06/25/interfacing-leap-motion-with-arduino-thanks-to-nodejs/)