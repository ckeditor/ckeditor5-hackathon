define(['exports', './_baseEachRight.js', './_baseFind.js', './_baseFindIndex.js', './_baseIteratee.js', './isArray.js'], function (exports, _baseEachRight, _baseFind, _baseFindIndex, _baseIteratee, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseEachRight2 = _interopRequireDefault(_baseEachRight);

  var _baseFind2 = _interopRequireDefault(_baseFind);

  var _baseFindIndex2 = _interopRequireDefault(_baseFindIndex);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.find` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to search.
   * @param {Array|Function|Object|string} [predicate=_.identity]
   *  The function invoked per iteration.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * _.findLast([1, 2, 3, 4], function(n) {
   *   return n % 2 == 1;
   * });
   * // => 3
   */
  function findLast(collection, predicate) {
    predicate = (0, _baseIteratee2.default)(predicate, 3);
    if ((0, _isArray2.default)(collection)) {
      var index = (0, _baseFindIndex2.default)(collection, predicate, true);
      return index > -1 ? collection[index] : undefined;
    }
    return (0, _baseFind2.default)(collection, predicate, _baseEachRight2.default);
  }

  exports.default = findLast;
});