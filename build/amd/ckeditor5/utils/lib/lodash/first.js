define(['exports', './head.js'], function (exports, _head) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_head).default;
    }
  });

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});