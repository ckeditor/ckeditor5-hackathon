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

  /**
   * Pads `string` on the right side if it's shorter than `length`. Padding
   * characters are truncated if they exceed `length`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.padEnd('abc', 6);
   * // => 'abc   '
   *
   * _.padEnd('abc', 6, '_-');
   * // => 'abc_-_'
   *
   * _.padEnd('abc', 3);
   * // => 'abc'
   */
  function padEnd(string, length, chars) {
    string = (0, _toString2.default)(string);
    length = (0, _toInteger2.default)(length);

    var strLength = length ? (0, _stringSize2.default)(string) : 0;
    return length && strLength < length ? string + (0, _createPadding2.default)(length - strLength, chars) : string;
  }

  exports.default = padEnd;
});