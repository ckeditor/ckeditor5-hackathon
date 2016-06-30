define(['exports', './_listCacheClear.js', './_listCacheDelete.js', './_listCacheGet.js', './_listCacheHas.js', './_listCacheSet.js'], function (exports, _listCacheClear, _listCacheDelete, _listCacheGet, _listCacheHas, _listCacheSet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _listCacheClear2 = _interopRequireDefault(_listCacheClear);

  var _listCacheDelete2 = _interopRequireDefault(_listCacheDelete);

  var _listCacheGet2 = _interopRequireDefault(_listCacheGet);

  var _listCacheHas2 = _interopRequireDefault(_listCacheHas);

  var _listCacheSet2 = _interopRequireDefault(_listCacheSet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear2.default;
  ListCache.prototype['delete'] = _listCacheDelete2.default;
  ListCache.prototype.get = _listCacheGet2.default;
  ListCache.prototype.has = _listCacheHas2.default;
  ListCache.prototype.set = _listCacheSet2.default;

  exports.default = ListCache;
});