define(['exports', './_baseIsEqualDeep.js', './isObject.js', './isObjectLike.js'], function (exports, _baseIsEqualDeep, _isObject, _isObjectLike) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIsEqualDeep2 = _interopRequireDefault(_baseIsEqualDeep);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {boolean} [bitmask] The bitmask of comparison flags.
   *  The bitmask may be composed of the following flags:
   *     1 - Unordered comparison
   *     2 - Partial comparison
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, customizer, bitmask, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !(0, _isObject2.default)(value) && !(0, _isObjectLike2.default)(other)) {
      return value !== value && other !== other;
    }
    return (0, _baseIsEqualDeep2.default)(value, other, baseIsEqual, customizer, bitmask, stack);
  }

  exports.default = baseIsEqual;
});