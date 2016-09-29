define(['exports', './isArray.js', './isFunction.js'], function (exports, _isArray, _isFunction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is a flattenable array and not a `_.matchesProperty`
   * iteratee shorthand.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenableIteratee(value) {
    return (0, _isArray2.default)(value) && !(value.length == 2 && !(0, _isFunction2.default)(value[0]));
  }

  exports.default = isFlattenableIteratee;
});