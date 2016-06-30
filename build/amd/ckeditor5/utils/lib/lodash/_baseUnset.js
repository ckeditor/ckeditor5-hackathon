define(['exports', './_baseHas.js', './_castPath.js', './_isKey.js', './last.js', './_parent.js', './_toKey.js'], function (exports, _baseHas, _castPath, _isKey, _last, _parent, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseHas2 = _interopRequireDefault(_baseHas);

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _last2 = _interopRequireDefault(_last);

  var _parent2 = _interopRequireDefault(_parent);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = (0, _isKey2.default)(path, object) ? [path] : (0, _castPath2.default)(path);
    object = (0, _parent2.default)(object, path);

    var key = (0, _toKey2.default)((0, _last2.default)(path));
    return !(object != null && (0, _baseHas2.default)(object, key)) || delete object[key];
  }

  exports.default = baseUnset;
});