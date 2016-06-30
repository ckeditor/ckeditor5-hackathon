define(['exports', './eq.js'], function (exports, _eq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _eq2 = _interopRequireDefault(_eq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if (value !== undefined && !(0, _eq2.default)(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
      object[key] = value;
    }
  }

  exports.default = assignMergeValue;
});