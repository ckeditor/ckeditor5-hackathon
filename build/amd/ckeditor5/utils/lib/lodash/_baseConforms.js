define(['exports', './keys.js'], function (exports, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.conforms` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property predicates to conform to.
   * @returns {Function} Returns the new spec function.
   */
  function baseConforms(source) {
    var props = (0, _keys2.default)(source),
        length = props.length;

    return function (object) {
      if (object == null) {
        return !length;
      }
      var index = length;
      while (index--) {
        var key = props[index],
            predicate = source[key],
            value = object[key];

        if (value === undefined && !(key in Object(object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    };
  }

  exports.default = baseConforms;
});