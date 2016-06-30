define(['exports', './_assignValue.js'], function (exports, _assignValue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assignValue2 = _interopRequireDefault(_assignValue);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];

      (0, _assignValue2.default)(object, key, newValue);
    }
    return object;
  }

  exports.default = copyObject;
});