define(['exports', './_createPadding.js', './_stringSize.js', './toInteger.js', './toString.js'], function (exports, _createPadding, _stringSize, _toInteger, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createPadding2 = _interopRequireDefault(_createPadding);

  var _stringSize2 = _interopRequireDefault(_stringSize);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil,
      nativeFloor = Math.floor;

  /**
   * Pads `string` on the left and right sides if it's shorter than `length`.
   * Padding characters are truncated if they can't be evenly divided by `length`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.pad('abc', 8);
   * // => '  abc   '
   *
   * _.pad('abc', 8, '_-');
   * // => '_-abc_-_'
   *
   * _.pad('abc', 3);
   * // => 'abc'
   */
  function pad(string, length, chars) {
    string = (0, _toString2.default)(string);
    length = (0, _toInteger2.default)(length);

    var strLength = length ? (0, _stringSize2.default)(string) : 0;
    if (!length || strLength >= length) {
      return string;
    }
    var mid = (length - strLength) / 2;
    return (0, _createPadding2.default)(nativeFloor(mid), chars) + string + (0, _createPadding2.default)(nativeCeil(mid), chars);
  }

  exports.default = pad;
});