define(['exports', './_createBaseFor.js'], function (exports, _createBaseFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createBaseFor2 = _interopRequireDefault(_createBaseFor);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This function is like `baseFor` except that it iterates over properties
   * in the opposite order.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseForRight = (0, _createBaseFor2.default)(true);

  exports.default = baseForRight;
});