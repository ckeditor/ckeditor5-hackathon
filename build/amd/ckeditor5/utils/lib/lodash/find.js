define(['exports', './_baseEach.js', './_baseFind.js', './_baseFindIndex.js', './_baseIteratee.js', './isArray.js'], function (exports, _baseEach, _baseFind, _baseFindIndex, _baseIteratee, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseEach2 = _interopRequireDefault(_baseEach);

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
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to search.
   * @param {Array|Function|Object|string} [predicate=_.identity]
   *  The function invoked per iteration.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  function find(collection, predicate) {
    predicate = (0, _baseIteratee2.default)(predicate, 3);
    if ((0, _isArray2.default)(collection)) {
      var index = (0, _baseFindIndex2.default)(collection, predicate);
      return index > -1 ? collection[index] : undefined;
    }
    return (0, _baseFind2.default)(collection, predicate, _baseEach2.default);
  }

  exports.default = find;
});