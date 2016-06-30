define(['exports', './_baseAt.js', './_baseFlatten.js', './rest.js'], function (exports, _baseAt, _baseFlatten, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseAt2 = _interopRequireDefault(_baseAt);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of values corresponding to `paths` of `object`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {...(string|string[])} [paths] The property paths of elements to pick.
   * @returns {Array} Returns the picked values.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
   *
   * _.at(object, ['a[0].b.c', 'a[1]']);
   * // => [3, 4]
   *
   * _.at(['a', 'b', 'c'], 0, 2);
   * // => ['a', 'c']
   */
  var at = (0, _rest2.default)(function (object, paths) {
    return (0, _baseAt2.default)(object, (0, _baseFlatten2.default)(paths, 1));
  });

  exports.default = at;
});