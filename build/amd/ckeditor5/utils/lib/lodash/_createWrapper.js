define(['exports', './_baseSetData.js', './_createBaseWrapper.js', './_createCurryWrapper.js', './_createHybridWrapper.js', './_createPartialWrapper.js', './_getData.js', './_mergeData.js', './_setData.js', './toInteger.js'], function (exports, _baseSetData, _createBaseWrapper, _createCurryWrapper, _createHybridWrapper, _createPartialWrapper, _getData, _mergeData, _setData, _toInteger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSetData2 = _interopRequireDefault(_baseSetData);

  var _createBaseWrapper2 = _interopRequireDefault(_createBaseWrapper);

  var _createCurryWrapper2 = _interopRequireDefault(_createCurryWrapper);

  var _createHybridWrapper2 = _interopRequireDefault(_createHybridWrapper);

  var _createPartialWrapper2 = _interopRequireDefault(_createPartialWrapper);

  var _getData2 = _interopRequireDefault(_getData);

  var _mergeData2 = _interopRequireDefault(_mergeData);

  var _setData2 = _interopRequireDefault(_setData);

  var _toInteger2 = _interopRequireDefault(_toInteger);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to wrap.
   * @param {number} bitmask The bitmask of wrapper flags.
   *  The bitmask may be composed of the following flags:
   *     1 - `_.bind`
   *     2 - `_.bindKey`
   *     4 - `_.curry` or `_.curryRight` of a bound function
   *     8 - `_.curry`
   *    16 - `_.curryRight`
   *    32 - `_.partial`
   *    64 - `_.partialRight`
   *   128 - `_.rearg`
   *   256 - `_.ary`
   *   512 - `_.flip`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
      partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax((0, _toInteger2.default)(ary), 0);
    arity = arity === undefined ? arity : (0, _toInteger2.default)(arity);
    length -= holders ? holders.length : 0;

    if (bitmask & PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = undefined;
    }
    var data = isBindKey ? undefined : (0, _getData2.default)(func);

    var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

    if (data) {
      (0, _mergeData2.default)(newData, data);
    }
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] == null ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);

    if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
      bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
    }
    if (!bitmask || bitmask == BIND_FLAG) {
      var result = (0, _createBaseWrapper2.default)(func, bitmask, thisArg);
    } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
      result = (0, _createCurryWrapper2.default)(func, bitmask, arity);
    } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
      result = (0, _createPartialWrapper2.default)(func, bitmask, thisArg, partials);
    } else {
      result = _createHybridWrapper2.default.apply(undefined, newData);
    }
    var setter = data ? _baseSetData2.default : _setData2.default;
    return setter(result, newData);
  }

  exports.default = createWrapper;
});