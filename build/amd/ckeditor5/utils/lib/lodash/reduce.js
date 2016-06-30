define(['exports', './_arrayReduce.js', './_baseEach.js', './_baseIteratee.js', './_baseReduce.js', './isArray.js'], function (exports, _arrayReduce, _baseEach, _baseIteratee, _baseReduce, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  var _baseEach2 = _interopRequireDefault(_baseEach);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseReduce2 = _interopRequireDefault(_baseReduce);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` thru `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not given, the first element of `collection` is used as the initial
   * value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
   * and `sortBy`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduceRight
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * }, 0);
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   *   return result;
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator) {
    var func = (0, _isArray2.default)(collection) ? _arrayReduce2.default : _baseReduce2.default,
        initAccum = arguments.length < 3;

    return func(collection, (0, _baseIteratee2.default)(iteratee, 4), accumulator, initAccum, _baseEach2.default);
  }

  exports.default = reduce;
});