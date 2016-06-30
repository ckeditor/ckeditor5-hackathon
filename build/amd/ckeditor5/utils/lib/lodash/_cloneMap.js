define(['exports', './_addMapEntry.js', './_arrayReduce.js', './_mapToArray.js'], function (exports, _addMapEntry, _arrayReduce, _mapToArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _addMapEntry2 = _interopRequireDefault(_addMapEntry);

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  var _mapToArray2 = _interopRequireDefault(_mapToArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of `map`.
   *
   * @private
   * @param {Object} map The map to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned map.
   */
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc((0, _mapToArray2.default)(map), true) : (0, _mapToArray2.default)(map);
    return (0, _arrayReduce2.default)(array, _addMapEntry2.default, new map.constructor());
  }

  exports.default = cloneMap;
});