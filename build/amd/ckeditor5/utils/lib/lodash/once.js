define(['exports', './before.js'], function (exports, _before) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _before2 = _interopRequireDefault(_before);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that is restricted to invoking `func` once. Repeat calls
   * to the function return the value of the first invocation. The `func` is
   * invoked with the `this` binding and arguments of the created function.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // `initialize` invokes `createApplication` once
   */
  function once(func) {
    return (0, _before2.default)(2, func);
  }

  exports.default = once;
});