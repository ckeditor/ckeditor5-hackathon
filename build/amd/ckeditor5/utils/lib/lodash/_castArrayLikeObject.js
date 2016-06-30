define(['exports', './isArrayLikeObject.js'], function (exports, _isArrayLikeObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Casts `value` to an empty array if it's not an array like object.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array|Object} Returns the cast array-like object.
   */
  function castArrayLikeObject(value) {
    return (0, _isArrayLikeObject2.default)(value) ? value : [];
  }

  exports.default = castArrayLikeObject;
});