define(['exports', './_baseToString.js', './_castSlice.js', './isObject.js', './isRegExp.js', './_reHasComplexSymbol.js', './_stringSize.js', './_stringToArray.js', './toInteger.js', './toString.js'], function (exports, _baseToString, _castSlice, _isObject, _isRegExp, _reHasComplexSymbol, _stringSize, _stringToArray, _toInteger, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToString2 = _interopRequireDefault(_baseToString);

  var _castSlice2 = _interopRequireDefault(_castSlice);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _isRegExp2 = _interopRequireDefault(_isRegExp);

  var _reHasComplexSymbol2 = _interopRequireDefault(_reHasComplexSymbol);

  var _stringSize2 = _interopRequireDefault(_stringSize);

  var _stringToArray2 = _interopRequireDefault(_stringToArray);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Truncates `string` if it's longer than the given maximum string length.
   * The last characters of the truncated string are replaced with the omission
   * string which defaults to "...".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to truncate.
   * @param {Object} [options={}] The options object.
   * @param {number} [options.length=30] The maximum string length.
   * @param {string} [options.omission='...'] The string to indicate text is omitted.
   * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
   * @returns {string} Returns the truncated string.
   * @example
   *
   * _.truncate('hi-diddly-ho there, neighborino');
   * // => 'hi-diddly-ho there, neighbo...'
   *
   * _.truncate('hi-diddly-ho there, neighborino', {
   *   'length': 24,
   *   'separator': ' '
   * });
   * // => 'hi-diddly-ho there,...'
   *
   * _.truncate('hi-diddly-ho there, neighborino', {
   *   'length': 24,
   *   'separator': /,? +/
   * });
   * // => 'hi-diddly-ho there...'
   *
   * _.truncate('hi-diddly-ho there, neighborino', {
   *   'omission': ' [...]'
   * });
   * // => 'hi-diddly-ho there, neig [...]'
   */
  function truncate(string, options) {
    var length = DEFAULT_TRUNC_LENGTH,
        omission = DEFAULT_TRUNC_OMISSION;

    if ((0, _isObject2.default)(options)) {
      var separator = 'separator' in options ? options.separator : separator;
      length = 'length' in options ? (0, _toInteger2.default)(options.length) : length;
      omission = 'omission' in options ? (0, _baseToString2.default)(options.omission) : omission;
    }
    string = (0, _toString2.default)(string);

    var strLength = string.length;
    if (_reHasComplexSymbol2.default.test(string)) {
      var strSymbols = (0, _stringToArray2.default)(string);
      strLength = strSymbols.length;
    }
    if (length >= strLength) {
      return string;
    }
    var end = length - (0, _stringSize2.default)(omission);
    if (end < 1) {
      return omission;
    }
    var result = strSymbols ? (0, _castSlice2.default)(strSymbols, 0, end).join('') : string.slice(0, end);

    if (separator === undefined) {
      return result + omission;
    }
    if (strSymbols) {
      end += result.length - end;
    }
    if ((0, _isRegExp2.default)(separator)) {
      if (string.slice(end).search(separator)) {
        var match,
            substring = result;

        if (!separator.global) {
          separator = RegExp(separator.source, (0, _toString2.default)(reFlags.exec(separator)) + 'g');
        }
        separator.lastIndex = 0;
        while (match = separator.exec(substring)) {
          var newEnd = match.index;
        }
        result = result.slice(0, newEnd === undefined ? end : newEnd);
      }
    } else if (string.indexOf((0, _baseToString2.default)(separator), end) != end) {
      var index = result.lastIndexOf(separator);
      if (index > -1) {
        result = result.slice(0, index);
      }
    }
    return result + omission;
  }

  exports.default = truncate;
});