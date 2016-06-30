define(['exports', './_baseSum.js', './identity.js'], function (exports, _baseSum, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSum2 = _interopRequireDefault(_baseSum);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Computes the sum of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 2, 8, 6]);
   * // => 20
   */
  function sum(array) {
    return array && array.length ? (0, _baseSum2.default)(array, _identity2.default) : 0;
  }

  exports.default = sum;
});