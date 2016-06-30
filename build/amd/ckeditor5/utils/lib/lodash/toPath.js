define(['exports', './_arrayMap.js', './_copyArray.js', './isArray.js', './isSymbol.js', './_stringToPath.js', './_toKey.js'], function (exports, _arrayMap, _copyArray, _isArray, _isSymbol, _stringToPath, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isSymbol2 = _interopRequireDefault(_isSymbol);

  var _stringToPath2 = _interopRequireDefault(_stringToPath);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts `value` to a property path array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {*} value The value to convert.
   * @returns {Array} Returns the new property path array.
   * @example
   *
   * _.toPath('a.b.c');
   * // => ['a', 'b', 'c']
   *
   * _.toPath('a[0].b.c');
   * // => ['a', '0', 'b', 'c']
   *
   * var path = ['a', 'b', 'c'],
   *     newPath = _.toPath(path);
   *
   * console.log(newPath);
   * // => ['a', 'b', 'c']
   *
   * console.log(path === newPath);
   * // => false
   */
  function toPath(value) {
    if ((0, _isArray2.default)(value)) {
      return (0, _arrayMap2.default)(value, _toKey2.default);
    }
    return (0, _isSymbol2.default)(value) ? [value] : (0, _copyArray2.default)((0, _stringToPath2.default)(value));
  }

  exports.default = toPath;
});