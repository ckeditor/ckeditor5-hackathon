define(['exports', './now.js', './date.default.js'], function (exports, _now, _dateDefault) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'now', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_now).default;
    }
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_dateDefault).default;
    }
  });

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});