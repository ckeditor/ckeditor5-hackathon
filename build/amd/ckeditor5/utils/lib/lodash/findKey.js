define(['exports', './_baseFind.js', './_baseForOwn.js', './_baseIteratee.js'], function (exports, _baseFind, _baseForOwn, _baseIteratee) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFind2 = _interopRequireDefault(_baseFind);

  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.find` except that it returns the key of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Object
   * @param {Object} object The object to search.
   * @param {Array|Function|Object|string} [predicate=_.identity]
   *  The function invoked per iteration.
   * @returns {string|undefined} Returns the key of the matched element,
   *  else `undefined`.
   * @example
   *
   * var users = {
   *   'barney':  { 'age': 36, 'active': true },
   *   'fred':    { 'age': 40, 'active': false },
   *   'pebbles': { 'age': 1,  'active': true }
   * };
   *
   * _.findKey(users, function(o) { return o.age < 40; });
   * // => 'barney' (iteration order is not guaranteed)
   *
   * // The `_.matches` iteratee shorthand.
   * _.findKey(users, { 'age': 1, 'active': true });
   * // => 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findKey(users, ['active', false]);
   * // => 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.findKey(users, 'active');
   * // => 'barney'
   */
  function findKey(object, predicate) {
    return (0, _baseFind2.default)(object, (0, _baseIteratee2.default)(predicate, 3), _baseForOwn2.default, true);
  }

  exports.default = findKey;
});