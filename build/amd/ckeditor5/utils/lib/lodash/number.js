define(['exports', './clamp.js', './inRange.js', './random.js', './number.default.js'], function (exports, _clamp, _inRange, _random, _numberDefault) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'clamp', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_clamp).default;
    }
  });
  Object.defineProperty(exports, 'inRange', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_inRange).default;
    }
  });
  Object.defineProperty(exports, 'random', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_random).default;
    }
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_numberDefault).default;
    }
  });

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});