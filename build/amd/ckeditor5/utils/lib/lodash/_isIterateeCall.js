define(['exports', './eq.js', './isArrayLike.js', './_isIndex.js', './isObject.js'], function (exports, _eq, _isArrayLike, _isIndex, _isObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _eq2 = _interopRequireDefault(_eq);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!(0, _isObject2.default)(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number' ? (0, _isArrayLike2.default)(object) && (0, _isIndex2.default)(index, object.length) : type == 'string' && index in object) {
      return (0, _eq2.default)(object[index], value);
    }
    return false;
  }

  exports.default = isIterateeCall;
});