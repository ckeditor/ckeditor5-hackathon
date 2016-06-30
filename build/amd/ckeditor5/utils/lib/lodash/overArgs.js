define(['exports', './_apply.js', './_arrayMap.js', './_baseFlatten.js', './_baseIteratee.js', './_baseUnary.js', './isArray.js', './_isFlattenableIteratee.js', './rest.js'], function (exports, _apply, _arrayMap, _baseFlatten, _baseIteratee, _baseUnary, _isArray, _isFlattenableIteratee, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseUnary2 = _interopRequireDefault(_baseUnary);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isFlattenableIteratee2 = _interopRequireDefault(_isFlattenableIteratee);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Creates a function that invokes `func` with arguments transformed by
   * corresponding `transforms`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Function
   * @param {Function} func The function to wrap.
   * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
   *  [transforms[_.identity]] The functions to transform.
   * @returns {Function} Returns the new function.
   * @example
   *
   * function doubled(n) {
   *   return n * 2;
   * }
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var func = _.overArgs(function(x, y) {
   *   return [x, y];
   * }, square, doubled);
   *
   * func(9, 3);
   * // => [81, 6]
   *
   * func(10, 5);
   * // => [100, 10]
   */
  var overArgs = (0, _rest2.default)(function (func, transforms) {
    transforms = transforms.length == 1 && (0, _isArray2.default)(transforms[0]) ? (0, _arrayMap2.default)(transforms[0], (0, _baseUnary2.default)(_baseIteratee2.default)) : (0, _arrayMap2.default)((0, _baseFlatten2.default)(transforms, 1, _isFlattenableIteratee2.default), (0, _baseUnary2.default)(_baseIteratee2.default));

    var funcsLength = transforms.length;
    return (0, _rest2.default)(function (args) {
      var index = -1,
          length = nativeMin(args.length, funcsLength);

      while (++index < length) {
        args[index] = transforms[index].call(this, args[index]);
      }
      return (0, _apply2.default)(func, this, args);
    });
  });

  exports.default = overArgs;
});