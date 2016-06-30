define(['exports', './_LodashWrapper.js', './_baseFlatten.js', './_getData.js', './_getFuncName.js', './isArray.js', './_isLaziable.js', './rest.js'], function (exports, _LodashWrapper, _baseFlatten, _getData, _getFuncName, _isArray, _isLaziable, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LodashWrapper2 = _interopRequireDefault(_LodashWrapper);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _getData2 = _interopRequireDefault(_getData);

  var _getFuncName2 = _interopRequireDefault(_getFuncName);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isLaziable2 = _interopRequireDefault(_isLaziable);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to compose bitmasks for wrapper metadata. */
  var CURRY_FLAG = 8,
      PARTIAL_FLAG = 32,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /**
   * Creates a `_.flow` or `_.flowRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new flow function.
   */
  function createFlow(fromRight) {
    return (0, _rest2.default)(function (funcs) {
      funcs = (0, _baseFlatten2.default)(funcs, 1);

      var length = funcs.length,
          index = length,
          prereq = _LodashWrapper2.default.prototype.thru;

      if (fromRight) {
        funcs.reverse();
      }
      while (index--) {
        var func = funcs[index];
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (prereq && !wrapper && (0, _getFuncName2.default)(func) == 'wrapper') {
          var wrapper = new _LodashWrapper2.default([], true);
        }
      }
      index = wrapper ? index : length;
      while (++index < length) {
        func = funcs[index];

        var funcName = (0, _getFuncName2.default)(func),
            data = funcName == 'wrapper' ? (0, _getData2.default)(func) : undefined;

        if (data && (0, _isLaziable2.default)(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
          wrapper = wrapper[(0, _getFuncName2.default)(data[0])].apply(wrapper, data[3]);
        } else {
          wrapper = func.length == 1 && (0, _isLaziable2.default)(func) ? wrapper[funcName]() : wrapper.thru(func);
        }
      }
      return function () {
        var args = arguments,
            value = args[0];

        if (wrapper && args.length == 1 && (0, _isArray2.default)(value) && value.length >= LARGE_ARRAY_SIZE) {
          return wrapper.plant(value).value();
        }
        var index = 0,
            result = length ? funcs[index].apply(this, args) : value;

        while (++index < length) {
          result = funcs[index].call(this, result);
        }
        return result;
      };
    });
  }

  exports.default = createFlow;
});