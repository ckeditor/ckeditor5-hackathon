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
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = (0, _assocIndexOf2.default)(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  exports.default = listCacheSet;
});