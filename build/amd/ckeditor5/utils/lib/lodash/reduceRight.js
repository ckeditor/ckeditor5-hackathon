define(['exports', './_arrayReduceRight.js', './_baseEachRight.js', './_baseIteratee.js', './_baseReduce.js', './isArray.js'], function (exports, _arrayReduceRight, _baseEachRight, _baseIteratee, _baseReduce, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayReduceRight2 = _interopRequireDefault(_arrayReduceRight);

  var _baseEachRight2 = _interopRequireDefault(_baseEachRight);

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
   * This method is like `_.reduce` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduce
   * @example
   *
   * var array = [[0, 1], [2, 3], [4, 5]];
   *
   * _.reduceRight(array, function(flattened, other) {
   *   return flattened.concat(other);
   * }, []);
   * // => [4, 5, 2, 3, 0, 1]
   */
  function reduceRight(collection, iteratee, accumulator) {
    var func = (0, _isArray2.default)(collection) ? _arrayReduceRight2.default : _baseReduce2.default,
        initAccum = arguments.length < 3;

    return func(collection, (0, _baseIteratee2.default)(iteratee, 4), accumulator, initAccum, _baseEachRight2.default);
  }

  exports.default = reduceRight;
});