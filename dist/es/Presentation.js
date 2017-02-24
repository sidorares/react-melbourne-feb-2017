import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Route } from 'react-router-dom';
import DefaultTheme from './DefaultTheme';
import { presentationContext } from './PropTypes';
import TouchNav from './TouchNav';

var Presentation = function (_Component) {
  _inherits(Presentation, _Component);

  function Presentation() {
    _classCallCheck(this, Presentation);

    return _possibleConstructorReturn(this, (Presentation.__proto__ || _Object$getPrototypeOf(Presentation)).apply(this, arguments));
  }

  _createClass(Presentation, [{
    key: 'render',
    value: function render() {
      var Router = this.props.router;


      return React.createElement(
        Router,
        null,
        React.createElement(PresentationInner, this.props)
      );
    }
  }]);

  return Presentation;
}(Component);

// Separate inner class due to Router context dependencies.


Presentation.defaultProps = {
  disableTheme: false,
  router: HashRouter
};
export default Presentation;
process.env.NODE_ENV !== "production" ? Presentation.propTypes = {
  children: PropTypes.any.isRequired,
  disableTheme: PropTypes.bool.isRequired,
  router: PropTypes.any.isRequired
} : void 0;

var PresentationInner = function (_Component2) {
  _inherits(PresentationInner, _Component2);

  function PresentationInner(props, context) {
    _classCallCheck(this, PresentationInner);

    var _this2 = _possibleConstructorReturn(this, (PresentationInner.__proto__ || _Object$getPrototypeOf(PresentationInner)).call(this, props, context));

    _this2.state = {
      pluginProps: {}
    };

    _this2._index = 0;
    _this2._slideIndex = 0;
    _this2._slideIndexMap = {};
    _this2._stepIndex = 0;

    _this2.getSlideIndex = _this2.getSlideIndex.bind(_this2);
    _this2.getSlideMetadata = _this2.getSlideMetadata.bind(_this2);
    _this2.getStepIndex = _this2.getStepIndex.bind(_this2);
    _this2.goBack = _this2.goBack.bind(_this2);
    _this2.goForward = _this2.goForward.bind(_this2);
    _this2.goToSlide = _this2.goToSlide.bind(_this2);
    _this2.setPluginProps = _this2.setPluginProps.bind(_this2);
    _this2._onKeyDown = _this2._onKeyDown.bind(_this2);
    return _this2;
  }

  _createClass(PresentationInner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.addEventListener('keydown', this._onKeyDown);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._parseLocation(window.location);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('keydown', this._onKeyDown);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this._parseLocation(window.location);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var pluginProps = this.state.pluginProps;


      return {
        pluginProps: pluginProps,
        presentation: this
      };
    }
  }, {
    key: 'getSlideIndex',
    value: function getSlideIndex() {
      return this._slideIndex;
    }
  }, {
    key: 'getSlideMetadata',
    value: function getSlideMetadata(slide) {
      var slideIndex = this._index;

      this._slideIndexMap[slideIndex] = slide;
      this._index++;

      var path = this._createPath({ slideIndex: slideIndex });

      return {
        path: path,
        slideIndex: slideIndex
      };
    }
  }, {
    key: 'getStepIndex',
    value: function getStepIndex() {
      return this._stepIndex;
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      var slideIndex = this._slideIndex;
      var stepIndex = this._stepIndex;

      if (stepIndex > 0) {
        this.goToSlide({
          slideIndex: slideIndex,
          stepIndex: stepIndex - 1
        });
      } else if (slideIndex > 0) {
        slideIndex--;

        // Ensure this slide has been processed at least once so we can accurately access the step-count
        this.goToSlide({
          slideIndex: slideIndex
        });

        stepIndex = this._getNumStepsForSlide(slideIndex) - 1;

        this.goToSlide({
          slideIndex: slideIndex,
          stepIndex: stepIndex
        });
      }
    }
  }, {
    key: 'goForward',
    value: function goForward() {
      var slideIndex = this._slideIndex;
      var stepIndex = this._stepIndex;

      var numCurrentSlideSteps = this._getNumStepsForSlide(slideIndex);
      var numSlides = _Object$keys(this._slideIndexMap).length;

      if (stepIndex + 1 < numCurrentSlideSteps) {
        stepIndex++;
      } else if (slideIndex + 1 < numSlides) {
        slideIndex++;
        stepIndex = 0;
      }

      this.goToSlide({ slideIndex: slideIndex, stepIndex: stepIndex });
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(_ref) {
      var slideIndex = _ref.slideIndex,
          _ref$stepIndex = _ref.stepIndex,
          stepIndex = _ref$stepIndex === undefined ? 0 : _ref$stepIndex;

      if (slideIndex !== this._slideIndex || stepIndex !== this._stepIndex) {
        var router = this.context.router;

        var path = this._createPath({ slideIndex: slideIndex, stepIndex: stepIndex });

        router.replace(path);

        this.forceUpdate();
      }
    }
  }, {
    key: 'isAtBeginning',
    value: function isAtBeginning() {
      return this._slideIndex === 0 && this._stepIndex === 0;
    }
  }, {
    key: 'isAtEnd',
    value: function isAtEnd() {
      var numSlides = _Object$keys(this._slideIndexMap).length;
      var numLastSlideSteps = this._getNumStepsForSlide(numSlides - 1);

      return this._slideIndex === numSlides - 1 && this._stepIndex === numLastSlideSteps - 1;
    }
  }, {
    key: 'setPluginProps',
    value: function setPluginProps(props) {
      var pluginProps = this.state.pluginProps;


      this.setState({
        pluginProps: _extends({}, pluginProps, props)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          disableTheme = _props.disableTheme;


      return React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%'
          }
        },
        !disableTheme && React.createElement(DefaultTheme, null),
        React.createElement(Route, {
          exact: true,
          path: '/',
          render: function render() {
            return React.createElement(Redirect, { to: '/0/0' });
          }
        }),
        typeof children === 'function' ? children({ presentation: this }) : children,
        React.createElement(TouchNav, null)
      );
    }
  }, {
    key: '_createPath',
    value: function _createPath(_ref2) {
      var slideIndex = _ref2.slideIndex,
          _ref2$stepIndex = _ref2.stepIndex,
          stepIndex = _ref2$stepIndex === undefined ? ':step' : _ref2$stepIndex;

      return '/' + slideIndex + '/' + stepIndex;
    }
  }, {
    key: '_getNumStepsForSlide',
    value: function _getNumStepsForSlide(slideIndex) {
      return this._slideIndexMap[slideIndex].getNumSteps() || 1;
    }
  }, {
    key: '_parseLocation',
    value: function _parseLocation(location) {
      var parsed = (location.pathname + location.hash).match(/(\d+)\/(\d+)/);

      if (parsed) {
        this._slideIndex = parseInt(parsed[1], 10);
        this._stepIndex = parseInt(parsed[2], 10);
      } else {
        this._slideIndex = 0;
        this._stepIndex = 0;
      }
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      if (event.target.tagName === 'INPUT') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'PageUp':
          this.goBack();
          break;
        case 'ArrowRight':
        case 'PageDown':
        case 'Enter':
        case ' ':
          this.goForward();
          break;
        default:
          // Linting requires this :)
          break;
      }
    }
  }]);

  return PresentationInner;
}(Component);

PresentationInner.childContextTypes = {
  pluginProps: PropTypes.object.isRequired,
  presentation: presentationContext.isRequired
};
PresentationInner.contextTypes = {
  router: PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? PresentationInner.propTypes = {
  children: PropTypes.any.isRequired,
  disableTheme: PropTypes.bool.isRequired
} : void 0;