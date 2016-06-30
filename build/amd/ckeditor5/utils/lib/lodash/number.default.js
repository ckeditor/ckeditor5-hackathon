define(['exports', './clamp.js', './inRange.js', './random.js'], function (exports, _clamp, _inRange, _random) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _clamp2 = _interopRequireDefault(_clamp);

  var _inRange2 = _interopRequireDefault(_inRange);

  var _random2 = _interopRequireDefault(_random);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    clamp: _clamp2.default, inRange: _inRange2.default, random: _random2.default
  };
});