define(['exports', './_baseToString.js', './_castSlice.js', './_charsStartIndex.js', './_stringToArray.js', './toString.js'], function (exports, _baseToString, _castSlice, _charsStartIndex, _stringToArray, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToString2 = _interopRequireDefault(_baseToString);

  var _castSlice2 = _interopRequireDefault(_castSlice);

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
  var reTrimStart = /^\s+/;

  /**
   * Removes leading whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trimStart('  abc  ');
   * // => 'abc  '
   *
   * _.trimStart('-_-abc-_-', '_-');
   * // => 'abc-_-'
   */
  function trimStart(string, chars, guard) {
    string = (0, _toString2.default)(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrimStart, '');
    }
    if (!string || !(chars = (0, _baseToString2.default)(chars))) {
      return string;
    }
    var strSymbols = (0, _stringToArray2.default)(string),
        start = (0, _charsStartIndex2.default)(strSymbols, (0, _stringToArray2.default)(chars));

    return (0, _castSlice2.default)(strSymbols, start).join('');
  }

  exports.default = trimStart;
});