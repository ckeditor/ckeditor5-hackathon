define(['exports', './_Stack.js', './_equalArrays.js', './_equalByTag.js', './_equalObjects.js', './_getTag.js', './isArray.js', './_isHostObject.js', './isTypedArray.js'], function (exports, _Stack, _equalArrays, _equalByTag, _equalObjects, _getTag, _isArray, _isHostObject, _isTypedArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Stack2 = _interopRequireDefault(_Stack);

  var _equalArrays2 = _interopRequireDefault(_equalArrays);

  var _equalByTag2 = _interopRequireDefault(_equalByTag);

  var _equalObjects2 = _interopRequireDefault(_equalObjects);

  var _getTag2 = _interopRequireDefault(_getTag);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isHostObject2 = _interopRequireDefault(_isHostObject);

  var _isTypedArray2 = _interopRequireDefault(_isTypedArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose bitmasks for comparison styles. */
  var PARTIAL_COMPARE_FLAG = 2;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      objectTag = '[object Object]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
    var objIsArr = (0, _isArray2.default)(object),
        othIsArr = (0, _isArray2.default)(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = (0, _getTag2.default)(object);
      objTag = objTag == argsTag ? objectTag : objTag;
    }
    if (!othIsArr) {
      othTag = (0, _getTag2.default)(other);
      othTag = othTag == argsTag ? objectTag : othTag;
    }
    var objIsObj = objTag == objectTag && !(0, _isHostObject2.default)(object),
        othIsObj = othTag == objectTag && !(0, _isHostObject2.default)(other),
        isSameTag = objTag == othTag;

    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack2.default());
      return objIsArr || (0, _isTypedArray2.default)(object) ? (0, _equalArrays2.default)(object, other, equalFunc, customizer, bitmask, stack) : (0, _equalByTag2.default)(object, other, objTag, equalFunc, customizer, bitmask, stack);
    }
    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new _Stack2.default());
        return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new _Stack2.default());
    return (0, _equalObjects2.default)(object, other, equalFunc, customizer, bitmask, stack);
  }

  exports.default = baseIsEqualDeep;
});