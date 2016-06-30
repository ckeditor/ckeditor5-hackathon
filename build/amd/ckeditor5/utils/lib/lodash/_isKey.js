define(['exports', './isArray.js', './isSymbol.js'], function (exports, _isArray, _isSymbol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isSymbol2 = _interopRequireDefault(_isSymbol);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if ((0, _isArray2.default)(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || (0, _isSymbol2.default)(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  exports.default = isKey;
});