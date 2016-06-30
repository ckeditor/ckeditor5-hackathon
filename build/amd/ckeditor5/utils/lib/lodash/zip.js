define(['exports', './rest.js', './unzip.js'], function (exports, _rest, _unzip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _rest2 = _interopRequireDefault(_rest);

  var _unzip2 = _interopRequireDefault(_unzip);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of grouped elements, the first of which contains the
   * first elements of the given arrays, the second of which contains the
   * second elements of the given arrays, and so on.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to process.
   * @returns {Array} Returns the new array of grouped elements.
   * @example
   *
   * _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   */
  var zip = (0, _rest2.default)(_unzip2.default);

  exports.default = zip;
});