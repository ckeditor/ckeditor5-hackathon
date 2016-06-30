define(['exports', './isFunction.js', './_isHostObject.js', './isObject.js', './_toSource.js'], function (exports, _isFunction, _isHostObject, _isObject, _toSource) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isHostObject2 = _interopRequireDefault(_isHostObject);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _toSource2 = _interopRequireDefault(_toSource);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = Function.prototype.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

  /**
   * Checks if `value` is a native function.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   * @example
   *
   * _.isNative(Array.prototype.push);
   * // => true
   *
   * _.isNative(_);
   * // => false
   */
  function isNative(value) {
    if (!(0, _isObject2.default)(value)) {
      return false;
    }
    var pattern = (0, _isFunction2.default)(value) || (0, _isHostObject2.default)(value) ? reIsNative : reIsHostCtor;
    return pattern.test((0, _toSource2.default)(value));
  }

  exports.default = isNative;
});