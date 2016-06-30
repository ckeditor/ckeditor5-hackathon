define(['exports', './_baseClone.js', './_baseConforms.js'], function (exports, _baseClone, _baseConforms) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseClone2 = _interopRequireDefault(_baseClone);

  var _baseConforms2 = _interopRequireDefault(_baseConforms);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that invokes the predicate properties of `source` with
   * the corresponding property values of a given object, returning `true` if
   * all predicates return truthy, else `false`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {Object} source The object of property predicates to conform to.
   * @returns {Function} Returns the new spec function.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 }
   * ];
   *
   * _.filter(users, _.conforms({ 'age': _.partial(_.gt, _, 38) }));
   * // => [{ 'user': 'fred', 'age': 40 }]
   */
  function conforms(source) {
    return (0, _baseConforms2.default)((0, _baseClone2.default)(source, true));
  }

  exports.default = conforms;
});