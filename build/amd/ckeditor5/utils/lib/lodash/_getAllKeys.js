define(['exports', './_baseGetAllKeys.js', './_getSymbols.js', './keys.js'], function (exports, _baseGetAllKeys, _getSymbols, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseGetAllKeys2 = _interopRequireDefault(_baseGetAllKeys);

  var _getSymbols2 = _interopRequireDefault(_getSymbols);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return (0, _baseGetAllKeys2.default)(object, _keys2.default, _getSymbols2.default);
  }

  exports.default = getAllKeys;
});