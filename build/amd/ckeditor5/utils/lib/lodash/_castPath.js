define(['exports', './isArray.js', './_stringToPath.js'], function (exports, _isArray, _stringToPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray2 = _interopRequireDefault(_isArray);

  var _stringToPath2 = _interopRequireDefault(_stringToPath);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value) {
    return (0, _isArray2.default)(value) ? value : (0, _stringToPath2.default)(value);
  }

  exports.default = castPath;
});