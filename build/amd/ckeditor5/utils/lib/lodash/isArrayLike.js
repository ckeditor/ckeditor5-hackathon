define(['exports', './_getLength.js', './isFunction.js', './isLength.js'], function (exports, _getLength, _isFunction, _isLength) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getLength2 = _interopRequireDefault(_getLength);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isLength2 = _interopRequireDefault(_isLength);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && (0, _isLength2.default)((0, _getLength2.default)(value)) && !(0, _isFunction2.default)(value);
  }

  exports.default = isArrayLike;
});