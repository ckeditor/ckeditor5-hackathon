define(['exports', './_apply.js', './_castPath.js', './_isKey.js', './last.js', './_parent.js', './_toKey.js'], function (exports, _apply, _castPath, _isKey, _last, _parent, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

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
   * The base implementation of `_.invoke` without support for individual
   * method arguments.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the method to invoke.
   * @param {Array} args The arguments to invoke the method with.
   * @returns {*} Returns the result of the invoked method.
   */
  function baseInvoke(object, path, args) {
    if (!(0, _isKey2.default)(path, object)) {
      path = (0, _castPath2.default)(path);
      object = (0, _parent2.default)(object, path);
      path = (0, _last2.default)(path);
    }
    var func = object == null ? object : object[(0, _toKey2.default)(path)];
    return func == null ? undefined : (0, _apply2.default)(func, object, args);
  }

  exports.default = baseInvoke;
});