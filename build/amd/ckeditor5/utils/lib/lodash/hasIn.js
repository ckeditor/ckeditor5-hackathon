define(['exports', './_baseHasIn.js', './_hasPath.js'], function (exports, _baseHasIn, _hasPath) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseHasIn2 = _interopRequireDefault(_baseHasIn);

  var _hasPath2 = _interopRequireDefault(_hasPath);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && (0, _hasPath2.default)(object, path, _baseHasIn2.default);
  }

  exports.default = hasIn;
});