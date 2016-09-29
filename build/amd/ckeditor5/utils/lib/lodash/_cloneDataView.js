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
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? (0, _cloneArrayBuffer2.default)(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  exports.default = cloneDataView;
});