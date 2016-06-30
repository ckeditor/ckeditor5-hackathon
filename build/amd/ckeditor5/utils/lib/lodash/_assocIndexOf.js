define(['exports', './eq.js'], function (exports, _eq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _eq2 = _interopRequireDefault(_eq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if ((0, _eq2.default)(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  exports.default = assocIndexOf;
});