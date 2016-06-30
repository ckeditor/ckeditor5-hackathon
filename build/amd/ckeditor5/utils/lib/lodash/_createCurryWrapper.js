define(['exports', './_apply.js', './_createCtorWrapper.js', './_createHybridWrapper.js', './_createRecurryWrapper.js', './_getHolder.js', './_replaceHolders.js', './_root.js'], function (exports, _apply, _createCtorWrapper, _createHybridWrapper, _createRecurryWrapper, _getHolder, _replaceHolders, _root) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _createCtorWrapper2 = _interopRequireDefault(_createCtorWrapper);

  var _createHybridWrapper2 = _interopRequireDefault(_createHybridWrapper);

  var _createRecurryWrapper2 = _interopRequireDefault(_createRecurryWrapper);

  var _getHolder2 = _interopRequireDefault(_getHolder);

  var _replaceHolders2 = _interopRequireDefault(_replaceHolders);

  var _root2 = _interopRequireDefault(_root);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that wraps `func` to enable currying.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
   *  for more details.
   * @param {number} arity The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCurryWrapper(func, bitmask, arity) {
    var Ctor = (0, _createCtorWrapper2.default)(func);

    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length,
          placeholder = (0, _getHolder2.default)(wrapper);

      while (index--) {
        args[index] = arguments[index];
      }
      var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : (0, _replaceHolders2.default)(args, placeholder);

      length -= holders.length;
      if (length < arity) {
        return (0, _createRecurryWrapper2.default)(func, bitmask, _createHybridWrapper2.default, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
      }
      var fn = this && this !== _root2.default && this instanceof wrapper ? Ctor : func;
      return (0, _apply2.default)(fn, this, args);
    }
    return wrapper;
  }

  exports.default = createCurryWrapper;
});