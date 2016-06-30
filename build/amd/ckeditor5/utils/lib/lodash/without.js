define(['exports', './_baseDifference.js', './isArrayLikeObject.js', './rest.js'], function (exports, _baseDifference, _isArrayLikeObject, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array excluding all given values using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.xor
   * @example
   *
   * _.without([1, 2, 1, 3], 1, 2);
   * // => [3]
   */
  var without = (0, _rest2.default)(function (array, values) {
    return (0, _isArrayLikeObject2.default)(array) ? (0, _baseDifference2.default)(array, values) : [];
  });

  exports.default = without;
});