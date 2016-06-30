define(['exports', './_getAllKeysIn.js'], function (exports, _getAllKeysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getAllKeysIn2 = _interopRequireDefault(_getAllKeysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy(object, predicate) {
    var index = -1,
        props = (0, _getAllKeysIn2.default)(object),
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index],
          value = object[key];

      if (predicate(value, key)) {
        result[key] = value;
      }
    }
    return result;
  }

  exports.default = basePickBy;
});