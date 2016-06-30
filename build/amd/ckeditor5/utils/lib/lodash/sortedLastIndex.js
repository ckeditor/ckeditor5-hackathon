define(['exports', './_baseSortedIndex.js'], function (exports, _baseSortedIndex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSortedIndex2 = _interopRequireDefault(_baseSortedIndex);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.sortedIndex` except that it returns the highest
   * index at which `value` should be inserted into `array` in order to
   * maintain its sort order.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedLastIndex([4, 5], 4);
   * // => 1
   */
  function sortedLastIndex(array, value) {
    return (0, _baseSortedIndex2.default)(array, value, true);
  }

  exports.default = sortedLastIndex;
});