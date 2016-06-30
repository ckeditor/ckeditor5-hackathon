define(['exports', './_getTag.js', './isObjectLike.js'], function (exports, _getTag, _isObjectLike) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getTag2 = _interopRequireDefault(_getTag);

  var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var setTag = '[object Set]';

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified,
   *  else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  function isSet(value) {
    return (0, _isObjectLike2.default)(value) && (0, _getTag2.default)(value) == setTag;
  }

  exports.default = isSet;
});