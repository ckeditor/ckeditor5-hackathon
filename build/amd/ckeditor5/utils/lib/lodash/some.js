define(['exports', './_arraySome.js', './_baseIteratee.js', './_baseSome.js', './isArray.js', './_isIterateeCall.js'], function (exports, _arraySome, _baseIteratee, _baseSome, _isArray, _isIterateeCall) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arraySome2 = _interopRequireDefault(_arraySome);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseSome2 = _interopRequireDefault(_baseSome);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * Iteration is stopped once `predicate` returns truthy. The predicate is
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
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.some(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.some(users, 'active');
   * // => true
   */
  function some(collection, predicate, guard) {
    var func = (0, _isArray2.default)(collection) ? _arraySome2.default : _baseSome2.default;
    if (guard && (0, _isIterateeCall2.default)(collection, predicate, guard)) {
      predicate = undefined;
    }
    return func(collection, (0, _baseIteratee2.default)(predicate, 3));
  }

  exports.default = some;
});