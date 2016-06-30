define(['exports', './isNative.js'], function (exports, _isNative) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isNative2 = _interopRequireDefault(_isNative);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = object[key];
    return (0, _isNative2.default)(value) ? value : undefined;
  }

  exports.default = getNative;
});