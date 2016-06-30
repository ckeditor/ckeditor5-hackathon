define(['exports', './now.js'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _now2 = _interopRequireDefault(_now);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    now: _now2.default
  };
});