define(['exports', './_baseFlatten.js', './_baseIteratee.js', './_baseUniq.js', './isArrayLikeObject.js', './last.js', './rest.js'], function (exports, _baseFlatten, _baseIteratee, _baseUniq, _isArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseUniq2 = _interopRequireDefault(_baseUniq);

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
   * This method is like `_.union` except that it accepts `iteratee` which is
   * invoked for each element of each `arrays` to generate the criterion by
   * which uniqueness is computed. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.unionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
   * // => [2.1, 1.2, 4.3]
   *
   * // The `_.property` iteratee shorthand.
   * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  var unionBy = (0, _rest2.default)(function (arrays) {
    var iteratee = (0, _last2.default)(arrays);
    if ((0, _isArrayLikeObject2.default)(iteratee)) {
      iteratee = undefined;
    }
    return (0, _baseUniq2.default)((0, _baseFlatten2.default)(arrays, 1, _isArrayLikeObject2.default, true), (0, _baseIteratee2.default)(iteratee));
  });

  exports.default = unionBy;
});