define(['exports', './_baseHas.js', './_hasPath.js'], function (exports, _baseHas, _hasPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseHas2 = _interopRequireDefault(_baseHas);

  var _hasPath2 = _interopRequireDefault(_hasPath);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && (0, _hasPath2.default)(object, path, _baseHas2.default);
  }

  exports.default = has;
});