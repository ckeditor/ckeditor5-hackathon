define(['exports', './_assignValue.js', './_castPath.js', './_isIndex.js', './_isKey.js', './isObject.js', './_toKey.js'], function (exports, _assignValue, _castPath, _isIndex, _isKey, _isObject, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assignValue2 = _interopRequireDefault(_assignValue);

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    path = (0, _isKey2.default)(path, object) ? [path] : (0, _castPath2.default)(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = (0, _toKey2.default)(path[index]);
      if ((0, _isObject2.default)(nested)) {
        var newValue = value;
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = objValue == null ? (0, _isIndex2.default)(path[index + 1]) ? [] : {} : objValue;
          }
        }
        (0, _assignValue2.default)(nested, key, newValue);
      }
      nested = nested[key];
    }
    return object;
  }

  exports.default = baseSet;
});