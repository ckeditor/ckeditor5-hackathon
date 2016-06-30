define(['exports', './_baseClone.js'], function (exports, _baseClone) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClone2 = _interopRequireDefault(_baseClone);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.clone` except that it accepts `customizer` which
   * is invoked to produce the cloned value. If `customizer` returns `undefined`,
   * cloning is handled by the method instead. The `customizer` is invoked with
   * up to four arguments; (value [, index|key, object, stack]).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to clone.
   * @param {Function} [customizer] The function to customize cloning.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeepWith
   * @example
   *
   * function customizer(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(false);
   *   }
   * }
   *
   * var el = _.cloneWith(document.body, customizer);
   *
   * console.log(el === document.body);
   * // => false
   * console.log(el.nodeName);
   * // => 'BODY'
   * console.log(el.childNodes.length);
   * // => 0
   */
  function cloneWith(value, customizer) {
    return (0, _baseClone2.default)(value, false, true, customizer);
  }

  exports.default = cloneWith;
});