define(['exports', './_getTag.js', './isArrayLike.js', './isObjectLike.js', './isString.js', './keys.js', './_stringSize.js'], function (exports, _getTag, _isArrayLike, _isObjectLike, _isString, _keys, _stringSize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getTag2 = _interopRequireDefault(_getTag);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

  var _isString2 = _interopRequireDefault(_isString);

  var _keys2 = _interopRequireDefault(_keys);

  var _stringSize2 = _interopRequireDefault(_stringSize);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /**
   * Gets the size of `collection` by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @returns {number} Returns the collection size.
   * @example
   *
   * _.size([1, 2, 3]);
   * // => 3
   *
   * _.size({ 'a': 1, 'b': 2 });
   * // => 2
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    if (collection == null) {
      return 0;
    }
    if ((0, _isArrayLike2.default)(collection)) {
      var result = collection.length;
      return result && (0, _isString2.default)(collection) ? (0, _stringSize2.default)(collection) : result;
    }
    if ((0, _isObjectLike2.default)(collection)) {
      var tag = (0, _getTag2.default)(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
    }
    return (0, _keys2.default)(collection).length;
  }

  exports.default = size;
});