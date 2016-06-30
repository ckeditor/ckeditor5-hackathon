define(['exports', './_baseSet.js'], function (exports, _baseSet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSet2 = _interopRequireDefault(_baseSet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.set` except that it accepts `customizer` which is
   * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
   * path creation is handled by the method instead. The `customizer` is invoked
   * with three arguments: (nsValue, key, nsObject).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {};
   *
   * _.setWith(object, '[0][1]', 'a', Object);
   * // => { '0': { '1': 'a' } }
   */
  function setWith(object, path, value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return object == null ? object : (0, _baseSet2.default)(object, path, value, customizer);
  }

  exports.default = setWith;
});