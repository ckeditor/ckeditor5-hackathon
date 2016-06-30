define(['exports', './_getNative.js'], function (exports, _getNative) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getNative2 = _interopRequireDefault(_getNative);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references that are verified to be native. */
  var nativeCreate = (0, _getNative2.default)(Object, 'create');

  exports.default = nativeCreate;
});