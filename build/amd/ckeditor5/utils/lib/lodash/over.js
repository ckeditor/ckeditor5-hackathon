define(['exports', './_arrayMap.js', './_createOver.js'], function (exports, _arrayMap, _createOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _createOver2 = _interopRequireDefault(_createOver);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that invokes `iteratees` with the arguments it receives
   * and returns their results.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
   *  [iteratees=[_.identity]] The iteratees to invoke.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var func = _.over(Math.max, Math.min);
   *
   * func(1, 2, 3, 4);
   * // => [4, 1]
   */
  var over = (0, _createOver2.default)(_arrayMap2.default);

  exports.default = over;
});