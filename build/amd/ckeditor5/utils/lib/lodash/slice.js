define(['exports', './_baseSlice.js', './_isIterateeCall.js', './toInteger.js'], function (exports, _baseSlice, _isIterateeCall, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSlice2 = _interopRequireDefault(_baseSlice);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a slice of `array` from `start` up to, but not including, `end`.
   *
   * **Note:** This method is used instead of
   * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
   * returned.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function slice(array, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (end && typeof end != 'number' && (0, _isIterateeCall2.default)(array, start, end)) {
      start = 0;
      end = length;
    } else {
      start = start == null ? 0 : (0, _toInteger2.default)(start);
      end = end === undefined ? length : (0, _toInteger2.default)(end);
    }
    return (0, _baseSlice2.default)(array, start, end);
  }

  exports.default = slice;
});