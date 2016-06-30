define(['exports', './_apply.js', './_createCtorWrapper.js', './_root.js'], function (exports, _apply, _createCtorWrapper, _root) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _createCtorWrapper2 = _interopRequireDefault(_createCtorWrapper);

  var _root2 = _interopRequireDefault(_root);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1;

  /**
   * Creates a function that wraps `func` to invoke it with the `this` binding
   * of `thisArg` and `partials` prepended to the arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
   *  for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to
   *  the new function.
   * @returns {Function} Returns the new wrapped function.
   */
  function createPartialWrapper(func, bitmask, thisArg, partials) {
    var isBind = bitmask & BIND_FLAG,
        Ctor = (0, _createCtorWrapper2.default)(func);

    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = this && this !== _root2.default && this instanceof wrapper ? Ctor : func;

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      return (0, _apply2.default)(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  exports.default = createPartialWrapper;
});