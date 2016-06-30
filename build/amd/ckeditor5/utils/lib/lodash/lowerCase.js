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
   * Converts `string`, as space separated words, to lower case.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the lower cased string.
   * @example
   *
   * _.lowerCase('--Foo-Bar--');
   * // => 'foo bar'
   *
   * _.lowerCase('fooBar');
   * // => 'foo bar'
   *
   * _.lowerCase('__FOO_BAR__');
   * // => 'foo bar'
   */
  var lowerCase = (0, _createCompounder2.default)(function (result, word, index) {
    return result + (index ? ' ' : '') + word.toLowerCase();
  });

  exports.default = lowerCase;
});