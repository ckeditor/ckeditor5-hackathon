define(['exports', './toFinite.js'], function (exports, _toFinite) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toFinite2 = _interopRequireDefault(_toFinite);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This function is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = (0, _toFinite2.default)(value),
        remainder = result % 1;

    return result === result ? remainder ? result - remainder : result : 0;
  }

  exports.default = toInteger;
});