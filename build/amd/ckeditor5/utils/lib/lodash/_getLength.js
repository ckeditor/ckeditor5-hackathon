define(['exports', './_baseProperty.js'], function (exports, _baseProperty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseProperty2 = _interopRequireDefault(_baseProperty);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the "length" property value of `object`.
   *
   * **Note:** This function is used to avoid a
   * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
   * Safari on at least iOS 8.1-8.3 ARM64.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {*} Returns the "length" value.
   */
  var getLength = (0, _baseProperty2.default)('length');

  exports.default = getLength;
});