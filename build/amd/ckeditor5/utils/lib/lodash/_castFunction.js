define(['exports', './identity.js'], function (exports, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : _identity2.default;
  }

  exports.default = castFunction;
});