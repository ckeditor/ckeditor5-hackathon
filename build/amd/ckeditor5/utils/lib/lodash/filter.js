define(['exports', './_arrayFilter.js', './_baseFilter.js', './_baseIteratee.js', './isArray.js'], function (exports, _arrayFilter, _baseFilter, _baseIteratee, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _baseFilter2 = _interopRequireDefault(_baseFilter);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array|Function|Object|string} [predicate=_.identity]
   *  The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   * @see _.reject
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   */
  function filter(collection, predicate) {
    var func = (0, _isArray2.default)(collection) ? _arrayFilter2.default : _baseFilter2.default;
    return func(collection, (0, _baseIteratee2.default)(predicate, 3));
  }

  exports.default = filter;
});