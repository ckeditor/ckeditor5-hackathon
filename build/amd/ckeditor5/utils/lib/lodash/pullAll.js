define(['exports', './_basePullAll.js'], function (exports, _basePullAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _basePullAll2 = _interopRequireDefault(_basePullAll);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.pull` except that it accepts an array of values to remove.
   *
   * **Note:** Unlike `_.difference`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Array} values The values to remove.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [1, 2, 3, 1, 2, 3];
   *
   * _.pullAll(array, [2, 3]);
   * console.log(array);
   * // => [1, 1]
   */
  function pullAll(array, values) {
    return array && array.length && values && values.length ? (0, _basePullAll2.default)(array, values) : array;
  }

  exports.default = pullAll;
});