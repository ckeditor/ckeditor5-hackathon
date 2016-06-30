define(['exports', './dropRight.js'], function (exports, _dropRight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dropRight2 = _interopRequireDefault(_dropRight);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets all but the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   */
  function initial(array) {
    return (0, _dropRight2.default)(array, 1);
  }

  exports.default = initial;
});