define(['exports', './_baseIndexOf.js', './isArrayLike.js', './isString.js', './toInteger.js', './values.js'], function (exports, _baseIndexOf, _isArrayLike, _isString, _toInteger, _values) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIndexOf2 = _interopRequireDefault(_baseIndexOf);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isString2 = _interopRequireDefault(_isString);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _values2 = _interopRequireDefault(_values);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Checks if `value` is in `collection`. If `collection` is a string, it's
   * checked for a substring of `value`, otherwise
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * is used for equality comparisons. If `fromIndex` is negative, it's used as
   * the offset from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.includes('pebbles', 'eb');
   * // => true
   */
  function includes(collection, value, fromIndex, guard) {
    collection = (0, _isArrayLike2.default)(collection) ? collection : (0, _values2.default)(collection);
    fromIndex = fromIndex && !guard ? (0, _toInteger2.default)(fromIndex) : 0;

    var length = collection.length;
    if (fromIndex < 0) {
      fromIndex = nativeMax(length + fromIndex, 0);
    }
    return (0, _isString2.default)(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && (0, _baseIndexOf2.default)(collection, value, fromIndex) > -1;
  }

  exports.default = includes;
});