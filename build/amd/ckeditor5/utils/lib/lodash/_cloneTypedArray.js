define(['exports', './_cloneArrayBuffer.js'], function (exports, _cloneArrayBuffer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _cloneArrayBuffer2 = _interopRequireDefault(_cloneArrayBuffer);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? (0, _cloneArrayBuffer2.default)(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  exports.default = cloneTypedArray;
});