define(['exports', './_baseToString.js', './_castSlice.js', './_charsEndIndex.js', './_charsStartIndex.js', './_stringToArray.js', './toString.js'], function (exports, _baseToString, _castSlice, _charsEndIndex, _charsStartIndex, _stringToArray, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToString2 = _interopRequireDefault(_baseToString);

  var _castSlice2 = _interopRequireDefault(_castSlice);

  var _charsEndIndex2 = _interopRequireDefault(_charsEndIndex);

  var _charsStartIndex2 = _interopRequireDefault(_charsStartIndex);

  var _stringToArray2 = _interopRequireDefault(_stringToArray);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = (0, _toString2.default)(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim, '');
    }
    if (!string || !(chars = (0, _baseToString2.default)(chars))) {
      return string;
    }
    var strSymbols = (0, _stringToArray2.default)(string),
        chrSymbols = (0, _stringToArray2.default)(chars),
        start = (0, _charsStartIndex2.default)(strSymbols, chrSymbols),
        end = (0, _charsEndIndex2.default)(strSymbols, chrSymbols) + 1;

    return (0, _castSlice2.default)(strSymbols, start, end).join('');
  }

  exports.default = trim;
});