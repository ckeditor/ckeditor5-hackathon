define(['exports', './_baseFlatten.js', './_baseOrderBy.js', './isArray.js', './_isFlattenableIteratee.js', './_isIterateeCall.js', './rest.js'], function (exports, _baseFlatten, _baseOrderBy, _isArray, _isFlattenableIteratee, _isIterateeCall, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseOrderBy2 = _interopRequireDefault(_baseOrderBy);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isFlattenableIteratee2 = _interopRequireDefault(_isFlattenableIteratee);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
   *  [iteratees=[_.identity]] The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, function(o) { return o.user; });
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
   *
   * _.sortBy(users, 'user', function(o) {
   *   return Math.floor(o.age / 10);
   * });
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   */
  var sortBy = (0, _rest2.default)(function (collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length = iteratees.length;
    if (length > 1 && (0, _isIterateeCall2.default)(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length > 2 && (0, _isIterateeCall2.default)(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    iteratees = iteratees.length == 1 && (0, _isArray2.default)(iteratees[0]) ? iteratees[0] : (0, _baseFlatten2.default)(iteratees, 1, _isFlattenableIteratee2.default);

    return (0, _baseOrderBy2.default)(collection, iteratees, []);
  });

  exports.default = sortBy;
});