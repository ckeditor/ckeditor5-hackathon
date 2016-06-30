define(['exports', './_mapCacheClear.js', './_mapCacheDelete.js', './_mapCacheGet.js', './_mapCacheHas.js', './_mapCacheSet.js'], function (exports, _mapCacheClear, _mapCacheDelete, _mapCacheGet, _mapCacheHas, _mapCacheSet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mapCacheClear2 = _interopRequireDefault(_mapCacheClear);

  var _mapCacheDelete2 = _interopRequireDefault(_mapCacheDelete);

  var _mapCacheGet2 = _interopRequireDefault(_mapCacheGet);

  var _mapCacheHas2 = _interopRequireDefault(_mapCacheHas);

  var _mapCacheSet2 = _interopRequireDefault(_mapCacheSet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear2.default;
  MapCache.prototype['delete'] = _mapCacheDelete2.default;
  MapCache.prototype.get = _mapCacheGet2.default;
  MapCache.prototype.has = _mapCacheHas2.default;
  MapCache.prototype.set = _mapCacheSet2.default;

  exports.default = MapCache;
});