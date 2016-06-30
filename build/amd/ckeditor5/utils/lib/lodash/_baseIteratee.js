define(['exports', './_baseMatches.js', './_baseMatchesProperty.js', './identity.js', './isArray.js', './property.js'], function (exports, _baseMatches, _baseMatchesProperty, _identity, _isArray, _property) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseMatches2 = _interopRequireDefault(_baseMatches);

  var _baseMatchesProperty2 = _interopRequireDefault(_baseMatchesProperty);

  var _identity2 = _interopRequireDefault(_identity);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _property2 = _interopRequireDefault(_property);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return _identity2.default;
    }
    if (typeof value == 'object') {
      return (0, _isArray2.default)(value) ? (0, _baseMatchesProperty2.default)(value[0], value[1]) : (0, _baseMatches2.default)(value);
    }
    return (0, _property2.default)(value);
  }

  exports.default = baseIteratee;
});