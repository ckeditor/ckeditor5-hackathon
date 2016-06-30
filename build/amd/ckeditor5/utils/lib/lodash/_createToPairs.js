define(['exports', './_baseToPairs.js', './_getTag.js', './_mapToArray.js', './_setToPairs.js'], function (exports, _baseToPairs, _getTag, _mapToArray, _setToPairs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToPairs2 = _interopRequireDefault(_baseToPairs);

  var _getTag2 = _interopRequireDefault(_getTag);

  var _mapToArray2 = _interopRequireDefault(_mapToArray);

  var _setToPairs2 = _interopRequireDefault(_setToPairs);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /**
   * Creates a `_.toPairs` or `_.toPairsIn` function.
   *
   * @private
   * @param {Function} keysFunc The function to get the keys of a given object.
   * @returns {Function} Returns the new pairs function.
   */
  function createToPairs(keysFunc) {
    return function (object) {
      var tag = (0, _getTag2.default)(object);
      if (tag == mapTag) {
        return (0, _mapToArray2.default)(object);
      }
      if (tag == setTag) {
        return (0, _setToPairs2.default)(object);
      }
      return (0, _baseToPairs2.default)(object, keysFunc(object));
    };
  }

  exports.default = createToPairs;
});