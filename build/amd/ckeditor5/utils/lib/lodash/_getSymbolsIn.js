define(['exports', './_arrayPush.js', './_getPrototype.js', './_getSymbols.js'], function (exports, _arrayPush, _getPrototype, _getSymbols) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _getPrototype2 = _interopRequireDefault(_getPrototype);

  var _getSymbols2 = _interopRequireDefault(_getSymbols);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Built-in value references. */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbol properties
   * of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !getOwnPropertySymbols ? _getSymbols2.default : function (object) {
    var result = [];
    while (object) {
      (0, _arrayPush2.default)(result, (0, _getSymbols2.default)(object));
      object = (0, _getPrototype2.default)(object);
    }
    return result;
  };

  exports.default = getSymbolsIn;
});