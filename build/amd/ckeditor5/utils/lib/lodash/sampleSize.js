define(['exports', './_baseClamp.js', './_baseRandom.js', './_isIterateeCall.js', './toArray.js', './toInteger.js'], function (exports, _baseClamp, _baseRandom, _isIterateeCall, _toArray, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClamp2 = _interopRequireDefault(_baseClamp);

  var _baseRandom2 = _interopRequireDefault(_baseRandom);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _toArray2 = _interopRequireDefault(_toArray);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets `n` random elements at unique keys from `collection` up to the
   * size of `collection`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to sample.
   * @param {number} [n=1] The number of elements to sample.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the random elements.
   * @example
   *
   * _.sampleSize([1, 2, 3], 2);
   * // => [3, 1]
   *
   * _.sampleSize([1, 2, 3], 4);
   * // => [2, 3, 1]
   */
  function sampleSize(collection, n, guard) {
    var index = -1,
        result = (0, _toArray2.default)(collection),
        length = result.length,
        lastIndex = length - 1;

    if (guard ? (0, _isIterateeCall2.default)(collection, n, guard) : n === undefined) {
      n = 1;
    } else {
      n = (0, _baseClamp2.default)((0, _toInteger2.default)(n), 0, length);
    }
    while (++index < n) {
      var rand = (0, _baseRandom2.default)(index, lastIndex),
          value = result[rand];

      result[rand] = result[index];
      result[index] = value;
    }
    result.length = n;
    return result;
  }

  exports.default = sampleSize;
});