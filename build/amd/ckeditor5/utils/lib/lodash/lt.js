define(['exports', './_baseLt.js', './_createRelationalOperation.js'], function (exports, _baseLt, _createRelationalOperation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseLt2 = _interopRequireDefault(_baseLt);

  var _createRelationalOperation2 = _interopRequireDefault(_createRelationalOperation);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is less than `other`.
   *
   * @static
   * @memberOf _
   * @since 3.9.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than `other`,
   *  else `false`.
   * @see _.gt
   * @example
   *
   * _.lt(1, 3);
   * // => true
   *
   * _.lt(3, 3);
   * // => false
   *
   * _.lt(3, 1);
   * // => false
   */
  var lt = (0, _createRelationalOperation2.default)(_baseLt2.default);

  exports.default = lt;
});