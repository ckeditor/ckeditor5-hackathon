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
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    return (0, _getMapData2.default)(this, key)['delete'](key);
  }

  exports.default = mapCacheDelete;
});