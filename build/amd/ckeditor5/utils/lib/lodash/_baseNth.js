define(['exports', './_isIndex.js'], function (exports, _isIndex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isIndex2 = _interopRequireDefault(_isIndex);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.nth` which doesn't coerce `n` to an integer.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {number} n The index of the element to return.
   * @returns {*} Returns the nth element of `array`.
   */
  function baseNth(array, n) {
    var length = array.length;
    if (!length) {
      return;
    }
    n += n < 0 ? length : 0;
    return (0, _isIndex2.default)(n, length) ? array[n] : undefined;
  }

  exports.default = baseNth;
});