define(['exports', './_nativeCreate.js'], function (exports, _nativeCreate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _nativeCreate2 = _interopRequireDefault(_nativeCreate);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate2.default ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  exports.default = hashHas;
});