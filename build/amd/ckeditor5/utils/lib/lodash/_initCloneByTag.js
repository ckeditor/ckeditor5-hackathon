define(['exports', './_cloneArrayBuffer.js', './_cloneDataView.js', './_cloneMap.js', './_cloneRegExp.js', './_cloneSet.js', './_cloneSymbol.js', './_cloneTypedArray.js'], function (exports, _cloneArrayBuffer, _cloneDataView, _cloneMap, _cloneRegExp, _cloneSet, _cloneSymbol, _cloneTypedArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _cloneArrayBuffer2 = _interopRequireDefault(_cloneArrayBuffer);

  var _cloneDataView2 = _interopRequireDefault(_cloneDataView);

  var _cloneMap2 = _interopRequireDefault(_cloneMap);

  var _cloneRegExp2 = _interopRequireDefault(_cloneRegExp);

  var _cloneSet2 = _interopRequireDefault(_cloneSet);

  var _cloneSymbol2 = _interopRequireDefault(_cloneSymbol);

  var _cloneTypedArray2 = _interopRequireDefault(_cloneTypedArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';

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

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return (0, _cloneArrayBuffer2.default)(object);

      case boolTag:
      case dateTag:
        return new Ctor(+object);

      case dataViewTag:
        return (0, _cloneDataView2.default)(object, isDeep);

      case float32Tag:case float64Tag:
      case int8Tag:case int16Tag:case int32Tag:
      case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
        return (0, _cloneTypedArray2.default)(object, isDeep);

      case mapTag:
        return (0, _cloneMap2.default)(object, isDeep, cloneFunc);

      case numberTag:
      case stringTag:
        return new Ctor(object);

      case regexpTag:
        return (0, _cloneRegExp2.default)(object);

      case setTag:
        return (0, _cloneSet2.default)(object, isDeep, cloneFunc);

      case symbolTag:
        return (0, _cloneSymbol2.default)(object);
    }
  }

  exports.default = initCloneByTag;
});