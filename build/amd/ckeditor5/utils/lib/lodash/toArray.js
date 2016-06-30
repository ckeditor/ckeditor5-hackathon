define(['exports', './_Symbol.js', './_copyArray.js', './_getTag.js', './isArrayLike.js', './isString.js', './_iteratorToArray.js', './_mapToArray.js', './_setToArray.js', './_stringToArray.js', './values.js'], function (exports, _Symbol, _copyArray, _getTag, _isArrayLike, _isString, _iteratorToArray, _mapToArray, _setToArray, _stringToArray, _values) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Symbol2 = _interopRequireDefault(_Symbol);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _getTag2 = _interopRequireDefault(_getTag);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isString2 = _interopRequireDefault(_isString);

  var _iteratorToArray2 = _interopRequireDefault(_iteratorToArray);

  var _mapToArray2 = _interopRequireDefault(_mapToArray);

  var _setToArray2 = _interopRequireDefault(_setToArray);

  var _stringToArray2 = _interopRequireDefault(_stringToArray);

  var _values2 = _interopRequireDefault(_values);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /** Built-in value references. */
  var iteratorSymbol = typeof (iteratorSymbol = _Symbol2.default && _Symbol2.default.iterator) == 'symbol' ? iteratorSymbol : undefined;

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray(value) {
    if (!value) {
      return [];
    }
    if ((0, _isArrayLike2.default)(value)) {
      return (0, _isString2.default)(value) ? (0, _stringToArray2.default)(value) : (0, _copyArray2.default)(value);
    }
    if (iteratorSymbol && value[iteratorSymbol]) {
      return (0, _iteratorToArray2.default)(value[iteratorSymbol]());
    }
    var tag = (0, _getTag2.default)(value),
        func = tag == mapTag ? _mapToArray2.default : tag == setTag ? _setToArray2.default : _values2.default;

    return func(value);
  }

  exports.default = toArray;
});