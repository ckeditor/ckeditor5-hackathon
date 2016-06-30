define(['exports', './_baseEach.js', './isArrayLike.js'], function (exports, _baseEach, _isArrayLike) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseEach2 = _interopRequireDefault(_baseEach);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = (0, _isArrayLike2.default)(collection) ? Array(collection.length) : [];

    (0, _baseEach2.default)(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  exports.default = baseMap;
});