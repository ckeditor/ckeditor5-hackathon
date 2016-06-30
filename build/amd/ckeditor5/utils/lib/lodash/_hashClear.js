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

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate2.default ? (0, _nativeCreate2.default)(null) : {};
  }

  exports.default = hashClear;
});