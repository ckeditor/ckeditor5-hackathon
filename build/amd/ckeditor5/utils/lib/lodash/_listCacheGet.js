define(['exports', './_assocIndexOf.js'], function (exports, _assocIndexOf) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assocIndexOf2 = _interopRequireDefault(_assocIndexOf);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = (0, _assocIndexOf2.default)(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  exports.default = listCacheGet;
});