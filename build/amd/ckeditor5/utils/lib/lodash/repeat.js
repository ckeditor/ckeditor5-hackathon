define(['exports', './_baseRepeat.js', './_isIterateeCall.js', './toInteger.js', './toString.js'], function (exports, _baseRepeat, _isIterateeCall, _toInteger, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseRepeat2 = _interopRequireDefault(_baseRepeat);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Repeats the given string `n` times.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to repeat.
   * @param {number} [n=1] The number of times to repeat the string.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the repeated string.
   * @example
   *
   * _.repeat('*', 3);
   * // => '***'
   *
   * _.repeat('abc', 2);
   * // => 'abcabc'
   *
   * _.repeat('abc', 0);
   * // => ''
   */
  function repeat(string, n, guard) {
    if (guard ? (0, _isIterateeCall2.default)(string, n, guard) : n === undefined) {
      n = 1;
    } else {
      n = (0, _toInteger2.default)(n);
    }
    return (0, _baseRepeat2.default)((0, _toString2.default)(string), n);
  }

  exports.default = repeat;
});