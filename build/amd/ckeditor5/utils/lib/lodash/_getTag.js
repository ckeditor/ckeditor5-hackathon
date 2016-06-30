define(['exports', './_DataView.js', './_Map.js', './_Promise.js', './_Set.js', './_WeakMap.js', './_toSource.js'], function (exports, _DataView, _Map, _Promise, _Set, _WeakMap, _toSource) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _DataView2 = _interopRequireDefault(_DataView);

  var _Map2 = _interopRequireDefault(_Map);

  var _Promise2 = _interopRequireDefault(_Promise);

  var _Set2 = _interopRequireDefault(_Set);

  var _WeakMap2 = _interopRequireDefault(_WeakMap);

  var _toSource2 = _interopRequireDefault(_toSource);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = (0, _toSource2.default)(_DataView2.default),
      mapCtorString = (0, _toSource2.default)(_Map2.default),
      promiseCtorString = (0, _toSource2.default)(_Promise2.default),
      setCtorString = (0, _toSource2.default)(_Set2.default),
      weakMapCtorString = (0, _toSource2.default)(_WeakMap2.default);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function getTag(value) {
    return objectToString.call(value);
  }

  // Fallback for data views, maps, sets, and weak maps in IE 11,
  // for data views in Edge, and promises in Node.js.
  if (_DataView2.default && getTag(new _DataView2.default(new ArrayBuffer(1))) != dataViewTag || _Map2.default && getTag(new _Map2.default()) != mapTag || _Promise2.default && getTag(_Promise2.default.resolve()) != promiseTag || _Set2.default && getTag(new _Set2.default()) != setTag || _WeakMap2.default && getTag(new _WeakMap2.default()) != weakMapTag) {
    getTag = function (value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? (0, _toSource2.default)(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }

  exports.default = getTag;
});