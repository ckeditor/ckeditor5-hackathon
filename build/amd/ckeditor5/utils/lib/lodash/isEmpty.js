define(['exports', './_getTag.js', './isArguments.js', './isArray.js', './isArrayLike.js', './isBuffer.js', './isFunction.js', './isObjectLike.js', './isString.js', './keys.js'], function (exports, _getTag, _isArguments, _isArray, _isArrayLike, _isBuffer, _isFunction, _isObjectLike, _isString, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getTag2 = _interopRequireDefault(_getTag);

  var _isArguments2 = _interopRequireDefault(_isArguments);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isBuffer2 = _interopRequireDefault(_isBuffer);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

  var _isString2 = _interopRequireDefault(_isString);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
  var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if ((0, _isArrayLike2.default)(value) && ((0, _isArray2.default)(value) || (0, _isString2.default)(value) || (0, _isFunction2.default)(value.splice) || (0, _isArguments2.default)(value) || (0, _isBuffer2.default)(value))) {
      return !value.length;
    }
    if ((0, _isObjectLike2.default)(value)) {
      var tag = (0, _getTag2.default)(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
    }
    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return !(nonEnumShadows && (0, _keys2.default)(value).length);
  }

  exports.default = isEmpty;
});