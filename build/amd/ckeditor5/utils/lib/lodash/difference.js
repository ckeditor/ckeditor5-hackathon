define(['exports', './_baseDifference.js', './_baseFlatten.js', './isArrayLikeObject.js', './rest.js'], function (exports, _baseDifference, _baseFlatten, _isArrayLikeObject, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of unique `array` values not included in the other given
   * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons. The order of result values is determined by the
   * order they occur in the first array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.without, _.xor
   * @example
   *
   * _.difference([3, 2, 1], [4, 2]);
   * // => [3, 1]
   */
  var difference = (0, _rest2.default)(function (array, values) {
    return (0, _isArrayLikeObject2.default)(array) ? (0, _baseDifference2.default)(array, (0, _baseFlatten2.default)(values, 1, _isArrayLikeObject2.default, true)) : [];
  });

  exports.default = difference;
});