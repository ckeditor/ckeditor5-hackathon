define(['exports', './_baseIteratee.js', './_baseSortedUniq.js'], function (exports, _baseIteratee, _baseSortedUniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseSortedUniq2 = _interopRequireDefault(_baseSortedUniq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.uniqBy` except that it's designed and optimized
   * for sorted arrays.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
   * // => [1.1, 2.3]
   */
  function sortedUniqBy(array, iteratee) {
    return array && array.length ? (0, _baseSortedUniq2.default)(array, (0, _baseIteratee2.default)(iteratee)) : [];
  }

  exports.default = sortedUniqBy;
});