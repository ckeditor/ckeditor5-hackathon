define(['exports', './_baseTimes.js', './isArguments.js', './isArray.js', './isLength.js', './isString.js'], function (exports, _baseTimes, _isArguments, _isArray, _isLength, _isString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseTimes2 = _interopRequireDefault(_baseTimes);

  var _isArguments2 = _interopRequireDefault(_isArguments);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isLength2 = _interopRequireDefault(_isLength);

  var _isString2 = _interopRequireDefault(_isString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of index keys for `object` values of arrays,
   * `arguments` objects, and strings, otherwise `null` is returned.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array|null} Returns index keys, else `null`.
   */
  function indexKeys(object) {
    var length = object ? object.length : undefined;
    if ((0, _isLength2.default)(length) && ((0, _isArray2.default)(object) || (0, _isString2.default)(object) || (0, _isArguments2.default)(object))) {
      return (0, _baseTimes2.default)(length, String);
    }
    return null;
  }

  exports.default = indexKeys;
});