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
   * This method is like `_.flow` except that it creates a function that
   * invokes the given functions from right to left.
   *
   * @static
   * @since 3.0.0
   * @memberOf _
   * @category Util
   * @param {...(Function|Function[])} [funcs] Functions to invoke.
   * @returns {Function} Returns the new composite function.
   * @see _.flow
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var addSquare = _.flowRight(square, _.add);
   * addSquare(1, 2);
   * // => 9
   */
  var flowRight = (0, _createFlow2.default)(true);

  exports.default = flowRight;
});