define(['exports', './_baseProperty.js', './_basePropertyDeep.js', './_isKey.js', './_toKey.js'], function (exports, _baseProperty, _basePropertyDeep, _isKey, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseProperty2 = _interopRequireDefault(_baseProperty);

  var _basePropertyDeep2 = _interopRequireDefault(_basePropertyDeep);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return (0, _isKey2.default)(path) ? (0, _baseProperty2.default)((0, _toKey2.default)(path)) : (0, _basePropertyDeep2.default)(path);
  }

  exports.default = property;
});