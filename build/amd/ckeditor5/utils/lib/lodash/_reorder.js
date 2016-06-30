define(['exports', './_copyArray.js', './_isIndex.js'], function (exports, _copyArray, _isIndex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * Reorder `array` according to the specified indexes where the element at
   * the first index is assigned as the first element, the element at
   * the second index is assigned as the second element, and so on.
   *
   * @private
   * @param {Array} array The array to reorder.
   * @param {Array} indexes The arranged array indexes.
   * @returns {Array} Returns `array`.
   */
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = nativeMin(indexes.length, arrLength),
        oldArray = (0, _copyArray2.default)(array);

    while (length--) {
      var index = indexes[length];
      array[length] = (0, _isIndex2.default)(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }

  exports.default = reorder;
});