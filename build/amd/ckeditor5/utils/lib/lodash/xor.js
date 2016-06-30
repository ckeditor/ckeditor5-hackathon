define(['exports', './_arrayFilter.js', './_baseXor.js', './isArrayLikeObject.js', './rest.js'], function (exports, _arrayFilter, _baseXor, _isArrayLikeObject, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _baseXor2 = _interopRequireDefault(_baseXor);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of unique values that is the
   * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
   * of the given arrays. The order of result values is determined by the order
   * they occur in the arrays.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.without
   * @example
   *
   * _.xor([2, 1], [4, 2]);
   * // => [1, 4]
   */
  var xor = (0, _rest2.default)(function (arrays) {
    return (0, _baseXor2.default)((0, _arrayFilter2.default)(arrays, _isArrayLikeObject2.default));
  });

  exports.default = xor;
});