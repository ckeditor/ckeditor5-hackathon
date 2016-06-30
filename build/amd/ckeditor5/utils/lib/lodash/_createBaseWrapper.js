define(['exports', './_createCtorWrapper.js', './_root.js'], function (exports, _createCtorWrapper, _root) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
   * Creates a function that wraps `func` to invoke it with the optional `this`
   * binding of `thisArg`.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper`
   *  for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createBaseWrapper(func, bitmask, thisArg) {
    var isBind = bitmask & BIND_FLAG,
        Ctor = (0, _createCtorWrapper2.default)(func);

    function wrapper() {
      var fn = this && this !== _root2.default && this instanceof wrapper ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
  }

  exports.default = createBaseWrapper;
});