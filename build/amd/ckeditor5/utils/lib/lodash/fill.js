define(['exports', './_baseFill.js', './_isIterateeCall.js'], function (exports, _baseFill, _isIterateeCall) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFill2 = _interopRequireDefault(_baseFill);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Fills elements of `array` with `value` from `start` up to, but not
   * including, `end`.
   *
   * **Note:** This method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 3.2.0
   * @category Array
   * @param {Array} array The array to fill.
   * @param {*} value The value to fill `array` with.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [1, 2, 3];
   *
   * _.fill(array, 'a');
   * console.log(array);
   * // => ['a', 'a', 'a']
   *
   * _.fill(Array(3), 2);
   * // => [2, 2, 2]
   *
   * _.fill([4, 6, 8, 10], '*', 1, 3);
   * // => [4, '*', '*', 10]
   */
  function fill(array, value, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (start && typeof start != 'number' && (0, _isIterateeCall2.default)(array, value, start)) {
      start = 0;
      end = length;
    }
    return (0, _baseFill2.default)(array, value, start, end);
  }

  exports.default = fill;
});