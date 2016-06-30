define(['exports', './_copyObject.js', './keys.js'], function (exports, _copyObject, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _copyObject2 = _interopRequireDefault(_copyObject);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && (0, _copyObject2.default)(source, (0, _keys2.default)(source), object);
  }

  exports.default = baseAssign;
});