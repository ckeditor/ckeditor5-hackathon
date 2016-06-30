define(['exports', './get.js'], function (exports, _get) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _get2 = _interopRequireDefault(_get);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.at` without support for individual paths.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {string[]} paths The property paths of elements to pick.
   * @returns {Array} Returns the picked elements.
   */
  function baseAt(object, paths) {
    var index = -1,
        isNil = object == null,
        length = paths.length,
        result = Array(length);

    while (++index < length) {
      result[index] = isNil ? undefined : (0, _get2.default)(object, paths[index]);
    }
    return result;
  }

  exports.default = baseAt;
});