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
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return (0, _assocIndexOf2.default)(this.__data__, key) > -1;
  }

  exports.default = listCacheHas;
});