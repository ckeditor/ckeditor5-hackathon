define(['exports', './_Reflect.js', './_iteratorToArray.js'], function (exports, _Reflect, _iteratorToArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Reflect2 = _interopRequireDefault(_Reflect);

  var _iteratorToArray2 = _interopRequireDefault(_iteratorToArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Built-in value references. */
  var enumerate = _Reflect2.default ? _Reflect2.default.enumerate : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /**
   * The base implementation of `_.keysIn` which doesn't skip the constructor
   * property of prototypes or treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    object = object == null ? object : Object(object);

    var result = [];
    for (var key in object) {
      result.push(key);
    }
    return result;
  }

  // Fallback for IE < 9 with es6-shim.
  if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
    baseKeysIn = function (object) {
      return (0, _iteratorToArray2.default)(enumerate(object));
    };
  }

  exports.default = baseKeysIn;
});