define(['exports', './_getPrototype.js'], function (exports, _getPrototype) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototype2 = _interopRequireDefault(_getPrototype);

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
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
    // that are composed entirely of index properties, return `false` for
    // `hasOwnProperty` checks of them.
    return hasOwnProperty.call(object, key) || typeof object == 'object' && key in object && (0, _getPrototype2.default)(object) === null;
  }

  exports.default = baseHas;
});