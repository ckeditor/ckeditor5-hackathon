define(['exports', './_baseFlatten.js', './toInteger.js'], function (exports, _baseFlatten, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Recursively flatten `array` up to `depth` times.
   *
   * @static
   * @memberOf _
   * @since 4.4.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @param {number} [depth=1] The maximum recursion depth.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * var array = [1, [2, [3, [4]], 5]];
   *
   * _.flattenDepth(array, 1);
   * // => [1, 2, [3, [4]], 5]
   *
   * _.flattenDepth(array, 2);
   * // => [1, 2, 3, [4], 5]
   */
  function flattenDepth(array, depth) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    depth = depth === undefined ? 1 : (0, _toInteger2.default)(depth);
    return (0, _baseFlatten2.default)(array, depth);
  }

  exports.default = flattenDepth;
});