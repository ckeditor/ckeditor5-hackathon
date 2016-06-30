define(['exports', './isObjectLike.js', './isPlainObject.js'], function (exports, _isObjectLike, _isPlainObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is likely a DOM element.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element,
   *  else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return !!value && value.nodeType === 1 && (0, _isObjectLike2.default)(value) && !(0, _isPlainObject2.default)(value);
  }

  exports.default = isElement;
});