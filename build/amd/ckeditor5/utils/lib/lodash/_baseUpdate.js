define(['exports', './_baseGet.js', './_baseSet.js'], function (exports, _baseGet, _baseSet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseGet2 = _interopRequireDefault(_baseGet);

  var _baseSet2 = _interopRequireDefault(_baseSet);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.update`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to update.
   * @param {Function} updater The function to produce the updated value.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseUpdate(object, path, updater, customizer) {
    return (0, _baseSet2.default)(object, path, updater((0, _baseGet2.default)(object, path)), customizer);
  }

  exports.default = baseUpdate;
});