define(['exports', './_baseToString.js', './_castSlice.js', './_isIterateeCall.js', './isRegExp.js', './_reHasComplexSymbol.js', './_stringToArray.js', './toString.js'], function (exports, _baseToString, _castSlice, _isIterateeCall, _isRegExp, _reHasComplexSymbol, _stringToArray, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToString2 = _interopRequireDefault(_baseToString);

  var _castSlice2 = _interopRequireDefault(_castSlice);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _isRegExp2 = _interopRequireDefault(_isRegExp);

  var _reHasComplexSymbol2 = _interopRequireDefault(_reHasComplexSymbol);

  var _stringToArray2 = _interopRequireDefault(_stringToArray);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /** Used for built-in method references. */
  var stringProto = String.prototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeSplit = stringProto.split;

  /**
   * Splits `string` by `separator`.
   *
   * **Note:** This method is based on
   * [`String#split`](https://mdn.io/String/split).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to split.
   * @param {RegExp|string} separator The separator pattern to split by.
   * @param {number} [limit] The length to truncate results to.
   * @returns {Array} Returns the string segments.
   * @example
   *
   * _.split('a-b-c', '-', 2);
   * // => ['a', 'b']
   */
  function split(string, separator, limit) {
    if (limit && typeof limit != 'number' && (0, _isIterateeCall2.default)(string, separator, limit)) {
      separator = limit = undefined;
    }
    limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
    if (!limit) {
      return [];
    }
    string = (0, _toString2.default)(string);
    if (string && (typeof separator == 'string' || separator != null && !(0, _isRegExp2.default)(separator))) {
      separator = (0, _baseToString2.default)(separator);
      if (separator == '' && _reHasComplexSymbol2.default.test(string)) {
        return (0, _castSlice2.default)((0, _stringToArray2.default)(string), 0, limit);
      }
    }
    return nativeSplit.call(string, separator, limit);
  }

  exports.default = split;
});