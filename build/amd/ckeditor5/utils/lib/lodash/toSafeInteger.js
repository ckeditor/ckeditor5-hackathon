define(['exports', './_baseClamp.js', './toInteger.js'], function (exports, _baseClamp, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClamp2 = _interopRequireDefault(_baseClamp);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Converts `value` to a safe integer. A safe integer can be compared and
   * represented correctly.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toSafeInteger(3.2);
   * // => 3
   *
   * _.toSafeInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toSafeInteger(Infinity);
   * // => 9007199254740991
   *
   * _.toSafeInteger('3.2');
   * // => 3
   */
  function toSafeInteger(value) {
    return (0, _baseClamp2.default)((0, _toInteger2.default)(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
  }

  exports.default = toSafeInteger;
});