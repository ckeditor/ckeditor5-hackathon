define(['exports', './toString.js', './upperFirst.js'], function (exports, _toString, _upperFirst) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toString2 = _interopRequireDefault(_toString);

  var _upperFirst2 = _interopRequireDefault(_upperFirst);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts the first character of `string` to upper case and the remaining
   * to lower case.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to capitalize.
   * @returns {string} Returns the capitalized string.
   * @example
   *
   * _.capitalize('FRED');
   * // => 'Fred'
   */
  function capitalize(string) {
    return (0, _upperFirst2.default)((0, _toString2.default)(string).toLowerCase());
  }

  exports.default = capitalize;
});