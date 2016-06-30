define(['exports', './_apply.js', './_assignInDefaults.js', './assignInWith.js', './rest.js'], function (exports, _apply, _assignInDefaults, _assignInWith, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _assignInDefaults2 = _interopRequireDefault(_assignInDefaults);

  var _assignInWith2 = _interopRequireDefault(_assignInWith);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  var defaults = (0, _rest2.default)(function (args) {
    args.push(undefined, _assignInDefaults2.default);
    return (0, _apply2.default)(_assignInWith2.default, undefined, args);
  });

  exports.default = defaults;
});