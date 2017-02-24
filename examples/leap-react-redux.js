import React, {Component} from 'react';
import {getPort} from '../port';
import ReactHardware from '../../src';
import {createStore} from 'redux';
import Leap from 'leapjs';
import {Provider, connect} from 'react-redux';

class LeapServo extends Component {
  componentDidMount() {
    const controller = new Leap.Controller();
    controller.on('frame', frame => {
      if (frame.hands && frame.hands[0]) {
        const n = frame.hands[0].palmNormal;
        const angle = n[0]*50 + 80;
        this.props.setAngle(angle);
      }
    });
    controller.connect();
  }

  render() {
    return (
      <pin
        pin={this.props.pin}
        value={this.props.value}
        mode={'PWM'}
      />
    );
  }
}

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

const mapStateToProps = state => {
  return {angle: state, pin: 10};
};

const mapDispatchToProps = (dispatch) => {
  return ({
    setAngle: angle => dispatch({
      type: 'SET_ANGLE',
      payload: angle
    })
  });
};

const Application = connect(mapStateToProps, mapDispatchToProps)(
  ({angle, pin, setAngle}) => (<LeapServo value={angle} pin={pin} setAngle={setAngle}/>)
);

const store = createStore(hand);
ReactHardware.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  getPort(),
  (inst) => {
    console.log('Rendered <%s />', 'leap + react-redux + devtools demonstration');
  }
);
