define(['exports', './_baseIsEqual.js', './get.js', './hasIn.js', './_isKey.js', './_isStrictComparable.js', './_matchesStrictComparable.js', './_toKey.js'], function (exports, _baseIsEqual, _get, _hasIn, _isKey, _isStrictComparable, _matchesStrictComparable, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIsEqual2 = _interopRequireDefault(_baseIsEqual);

  var _get2 = _interopRequireDefault(_get);

  var _hasIn2 = _interopRequireDefault(_hasIn);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _isStrictComparable2 = _interopRequireDefault(_isStrictComparable);

  var _matchesStrictComparable2 = _interopRequireDefault(_matchesStrictComparable);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose bitmasks for comparison styles. */
  var UNORDERED_COMPARE_FLAG = 1,
      PARTIAL_COMPARE_FLAG = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if ((0, _isKey2.default)(path) && (0, _isStrictComparable2.default)(srcValue)) {
      return (0, _matchesStrictComparable2.default)((0, _toKey2.default)(path), srcValue);
    }
    return function (object) {
      var objValue = (0, _get2.default)(object, path);
      return objValue === undefined && objValue === srcValue ? (0, _hasIn2.default)(object, path) : (0, _baseIsEqual2.default)(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
  }

  exports.default = baseMatchesProperty;
});