define(['exports', './_baseSlice.js', './toInteger.js'], function (exports, _baseSlice, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSlice2 = _interopRequireDefault(_baseSlice);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a slice of `array` with `n` elements taken from the beginning.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.take([1, 2, 3]);
   * // => [1]
   *
   * _.take([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.take([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.take([1, 2, 3], 0);
   * // => []
   */
  function take(array, n, guard) {
    if (!(array && array.length)) {
      return [];
    }
    n = guard || n === undefined ? 1 : (0, _toInteger2.default)(n);
    return (0, _baseSlice2.default)(array, 0, n < 0 ? 0 : n);
  }

  exports.default = take;
});