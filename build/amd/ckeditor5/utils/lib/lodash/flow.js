define(['exports', './_createFlow.js'], function (exports, _createFlow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createFlow2 = _interopRequireDefault(_createFlow);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that returns the result of invoking the given functions
   * with the `this` binding of the created function, where each successive
   * invocation is supplied the return value of the previous.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {...(Function|Function[])} [funcs] Functions to invoke.
   * @returns {Function} Returns the new composite function.
   * @see _.flowRight
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var addSquare = _.flow(_.add, square);
   * addSquare(1, 2);
   * // => 9
   */
  var flow = (0, _createFlow2.default)();

  exports.default = flow;
});