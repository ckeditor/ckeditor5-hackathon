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
  var CURRY_RIGHT_FLAG = 16;

  /**
   * This method is like `_.curry` except that arguments are applied to `func`
   * in the manner of `_.partialRight` instead of `_.partial`.
   *
   * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for provided arguments.
   *
   * **Note:** This method doesn't set the "length" property of curried functions.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var abc = function(a, b, c) {
   *   return [a, b, c];
   * };
   *
   * var curried = _.curryRight(abc);
   *
   * curried(3)(2)(1);
   * // => [1, 2, 3]
   *
   * curried(2, 3)(1);
   * // => [1, 2, 3]
   *
   * curried(1, 2, 3);
   * // => [1, 2, 3]
   *
   * // Curried with placeholders.
   * curried(3)(1, _)(2);
   * // => [1, 2, 3]
   */
  function curryRight(func, arity, guard) {
    arity = guard ? undefined : arity;
    var result = (0, _createWrapper2.default)(func, CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
    result.placeholder = curryRight.placeholder;
    return result;
  }

  // Assign default placeholders.
  curryRight.placeholder = {};

  exports.default = curryRight;
});