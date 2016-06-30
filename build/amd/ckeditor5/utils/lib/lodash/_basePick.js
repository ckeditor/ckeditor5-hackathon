define(['exports', './_arrayReduce.js'], function (exports, _arrayReduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} props The property identifiers to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, props) {
    object = Object(object);
    return (0, _arrayReduce2.default)(props, function (result, key) {
      if (key in object) {
        result[key] = object[key];
      }
      return result;
    }, {});
  }

  exports.default = basePick;
});