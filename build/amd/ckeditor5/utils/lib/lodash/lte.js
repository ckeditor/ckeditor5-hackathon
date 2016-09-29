define(['exports', './_createRelationalOperation.js'], function (exports, _createRelationalOperation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createRelationalOperation2 = _interopRequireDefault(_createRelationalOperation);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `value` is less than or equal to `other`.
   *
   * @static
   * @memberOf _
   * @since 3.9.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than or equal to
   *  `other`, else `false`.
   * @see _.gte
   * @example
   *
   * _.lte(1, 3);
   * // => true
   *
   * _.lte(3, 3);
   * // => true
   *
   * _.lte(3, 1);
   * // => false
   */
  var lte = (0, _createRelationalOperation2.default)(function (value, other) {
    return value <= other;
  });

  exports.default = lte;
});