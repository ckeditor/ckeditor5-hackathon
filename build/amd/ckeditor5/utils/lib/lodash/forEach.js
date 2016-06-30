define(['exports', './_arrayEach.js', './_baseEach.js', './_baseIteratee.js', './isArray.js'], function (exports, _arrayEach, _baseEach, _baseIteratee, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _baseEach2 = _interopRequireDefault(_baseEach);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _([1, 2]).forEach(function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = (0, _isArray2.default)(collection) ? _arrayEach2.default : _baseEach2.default;
    return func(collection, (0, _baseIteratee2.default)(iteratee, 3));
  }

  exports.default = forEach;
});