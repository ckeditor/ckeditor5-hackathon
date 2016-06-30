define(['exports', './_baseExtremum.js', './_baseLt.js', './identity.js'], function (exports, _baseExtremum, _baseLt, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseExtremum2 = _interopRequireDefault(_baseExtremum);

  var _baseLt2 = _interopRequireDefault(_baseLt);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Computes the minimum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => undefined
   */
  function min(array) {
    return array && array.length ? (0, _baseExtremum2.default)(array, _identity2.default, _baseLt2.default) : undefined;
  }

  exports.default = min;
});