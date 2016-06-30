define(['exports', './_arrayEvery.js', './_createOver.js'], function (exports, _arrayEvery, _createOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEvery2 = _interopRequireDefault(_arrayEvery);

  var _createOver2 = _interopRequireDefault(_createOver);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that checks if **all** of the `predicates` return
   * truthy when invoked with the arguments it receives.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
   *  [predicates=[_.identity]] The predicates to check.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var func = _.overEvery(Boolean, isFinite);
   *
   * func('1');
   * // => true
   *
   * func(null);
   * // => false
   *
   * func(NaN);
   * // => false
   */
  var overEvery = (0, _createOver2.default)(_arrayEvery2.default);

  exports.default = overEvery;
});