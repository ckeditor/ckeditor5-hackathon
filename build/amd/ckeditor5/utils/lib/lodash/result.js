define(['exports', './_castPath.js', './isFunction.js', './_isKey.js', './_toKey.js'], function (exports, _castPath, _isFunction, _isKey, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.get` except that if the resolved value is a
   * function it's invoked with the `this` binding of its parent object and
   * its result is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to resolve.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
   *
   * _.result(object, 'a[0].b.c1');
   * // => 3
   *
   * _.result(object, 'a[0].b.c2');
   * // => 4
   *
   * _.result(object, 'a[0].b.c3', 'default');
   * // => 'default'
   *
   * _.result(object, 'a[0].b.c3', _.constant('default'));
   * // => 'default'
   */
  function result(object, path, defaultValue) {
    path = (0, _isKey2.default)(path, object) ? [path] : (0, _castPath2.default)(path);

    var index = -1,
        length = path.length;

    // Ensure the loop is entered when path is empty.
    if (!length) {
      object = undefined;
      length = 1;
    }
    while (++index < length) {
      var value = object == null ? undefined : object[(0, _toKey2.default)(path[index])];
      if (value === undefined) {
        index = length;
        value = defaultValue;
      }
      object = (0, _isFunction2.default)(value) ? value.call(object) : value;
    }
    return object;
  }

  exports.default = result;
});