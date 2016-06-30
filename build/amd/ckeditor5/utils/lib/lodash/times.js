define(['exports', './_baseIteratee.js', './_baseTimes.js', './toInteger.js'], function (exports, _baseIteratee, _baseTimes, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseTimes2 = _interopRequireDefault(_baseTimes);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Invokes the iteratee `n` times, returning an array of the results of
   * each invocation. The iteratee is invoked with one argument; (index).
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.times(3, String);
   * // => ['0', '1', '2']
   *
   *  _.times(4, _.constant(true));
   * // => [true, true, true, true]
   */
  function times(n, iteratee) {
    n = (0, _toInteger2.default)(n);
    if (n < 1 || n > MAX_SAFE_INTEGER) {
      return [];
    }
    var index = MAX_ARRAY_LENGTH,
        length = nativeMin(n, MAX_ARRAY_LENGTH);

    iteratee = (0, _baseIteratee2.default)(iteratee);
    n -= MAX_ARRAY_LENGTH;

    var result = (0, _baseTimes2.default)(length, iteratee);
    while (++index < n) {
      iteratee(index);
    }
    return result;
  }

  exports.default = times;
});