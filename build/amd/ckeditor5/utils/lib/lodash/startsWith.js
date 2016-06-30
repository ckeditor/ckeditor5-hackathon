define(['exports', './_baseClamp.js', './_baseToString.js', './toInteger.js', './toString.js'], function (exports, _baseClamp, _baseToString, _toInteger, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClamp2 = _interopRequireDefault(_baseClamp);

  var _baseToString2 = _interopRequireDefault(_baseToString);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `string` starts with the given target string.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=0] The position to search from.
   * @returns {boolean} Returns `true` if `string` starts with `target`,
   *  else `false`.
   * @example
   *
   * _.startsWith('abc', 'a');
   * // => true
   *
   * _.startsWith('abc', 'b');
   * // => false
   *
   * _.startsWith('abc', 'b', 1);
   * // => true
   */
  function startsWith(string, target, position) {
    string = (0, _toString2.default)(string);
    position = (0, _baseClamp2.default)((0, _toInteger2.default)(position), 0, string.length);
    return string.lastIndexOf((0, _baseToString2.default)(target), position) == position;
  }

  exports.default = startsWith;
});