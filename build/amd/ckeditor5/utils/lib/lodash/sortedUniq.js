define(['exports', './_baseSortedUniq.js'], function (exports, _baseSortedUniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSortedUniq2 = _interopRequireDefault(_baseSortedUniq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.uniq` except that it's designed and optimized
   * for sorted arrays.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.sortedUniq([1, 1, 2]);
   * // => [1, 2]
   */
  function sortedUniq(array) {
    return array && array.length ? (0, _baseSortedUniq2.default)(array) : [];
  }

  exports.default = sortedUniq;
});