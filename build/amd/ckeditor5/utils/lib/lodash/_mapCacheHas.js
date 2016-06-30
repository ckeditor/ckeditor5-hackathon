define(['exports', './_getMapData.js'], function (exports, _getMapData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getMapData2 = _interopRequireDefault(_getMapData);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return (0, _getMapData2.default)(this, key).has(key);
  }

  exports.default = mapCacheHas;
});