define(['exports', './_baseMean.js', './identity.js'], function (exports, _baseMean, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseMean2 = _interopRequireDefault(_baseMean);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Computes the mean of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the mean.
   * @example
   *
   * _.mean([4, 2, 8, 6]);
   * // => 5
   */
  function mean(array) {
    return (0, _baseMean2.default)(array, _identity2.default);
  }

  exports.default = mean;
});