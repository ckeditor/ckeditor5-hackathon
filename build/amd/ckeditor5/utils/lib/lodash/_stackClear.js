define(['exports', './_ListCache.js'], function (exports, _ListCache) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ListCache2 = _interopRequireDefault(_ListCache);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache2.default();
  }

  exports.default = stackClear;
});