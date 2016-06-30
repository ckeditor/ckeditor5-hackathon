define(['exports', './_arraySome.js', './_createOver.js'], function (exports, _arraySome, _createOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arraySome2 = _interopRequireDefault(_arraySome);

  var _createOver2 = _interopRequireDefault(_createOver);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that checks if **any** of the `predicates` return
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
   * var func = _.overSome(Boolean, isFinite);
   *
   * func('1');
   * // => true
   *
   * func(null);
   * // => true
   *
   * func(NaN);
   * // => false
   */
  var overSome = (0, _createOver2.default)(_arraySome2.default);

  exports.default = overSome;
});