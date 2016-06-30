define(['exports', './_baseGet.js'], function (exports, _baseGet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseGet2 = _interopRequireDefault(_baseGet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The opposite of `_.property`; this method creates a function that returns
   * the value at a given path of `object`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var array = [0, 1, 2],
   *     object = { 'a': array, 'b': array, 'c': array };
   *
   * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
   * // => [2, 0]
   *
   * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
   * // => [2, 0]
   */
  function propertyOf(object) {
    return function (path) {
      return object == null ? undefined : (0, _baseGet2.default)(object, path);
    };
  }

  exports.default = propertyOf;
});