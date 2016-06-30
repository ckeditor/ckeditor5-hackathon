define(['exports', './_createWrapper.js'], function (exports, _createWrapper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createWrapper2 = _interopRequireDefault(_createWrapper);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose bitmasks for wrapper metadata. */
  var ARY_FLAG = 128;

  /**
   * Creates a function that invokes `func`, with up to `n` arguments,
   * ignoring any additional arguments.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to cap arguments for.
   * @param {number} [n=func.length] The arity cap.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new capped function.
   * @example
   *
   * _.map(['6', '8', '10'], _.ary(parseInt, 1));
   * // => [6, 8, 10]
   */
  function ary(func, n, guard) {
    n = guard ? undefined : n;
    n = func && n == null ? func.length : n;
    return (0, _createWrapper2.default)(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
  }

  exports.default = ary;
});