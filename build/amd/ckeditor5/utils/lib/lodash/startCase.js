define(['exports', './_createCompounder.js', './upperFirst.js'], function (exports, _createCompounder, _upperFirst) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createCompounder2 = _interopRequireDefault(_createCompounder);

  var _upperFirst2 = _interopRequireDefault(_upperFirst);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts `string` to
   * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
   *
   * @static
   * @memberOf _
   * @since 3.1.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the start cased string.
   * @example
   *
   * _.startCase('--foo-bar--');
   * // => 'Foo Bar'
   *
   * _.startCase('fooBar');
   * // => 'Foo Bar'
   *
   * _.startCase('__FOO_BAR__');
   * // => 'FOO BAR'
   */
  var startCase = (0, _createCompounder2.default)(function (result, word, index) {
    return result + (index ? ' ' : '') + (0, _upperFirst2.default)(word);
  });

  exports.default = startCase;
});