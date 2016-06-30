define(['exports', './rest.js', './unzipWith.js'], function (exports, _rest, _unzipWith) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _rest2 = _interopRequireDefault(_rest);

  var _unzipWith2 = _interopRequireDefault(_unzipWith);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.zip` except that it accepts `iteratee` to specify
   * how grouped values should be combined. The iteratee is invoked with the
   * elements of each group: (...group).
   *
   * @static
   * @memberOf _
   * @since 3.8.0
   * @category Array
   * @param {...Array} [arrays] The arrays to process.
   * @param {Function} [iteratee=_.identity] The function to combine grouped values.
   * @returns {Array} Returns the new array of grouped elements.
   * @example
   *
   * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
   *   return a + b + c;
   * });
   * // => [111, 222]
   */
  var zipWith = (0, _rest2.default)(function (arrays) {
    var length = arrays.length,
        iteratee = length > 1 ? arrays[length - 1] : undefined;

    iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
    return (0, _unzipWith2.default)(arrays, iteratee);
  });

  exports.default = zipWith;
});