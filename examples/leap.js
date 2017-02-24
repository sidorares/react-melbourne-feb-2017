import React, {Component} from 'react';
import {getPort} from '../port';
import ReactHardware from '../../src';
import Leap from 'leapjs';

class FlashingLed extends Component {
  state = {
    value: 1,
  };

  update = () => {
    this.setState({
      value: this.state.value === 0 ? 1 : 0,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.interval = setInterval(this.update, this.props.timer);
    }, this.props.delay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timer !== this.props.timer) {
      this.updateTimer = true;
    }
  }

  componentDidUpdate() {
    if (this.updateTimer) {
      this.updateTimer = false;
      clearInterval(this.interval);
      this.interval = setInterval(this.update, this.props.timer);
    }
  }

  render() {
    return (
      <pin
        pin={this.props.pin}
        value={this.state.value}
        mode={'OUTPUT'}
      />
    );
  }
}

FlashingLed.defaultProps = {delay: 0, timer: 1000};

class PulsingLed extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {value: 0, pin: props.pin};
  }

  componentDidMount() {
    const controller = new Leap.Controller();
    controller.on('frame', frame => {
      if (frame.hands && frame.hands[0]) {
        const n = frame.hands[0].palmNormal;
        const angle = n[0]*50 + 120;
        this.setState({value: angle});
      }
    });
    controller.connect();
  }

  render() {
    return (
      <pin
        pin={this.state.pin}
        value={this.state.value}
        mode={'PWM'}
      />
    );
  }
}

const Application = () => [
  <PulsingLed pin={9} />,
  <FlashingLed pin={13} delay={1000} />,
];

ReactHardware.render(
  <Application />,
  getPort(),
  (inst) => {
    console.log('Rendered <%s />', 'Devtools demonstration');
  }
);