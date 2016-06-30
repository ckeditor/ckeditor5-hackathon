define(['exports', './_ListCache.js', './_MapCache.js'], function (exports, _ListCache, _MapCache) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ListCache2 = _interopRequireDefault(_ListCache);

  var _MapCache2 = _interopRequireDefault(_MapCache);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof _ListCache2.default && cache.__data__.length == LARGE_ARRAY_SIZE) {
      cache = this.__data__ = new _MapCache2.default(cache.__data__);
    }
    cache.set(key, value);
    return this;
  }

  exports.default = stackSet;
});