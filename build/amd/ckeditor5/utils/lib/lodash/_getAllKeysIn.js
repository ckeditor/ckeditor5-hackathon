define(['exports', './_baseGetAllKeys.js', './_getSymbolsIn.js', './keysIn.js'], function (exports, _baseGetAllKeys, _getSymbolsIn, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseGetAllKeys2 = _interopRequireDefault(_baseGetAllKeys);

  var _getSymbolsIn2 = _interopRequireDefault(_getSymbolsIn);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return (0, _baseGetAllKeys2.default)(object, _keysIn2.default, _getSymbolsIn2.default);
  }

  exports.default = getAllKeysIn;
});