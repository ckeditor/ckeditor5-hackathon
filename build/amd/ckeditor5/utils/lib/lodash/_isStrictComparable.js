define(['exports', './isObject.js'], function (exports, _isObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !(0, _isObject2.default)(value);
  }

  exports.default = isStrictComparable;
});