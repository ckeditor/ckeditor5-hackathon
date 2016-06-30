define(['exports', './_apply.js', './_mergeDefaults.js', './mergeWith.js', './rest.js'], function (exports, _apply, _mergeDefaults, _mergeWith, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _mergeDefaults2 = _interopRequireDefault(_mergeDefaults);

  var _mergeWith2 = _interopRequireDefault(_mergeWith);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
   * // => { 'user': { 'name': 'barney', 'age': 36 } }
   *
   */
  var defaultsDeep = (0, _rest2.default)(function (args) {
    args.push(undefined, _mergeDefaults2.default);
    return (0, _apply2.default)(_mergeWith2.default, undefined, args);
  });

  exports.default = defaultsDeep;
});