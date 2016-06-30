define(['exports', './_realNames.js'], function (exports, _realNames) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _realNames2 = _interopRequireDefault(_realNames);

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
   * Gets the name of `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {string} Returns the function name.
   */
  function getFuncName(func) {
    var result = func.name + '',
        array = _realNames2.default[result],
        length = hasOwnProperty.call(_realNames2.default, result) ? array.length : 0;

    while (length--) {
      var data = array[length],
          otherFunc = data.func;
      if (otherFunc == null || otherFunc == func) {
        return data.name;
      }
    }
    return result;
  }

  exports.default = getFuncName;
});