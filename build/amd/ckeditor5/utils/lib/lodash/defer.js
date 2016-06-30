define(['exports', './_baseDelay.js', './rest.js'], function (exports, _baseDelay, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDelay2 = _interopRequireDefault(_baseDelay);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // => Logs 'deferred' after one or more milliseconds.
   */
  var defer = (0, _rest2.default)(function (func, args) {
    return (0, _baseDelay2.default)(func, 1, args);
  });

  exports.default = defer;
});