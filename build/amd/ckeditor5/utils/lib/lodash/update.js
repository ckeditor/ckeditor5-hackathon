define(['exports', './_baseUpdate.js', './_castFunction.js'], function (exports, _baseUpdate, _castFunction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseUpdate2 = _interopRequireDefault(_baseUpdate);

  var _castFunction2 = _interopRequireDefault(_castFunction);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.set` except that accepts `updater` to produce the
   * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
   * is invoked with one argument: (value).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.6.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {Function} updater The function to produce the updated value.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.update(object, 'a[0].b.c', function(n) { return n * n; });
   * console.log(object.a[0].b.c);
   * // => 9
   *
   * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
   * console.log(object.x[0].y.z);
   * // => 0
   */
  function update(object, path, updater) {
    return object == null ? object : (0, _baseUpdate2.default)(object, path, (0, _castFunction2.default)(updater));
  }

  exports.default = update;
});