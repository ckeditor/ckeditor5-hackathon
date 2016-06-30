define(['exports', './_createCaseFirst.js'], function (exports, _createCaseFirst) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createCaseFirst2 = _interopRequireDefault(_createCaseFirst);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Converts the first character of `string` to lower case.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.lowerFirst('Fred');
   * // => 'fred'
   *
   * _.lowerFirst('FRED');
   * // => 'fRED'
   */
  var lowerFirst = (0, _createCaseFirst2.default)('toLowerCase');

  exports.default = lowerFirst;
});