define(['exports', './_Symbol.js', './isSymbol.js'], function (exports, _Symbol, _isSymbol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Symbol2 = _interopRequireDefault(_Symbol);

  var _isSymbol2 = _interopRequireDefault(_isSymbol);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol2.default ? _Symbol2.default.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if ((0, _isSymbol2.default)(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  exports.default = baseToString;
});