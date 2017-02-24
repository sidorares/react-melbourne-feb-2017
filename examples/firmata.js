const firmata = require('firmata');
const Leap = require('leapjs');
const port = '/dev/cu.usbmodem1411';

const board = new firmata.Board(port, () => {
  board.pinMode(10, board.MODES.SERVO);
  board.servoConfig(10, 0, 200);
  const controller = new Leap.Controller();
  controller.on('frame', frame => {
    if (frame.hands && frame.hands[0]) {
      const n = frame.hands[0].palmNormal;
      const angle = n[0]*50 + 80;
      board.servoWrite(10, angle);
    }
  });
  controller.connect();
});
