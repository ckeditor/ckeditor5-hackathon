define(['exports', './_Stack.js', './_arrayEach.js', './_assignValue.js', './_baseAssign.js', './_cloneBuffer.js', './_copyArray.js', './_copySymbols.js', './_getAllKeys.js', './_getTag.js', './_initCloneArray.js', './_initCloneByTag.js', './_initCloneObject.js', './isArray.js', './isBuffer.js', './_isHostObject.js', './isObject.js', './keys.js'], function (exports, _Stack, _arrayEach, _assignValue, _baseAssign, _cloneBuffer, _copyArray, _copySymbols, _getAllKeys, _getTag, _initCloneArray, _initCloneByTag, _initCloneObject, _isArray, _isBuffer, _isHostObject, _isObject, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Stack2 = _interopRequireDefault(_Stack);

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _assignValue2 = _interopRequireDefault(_assignValue);

  var _baseAssign2 = _interopRequireDefault(_baseAssign);

  var _cloneBuffer2 = _interopRequireDefault(_cloneBuffer);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _copySymbols2 = _interopRequireDefault(_copySymbols);

  var _getAllKeys2 = _interopRequireDefault(_getAllKeys);

  var _getTag2 = _interopRequireDefault(_getTag);

  var _initCloneArray2 = _interopRequireDefault(_initCloneArray);

  var _initCloneByTag2 = _interopRequireDefault(_initCloneByTag);

  var _initCloneObject2 = _interopRequireDefault(_initCloneObject);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isBuffer2 = _interopRequireDefault(_isBuffer);

  var _isHostObject2 = _interopRequireDefault(_isHostObject);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {boolean} [isFull] Specify a clone including symbols.
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!(0, _isObject2.default)(value)) {
      return value;
    }
    var isArr = (0, _isArray2.default)(value);
    if (isArr) {
      result = (0, _initCloneArray2.default)(value);
      if (!isDeep) {
        return (0, _copyArray2.default)(value, result);
      }
    } else {
      var tag = (0, _getTag2.default)(value),
          isFunc = tag == funcTag || tag == genTag;

      if ((0, _isBuffer2.default)(value)) {
        return (0, _cloneBuffer2.default)(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if ((0, _isHostObject2.default)(value)) {
          return object ? value : {};
        }
        result = (0, _initCloneObject2.default)(isFunc ? {} : value);
        if (!isDeep) {
          return (0, _copySymbols2.default)(value, (0, _baseAssign2.default)(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = (0, _initCloneByTag2.default)(value, tag, baseClone, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack2.default());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (!isArr) {
      var props = isFull ? (0, _getAllKeys2.default)(value) : (0, _keys2.default)(value);
    }
    // Recursively populate clone (susceptible to call stack limits).
    (0, _arrayEach2.default)(props || value, function (subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      (0, _assignValue2.default)(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
    });
    return result;
  }

  exports.default = baseClone;
});