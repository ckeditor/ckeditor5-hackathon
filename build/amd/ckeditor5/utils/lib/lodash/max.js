define(['exports', './_baseExtremum.js', './_baseGt.js', './identity.js'], function (exports, _baseExtremum, _baseGt, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseExtremum2 = _interopRequireDefault(_baseExtremum);

  var _baseGt2 = _interopRequireDefault(_baseGt);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Computes the maximum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => undefined
   */
  function max(array) {
    return array && array.length ? (0, _baseExtremum2.default)(array, _identity2.default, _baseGt2.default) : undefined;
  }

  exports.default = max;
});