import React, {Component} from 'react';
import {getPort} from '../port';
import ReactHardware from '../../src';
import { createStore } from 'redux';
import Leap from 'leapjs';

const PulsingLed = props => (
  <pin
    pin={props.pin}
    value={props.value}
    mode={'PWM'}
  />
);

const hand = (state, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'SET_ANGLE':
      return action.payload;
    default:
      return state;
  }
};

const Application = (a) => (<PulsingLed pin={10} value={a}/>);
const store = createStore(hand);
const render = () => {
  ReactHardware.render(
    <Application angle={store.getState()}/>,
    getPort(),
    (inst) => {
      console.log('Rendered <%s />', 'Devtools demonstration');
    }
  );
};
render();
store.subscribe(render);

const controller = new Leap.Controller();
controller.on('frame', frame => {
  if (frame.hands && frame.hands[0]) {
    const n = frame.hands[0].palmNormal;
    const angle = n[0]*50 + 80;
    store.dispatch({
      type: 'SET_ANGLE',
      payload: angle
    });
  }
});
controller.connect();
