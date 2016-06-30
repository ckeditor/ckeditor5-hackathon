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

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used by `_.defaults` to customize its `_.assignIn` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to assign.
   * @param {Object} object The parent object of `objValue`.
   * @returns {*} Returns the value to assign.
   */
  function assignInDefaults(objValue, srcValue, key, object) {
    if (objValue === undefined || (0, _eq2.default)(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
      return srcValue;
    }
    return objValue;
  }

  exports.default = assignInDefaults;
});