define(['exports', './_baseDelay.js', './rest.js', './toNumber.js'], function (exports, _baseDelay, _rest, _toNumber) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDelay2 = _interopRequireDefault(_baseDelay);

  var _rest2 = _interopRequireDefault(_rest);

  var _toNumber2 = _interopRequireDefault(_toNumber);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Invokes `func` after `wait` milliseconds. Any additional arguments are
   * provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) {
   *   console.log(text);
   * }, 1000, 'later');
   * // => Logs 'later' after one second.
   */
  var delay = (0, _rest2.default)(function (func, wait, args) {
    return (0, _baseDelay2.default)(func, (0, _toNumber2.default)(wait) || 0, args);
  });

  exports.default = delay;
});