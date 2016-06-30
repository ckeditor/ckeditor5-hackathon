define(['exports', './_MapCache.js', './_setCacheAdd.js', './_setCacheHas.js'], function (exports, _MapCache, _setCacheAdd, _setCacheHas) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _MapCache2 = _interopRequireDefault(_MapCache);

  var _setCacheAdd2 = _interopRequireDefault(_setCacheAdd);

  var _setCacheHas2 = _interopRequireDefault(_setCacheHas);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values ? values.length : 0;

    this.__data__ = new _MapCache2.default();
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd2.default;
  SetCache.prototype.has = _setCacheHas2.default;

  exports.default = SetCache;
});