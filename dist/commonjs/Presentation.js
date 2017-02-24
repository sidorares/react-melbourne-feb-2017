'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _DefaultTheme = require('./DefaultTheme');

var _DefaultTheme2 = _interopRequireDefault(_DefaultTheme);

var _PropTypes = require('./PropTypes');

var _TouchNav = require('./TouchNav');

var _TouchNav2 = _interopRequireDefault(_TouchNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Presentation = function (_Component) {
  _inherits(Presentation, _Component);

  function Presentation() {
    _classCallCheck(this, Presentation);

    return _possibleConstructorReturn(this, (Presentation.__proto__ || Object.getPrototypeOf(Presentation)).apply(this, arguments));
  }

  _createClass(Presentation, [{
    key: 'render',
    value: function render() {
      var Router = this.props.router;


      return _react2.default.createElement(
        Router,
        null,
        _react2.default.createElement(PresentationInner, this.props)
      );
    }
  }]);

  return Presentation;
}(_react.Component);

// Separate inner class due to Router context dependencies.


Presentation.defaultProps = {
  disableTheme: false,
  router: _reactRouterDom.HashRouter
};
exports.default = Presentation;
process.env.NODE_ENV !== "production" ? Presentation.propTypes = {
  children: _react.PropTypes.any.isRequired,
  disableTheme: _react.PropTypes.bool.isRequired,
  router: _react.PropTypes.any.isRequired
} : void 0;

var PresentationInner = function (_Component2) {
  _inherits(PresentationInner, _Component2);

  function PresentationInner(props, context) {
    _classCallCheck(this, PresentationInner);

    var _this2 = _possibleConstructorReturn(this, (PresentationInner.__proto__ || Object.getPrototypeOf(PresentationInner)).call(this, props, context));

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
      var numSlides = Object.keys(this._slideIndexMap).length;

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
      var numSlides = Object.keys(this._slideIndexMap).length;
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


      return _react2.default.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%'
          }
        },
        !disableTheme && _react2.default.createElement(_DefaultTheme2.default, null),
        _react2.default.createElement(_reactRouterDom.Route, {
          exact: true,
          path: '/',
          render: function render() {
            return _react2.default.createElement(_reactRouter.Redirect, { to: '/0/0' });
          }
        }),
        typeof children === 'function' ? children({ presentation: this }) : children,
        _react2.default.createElement(_TouchNav2.default, null)
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
}(_react.Component);

PresentationInner.childContextTypes = {
  pluginProps: _react.PropTypes.object.isRequired,
  presentation: _PropTypes.presentationContext.isRequired
};
PresentationInner.contextTypes = {
  router: _react.PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? PresentationInner.propTypes = {
  children: _react.PropTypes.any.isRequired,
  disableTheme: _react.PropTypes.bool.isRequired
} : void 0;