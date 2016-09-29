define(['exports', './_baseClone.js', './_baseMatchesProperty.js'], function (exports, _baseClone, _baseMatchesProperty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClone2 = _interopRequireDefault(_baseClone);

  var _baseMatchesProperty2 = _interopRequireDefault(_baseMatchesProperty);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that performs a partial deep comparison between the
   * value at `path` of a given object to `srcValue`, returning `true` if the
   * object value is equivalent, else `false`.
   *
   * **Note:** This method supports comparing the same values as `_.isEqual`.
   *
   * @static
   * @memberOf _
   * @since 3.2.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   * @example
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * _.find(users, _.matchesProperty('user', 'fred'));
   * // => { 'user': 'fred' }
   */
  function matchesProperty(path, srcValue) {
    return (0, _baseMatchesProperty2.default)(path, (0, _baseClone2.default)(srcValue, true));
  }

  exports.default = matchesProperty;
});