define(['exports', './_baseNth.js', './rest.js', './toInteger.js'], function (exports, _baseNth, _rest, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseNth2 = _interopRequireDefault(_baseNth);

  var _rest2 = _interopRequireDefault(_rest);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that gets the argument at `n` index. If `n` is negative,
   * the nth argument from the end is returned.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {number} [n=0] The index of the argument to return.
   * @returns {Function} Returns the new pass-thru function.
   * @example
   *
   * var func = _.nthArg(1);
   * func('a', 'b', 'c', 'd');
   * // => 'b'
   *
   * var func = _.nthArg(-2);
   * func('a', 'b', 'c', 'd');
   * // => 'c'
   */
  function nthArg(n) {
    n = (0, _toInteger2.default)(n);
    return (0, _rest2.default)(function (args) {
      return (0, _baseNth2.default)(args, n);
    });
  }

  exports.default = nthArg;
});