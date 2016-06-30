define(['exports', './_castSlice.js', './_reHasComplexSymbol.js', './_stringToArray.js', './toString.js'], function (exports, _castSlice, _reHasComplexSymbol, _stringToArray, _toString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _castSlice2 = _interopRequireDefault(_castSlice);

  var _reHasComplexSymbol2 = _interopRequireDefault(_reHasComplexSymbol);

  var _stringToArray2 = _interopRequireDefault(_stringToArray);

  var _toString2 = _interopRequireDefault(_toString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function like `_.lowerFirst`.
   *
   * @private
   * @param {string} methodName The name of the `String` case method to use.
   * @returns {Function} Returns the new case function.
   */
  function createCaseFirst(methodName) {
    return function (string) {
      string = (0, _toString2.default)(string);

      var strSymbols = _reHasComplexSymbol2.default.test(string) ? (0, _stringToArray2.default)(string) : undefined;

      var chr = strSymbols ? strSymbols[0] : string.charAt(0);

      var trailing = strSymbols ? (0, _castSlice2.default)(strSymbols, 1).join('') : string.slice(1);

      return chr[methodName]() + trailing;
    };
  }

  exports.default = createCaseFirst;
});