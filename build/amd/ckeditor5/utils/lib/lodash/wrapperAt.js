define(['exports', './_LazyWrapper.js', './_LodashWrapper.js', './_baseAt.js', './_baseFlatten.js', './_isIndex.js', './rest.js', './thru.js'], function (exports, _LazyWrapper, _LodashWrapper, _baseAt, _baseFlatten, _isIndex, _rest, _thru) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _LodashWrapper2 = _interopRequireDefault(_LodashWrapper);

  var _baseAt2 = _interopRequireDefault(_baseAt);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _rest2 = _interopRequireDefault(_rest);

  var _thru2 = _interopRequireDefault(_thru);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is the wrapper version of `_.at`.
   *
   * @name at
   * @memberOf _
   * @since 1.0.0
   * @category Seq
   * @param {...(string|string[])} [paths] The property paths of elements to pick.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
   *
   * _(object).at(['a[0].b.c', 'a[1]']).value();
   * // => [3, 4]
   *
   * _(['a', 'b', 'c']).at(0, 2).value();
   * // => ['a', 'c']
   */
  var wrapperAt = (0, _rest2.default)(function (paths) {
    paths = (0, _baseFlatten2.default)(paths, 1);
    var length = paths.length,
        start = length ? paths[0] : 0,
        value = this.__wrapped__,
        interceptor = function (object) {
      return (0, _baseAt2.default)(object, paths);
    };

    if (length > 1 || this.__actions__.length || !(value instanceof _LazyWrapper2.default) || !(0, _isIndex2.default)(start)) {
      return this.thru(interceptor);
    }
    value = value.slice(start, +start + (length ? 1 : 0));
    value.__actions__.push({
      'func': _thru2.default,
      'args': [interceptor],
      'thisArg': undefined
    });
    return new _LodashWrapper2.default(value, this.__chain__).thru(function (array) {
      if (length && !array.length) {
        array.push(undefined);
      }
      return array;
    });
  });

  exports.default = wrapperAt;
});