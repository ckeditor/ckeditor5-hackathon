define(['exports', './_baseCreate.js', './_getPrototype.js', './_isPrototype.js'], function (exports, _baseCreate, _getPrototype, _isPrototype) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseCreate2 = _interopRequireDefault(_baseCreate);

  var _getPrototype2 = _interopRequireDefault(_getPrototype);

  var _isPrototype2 = _interopRequireDefault(_isPrototype);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !(0, _isPrototype2.default)(object) ? (0, _baseCreate2.default)((0, _getPrototype2.default)(object)) : {};
  }

  exports.default = initCloneObject;
});