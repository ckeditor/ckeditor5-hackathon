define(['exports', './_arrayFilter.js', './_baseIteratee.js', './_baseXor.js', './isArrayLikeObject.js', './last.js', './rest.js'], function (exports, _arrayFilter, _baseIteratee, _baseXor, _isArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseXor2 = _interopRequireDefault(_baseXor);

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
   * This method is like `_.xor` except that it accepts `iteratee` which is
   * invoked for each element of each `arrays` to generate the criterion by
   * which by which they're compared. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
   * // => [1.2, 4.3]
   *
   * // The `_.property` iteratee shorthand.
   * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 2 }]
   */
  var xorBy = (0, _rest2.default)(function (arrays) {
    var iteratee = (0, _last2.default)(arrays);
    if ((0, _isArrayLikeObject2.default)(iteratee)) {
      iteratee = undefined;
    }
    return (0, _baseXor2.default)((0, _arrayFilter2.default)(arrays, _isArrayLikeObject2.default), (0, _baseIteratee2.default)(iteratee));
  });

  exports.default = xorBy;
});