define(['exports', './_Symbol.js'], function (exports, _Symbol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Symbol2 = _interopRequireDefault(_Symbol);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol2.default ? _Symbol2.default.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  exports.default = cloneSymbol;
});