define(['exports', './_arrayPush.js', './_baseFlatten.js', './_copyArray.js', './isArray.js'], function (exports, _arrayPush, _baseFlatten, _copyArray, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  function concat() {
    var length = arguments.length,
        args = Array(length ? length - 1 : 0),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return length ? (0, _arrayPush2.default)((0, _isArray2.default)(array) ? (0, _copyArray2.default)(array) : [array], (0, _baseFlatten2.default)(args, 1)) : [];
  }

  exports.default = concat;
});