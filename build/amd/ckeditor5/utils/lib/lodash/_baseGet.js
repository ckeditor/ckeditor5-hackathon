define(['exports', './_castPath.js', './_isKey.js', './_toKey.js'], function (exports, _castPath, _isKey, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = (0, _isKey2.default)(path, object) ? [path] : (0, _castPath2.default)(path);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[(0, _toKey2.default)(path[index++])];
    }
    return index && index == length ? object : undefined;
  }

  exports.default = baseGet;
});