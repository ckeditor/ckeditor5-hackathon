define(['exports', './_createCompounder.js'], function (exports, _createCompounder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createCompounder2 = _interopRequireDefault(_createCompounder);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts `string` to
   * [snake case](https://en.wikipedia.org/wiki/Snake_case).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the snake cased string.
   * @example
   *
   * _.snakeCase('Foo Bar');
   * // => 'foo_bar'
   *
   * _.snakeCase('fooBar');
   * // => 'foo_bar'
   *
   * _.snakeCase('--FOO-BAR--');
   * // => 'foo_bar'
   */
  var snakeCase = (0, _createCompounder2.default)(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });

  exports.default = snakeCase;
});