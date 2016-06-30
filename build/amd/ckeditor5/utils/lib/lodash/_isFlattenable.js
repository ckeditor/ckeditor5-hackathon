define(['exports', './isArguments.js', './isArray.js'], function (exports, _isArguments, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArguments2 = _interopRequireDefault(_isArguments);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return (0, _isArray2.default)(value) || (0, _isArguments2.default)(value);
  }

  exports.default = isFlattenable;
});