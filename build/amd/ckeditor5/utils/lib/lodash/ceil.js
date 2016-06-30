define(['exports', './_createRound.js'], function (exports, _createRound) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createRound2 = _interopRequireDefault(_createRound);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Computes `number` rounded up to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round up.
   * @param {number} [precision=0] The precision to round up to.
   * @returns {number} Returns the rounded up number.
   * @example
   *
   * _.ceil(4.006);
   * // => 5
   *
   * _.ceil(6.004, 2);
   * // => 6.01
   *
   * _.ceil(6040, -2);
   * // => 6100
   */
  var ceil = (0, _createRound2.default)('ceil');

  exports.default = ceil;
});