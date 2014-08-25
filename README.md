# Leapmotion + Arduino


Getting leapmotion to talk to arduino.

## 1. Setup

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