define(['exports', './capitalize.js', './_createCompounder.js'], function (exports, _capitalize, _createCompounder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _capitalize2 = _interopRequireDefault(_capitalize);

  var _createCompounder2 = _interopRequireDefault(_createCompounder);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the camel cased string.
   * @example
   *
   * _.camelCase('Foo Bar');
   * // => 'fooBar'
   *
   * _.camelCase('--foo-bar--');
   * // => 'fooBar'
   *
   * _.camelCase('__FOO_BAR__');
   * // => 'fooBar'
   */
  var camelCase = (0, _createCompounder2.default)(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? (0, _capitalize2.default)(word) : word);
  });

  exports.default = camelCase;
});