define(['exports', './_baseInvoke.js', './rest.js'], function (exports, _baseInvoke, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseInvoke2 = _interopRequireDefault(_baseInvoke);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The opposite of `_.method`; this method creates a function that invokes
   * the method at a given path of `object`. Any additional arguments are
   * provided to the invoked method.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Util
   * @param {Object} object The object to query.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Function} Returns the new invoker function.
   * @example
   *
   * var array = _.times(3, _.constant),
   *     object = { 'a': array, 'b': array, 'c': array };
   *
   * _.map(['a[2]', 'c[0]'], _.methodOf(object));
   * // => [2, 0]
   *
   * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
   * // => [2, 0]
   */
  var methodOf = (0, _rest2.default)(function (object, args) {
    return function (path) {
      return (0, _baseInvoke2.default)(object, path, args);
    };
  });

  exports.default = methodOf;
});