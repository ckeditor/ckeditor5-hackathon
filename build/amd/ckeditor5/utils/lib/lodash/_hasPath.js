define(['exports', './_castPath.js', './isArguments.js', './isArray.js', './_isIndex.js', './_isKey.js', './isLength.js', './isString.js', './_toKey.js'], function (exports, _castPath, _isArguments, _isArray, _isIndex, _isKey, _isLength, _isString, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isArguments2 = _interopRequireDefault(_isArguments);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _isLength2 = _interopRequireDefault(_isLength);

  var _isString2 = _interopRequireDefault(_isString);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = (0, _isKey2.default)(path, object) ? [path] : (0, _castPath2.default)(path);

    var result,
        index = -1,
        length = path.length;

    while (++index < length) {
      var key = (0, _toKey2.default)(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result) {
      return result;
    }
    var length = object ? object.length : 0;
    return !!length && (0, _isLength2.default)(length) && (0, _isIndex2.default)(key, length) && ((0, _isArray2.default)(object) || (0, _isString2.default)(object) || (0, _isArguments2.default)(object));
  }

  exports.default = hasPath;
});