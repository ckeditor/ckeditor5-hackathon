define(['exports', './_baseDifference.js', './_baseFlatten.js', './_baseIteratee.js', './isArrayLikeObject.js', './last.js', './rest.js'], function (exports, _baseDifference, _baseFlatten, _baseIteratee, _isArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _last2 = _interopRequireDefault(_last);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.difference` except that it accepts `iteratee` which
   * is invoked for each element of `array` and `values` to generate the criterion
   * by which they're compared. Result values are chosen from the first array.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
   * // => [3.1, 1.3]
   *
   * // The `_.property` iteratee shorthand.
   * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
   * // => [{ 'x': 2 }]
   */
  var differenceBy = (0, _rest2.default)(function (array, values) {
    var iteratee = (0, _last2.default)(values);
    if ((0, _isArrayLikeObject2.default)(iteratee)) {
      iteratee = undefined;
    }
    return (0, _isArrayLikeObject2.default)(array) ? (0, _baseDifference2.default)(array, (0, _baseFlatten2.default)(values, 1, _isArrayLikeObject2.default, true), (0, _baseIteratee2.default)(iteratee)) : [];
  });

  exports.default = differenceBy;
});