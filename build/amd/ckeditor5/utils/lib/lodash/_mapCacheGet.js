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
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return (0, _getMapData2.default)(this, key).get(key);
  }

  exports.default = mapCacheGet;
});