define(['exports', './_apply.js', './_baseEach.js', './_baseInvoke.js', './isArrayLike.js', './_isKey.js', './rest.js'], function (exports, _apply, _baseEach, _baseInvoke, _isArrayLike, _isKey, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _baseEach2 = _interopRequireDefault(_baseEach);

  var _baseInvoke2 = _interopRequireDefault(_baseInvoke);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isKey2 = _interopRequireDefault(_isKey);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Invokes the method at `path` of each element in `collection`, returning
   * an array of the results of each invoked method. Any additional arguments
   * are provided to each invoked method. If `methodName` is a function, it's
   * invoked for and `this` bound to, each element in `collection`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array|Function|string} path The path of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [args] The arguments to invoke each method with.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invokeMap([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  var invokeMap = (0, _rest2.default)(function (collection, path, args) {
    var index = -1,
        isFunc = typeof path == 'function',
        isProp = (0, _isKey2.default)(path),
        result = (0, _isArrayLike2.default)(collection) ? Array(collection.length) : [];

    (0, _baseEach2.default)(collection, function (value) {
      var func = isFunc ? path : isProp && value != null ? value[path] : undefined;
      result[++index] = func ? (0, _apply2.default)(func, value, args) : (0, _baseInvoke2.default)(value, path, args);
    });
    return result;
  });

  exports.default = invokeMap;
});