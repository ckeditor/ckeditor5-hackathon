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
   * Checks if `string` ends with the given target string.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=string.length] The position to search from.
   * @returns {boolean} Returns `true` if `string` ends with `target`,
   *  else `false`.
   * @example
   *
   * _.endsWith('abc', 'c');
   * // => true
   *
   * _.endsWith('abc', 'b');
   * // => false
   *
   * _.endsWith('abc', 'b', 2);
   * // => true
   */
  function endsWith(string, target, position) {
    string = (0, _toString2.default)(string);
    target = (0, _baseToString2.default)(target);

    var length = string.length;
    position = position === undefined ? length : (0, _baseClamp2.default)((0, _toInteger2.default)(position), 0, length);

    position -= target.length;
    return position >= 0 && string.indexOf(target, position) == position;
  }

  exports.default = endsWith;
});