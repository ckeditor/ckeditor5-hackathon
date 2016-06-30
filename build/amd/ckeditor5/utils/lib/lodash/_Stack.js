define(['exports', './_ListCache.js', './_stackClear.js', './_stackDelete.js', './_stackGet.js', './_stackHas.js', './_stackSet.js'], function (exports, _ListCache, _stackClear, _stackDelete, _stackGet, _stackHas, _stackSet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ListCache2 = _interopRequireDefault(_ListCache);

  var _stackClear2 = _interopRequireDefault(_stackClear);

  var _stackDelete2 = _interopRequireDefault(_stackDelete);

  var _stackGet2 = _interopRequireDefault(_stackGet);

  var _stackHas2 = _interopRequireDefault(_stackHas);

  var _stackSet2 = _interopRequireDefault(_stackSet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    this.__data__ = new _ListCache2.default(entries);
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear2.default;
  Stack.prototype['delete'] = _stackDelete2.default;
  Stack.prototype.get = _stackGet2.default;
  Stack.prototype.has = _stackHas2.default;
  Stack.prototype.set = _stackSet2.default;

  exports.default = Stack;
});