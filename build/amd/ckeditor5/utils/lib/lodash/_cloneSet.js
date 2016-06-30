define(['exports', './_addSetEntry.js', './_arrayReduce.js', './_setToArray.js'], function (exports, _addSetEntry, _arrayReduce, _setToArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _addSetEntry2 = _interopRequireDefault(_addSetEntry);

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  var _setToArray2 = _interopRequireDefault(_setToArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of `set`.
   *
   * @private
   * @param {Object} set The set to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned set.
   */
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc((0, _setToArray2.default)(set), true) : (0, _setToArray2.default)(set);
    return (0, _arrayReduce2.default)(array, _addSetEntry2.default, new set.constructor());
  }

  exports.default = cloneSet;
});