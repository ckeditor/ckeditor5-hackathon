define(['exports', './toString.js'], function (exports, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var stringProto = String.prototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeReplace = stringProto.replace;

  /**
   * Replaces matches for `pattern` in `string` with `replacement`.
   *
   * **Note:** This method is based on
   * [`String#replace`](https://mdn.io/String/replace).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to modify.
   * @param {RegExp|string} pattern The pattern to replace.
   * @param {Function|string} replacement The match replacement.
   * @returns {string} Returns the modified string.
   * @example
   *
   * _.replace('Hi Fred', 'Fred', 'Barney');
   * // => 'Hi Barney'
   */
  function replace() {
    var args = arguments,
        string = (0, _toString2.default)(args[0]);

    return args.length < 3 ? string : nativeReplace.call(string, args[1], args[2]);
  }

  exports.default = replace;
});