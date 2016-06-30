define(['exports', './_arrayEvery.js', './_baseEvery.js', './_baseIteratee.js', './isArray.js', './_isIterateeCall.js'], function (exports, _arrayEvery, _baseEvery, _baseIteratee, _isArray, _isIterateeCall) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEvery2 = _interopRequireDefault(_arrayEvery);

  var _baseEvery2 = _interopRequireDefault(_baseEvery);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * Iteration is stopped once `predicate` returns falsey. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array|Function|Object|string} [predicate=_.identity]
   *  The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.every(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.every(users, 'active');
   * // => false
   */
  function every(collection, predicate, guard) {
    var func = (0, _isArray2.default)(collection) ? _arrayEvery2.default : _baseEvery2.default;
    if (guard && (0, _isIterateeCall2.default)(collection, predicate, guard)) {
      predicate = undefined;
    }
    return func(collection, (0, _baseIteratee2.default)(predicate, 3));
  }

  exports.default = every;
});