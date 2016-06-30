define(['exports', './_castPath.js', './_isIndex.js', './_isKey.js', './last.js', './_parent.js', './_toKey.js'], function (exports, _castPath, _isIndex, _isKey, _last, _parent, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _castPath2 = _interopRequireDefault(_castPath);

  var _isIndex2 = _interopRequireDefault(_isIndex);

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

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * The base implementation of `_.pullAt` without support for individual
   * indexes or capturing the removed elements.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {number[]} indexes The indexes of elements to remove.
   * @returns {Array} Returns `array`.
   */
  function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0,
        lastIndex = length - 1;

    while (length--) {
      var index = indexes[length];
      if (length == lastIndex || index !== previous) {
        var previous = index;
        if ((0, _isIndex2.default)(index)) {
          splice.call(array, index, 1);
        } else if (!(0, _isKey2.default)(index, array)) {
          var path = (0, _castPath2.default)(index),
              object = (0, _parent2.default)(array, path);

          if (object != null) {
            delete object[(0, _toKey2.default)((0, _last2.default)(path))];
          }
        } else {
          delete array[(0, _toKey2.default)(index)];
        }
      }
    }
    return array;
  }

  exports.default = basePullAt;
});