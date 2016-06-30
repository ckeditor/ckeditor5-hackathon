define(['exports', './_baseFlatten.js', './_baseUniq.js', './isArrayLikeObject.js', './rest.js'], function (exports, _baseFlatten, _baseUniq, _isArrayLikeObject, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseUniq2 = _interopRequireDefault(_baseUniq);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of unique values, in order, from all given arrays using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([2, 1], [4, 2], [1, 2]);
   * // => [2, 1, 4]
   */
  var union = (0, _rest2.default)(function (arrays) {
    return (0, _baseUniq2.default)((0, _baseFlatten2.default)(arrays, 1, _isArrayLikeObject2.default, true));
  });

  exports.default = union;
});