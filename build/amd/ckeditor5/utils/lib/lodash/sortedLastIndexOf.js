define(['exports', './_baseSortedIndex.js', './eq.js'], function (exports, _baseSortedIndex, _eq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSortedIndex2 = _interopRequireDefault(_baseSortedIndex);

  var _eq2 = _interopRequireDefault(_eq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.lastIndexOf` except that it performs a binary
   * search on a sorted `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.sortedLastIndexOf([1, 1, 2, 2], 2);
   * // => 3
   */
  function sortedLastIndexOf(array, value) {
    var length = array ? array.length : 0;
    if (length) {
      var index = (0, _baseSortedIndex2.default)(array, value, true) - 1;
      if ((0, _eq2.default)(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  exports.default = sortedLastIndexOf;
});