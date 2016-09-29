define(['exports', './_baseGt.js', './_createRelationalOperation.js'], function (exports, _baseGt, _createRelationalOperation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseGt2 = _interopRequireDefault(_baseGt);

  var _createRelationalOperation2 = _interopRequireDefault(_createRelationalOperation);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is greater than `other`.
   *
   * @static
   * @memberOf _
   * @since 3.9.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is greater than `other`,
   *  else `false`.
   * @see _.lt
   * @example
   *
   * _.gt(3, 1);
   * // => true
   *
   * _.gt(3, 3);
   * // => false
   *
   * _.gt(1, 3);
   * // => false
   */
  var gt = (0, _createRelationalOperation2.default)(_baseGt2.default);

  exports.default = gt;
});