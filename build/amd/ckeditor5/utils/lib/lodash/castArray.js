define(['exports', './isArray.js'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Casts `value` as an array if it's not one.
   *
   * @static
   * @memberOf _
   * @since 4.4.0
   * @category Lang
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast array.
   * @example
   *
   * _.castArray(1);
   * // => [1]
   *
   * _.castArray({ 'a': 1 });
   * // => [{ 'a': 1 }]
   *
   * _.castArray('abc');
   * // => ['abc']
   *
   * _.castArray(null);
   * // => [null]
   *
   * _.castArray(undefined);
   * // => [undefined]
   *
   * _.castArray();
   * // => []
   *
   * var array = [1, 2, 3];
   * console.log(_.castArray(array) === array);
   * // => true
   */
  function castArray() {
    if (!arguments.length) {
      return [];
    }
    var value = arguments[0];
    return (0, _isArray2.default)(value) ? value : [value];
  }

  exports.default = castArray;
});