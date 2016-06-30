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
   * Invokes the method at `path` of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the method to invoke.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {*} Returns the result of the invoked method.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
   *
   * _.invoke(object, 'a[0].b.c.slice', 1, 3);
   * // => [2, 3]
   */
  var invoke = (0, _rest2.default)(_baseInvoke2.default);

  exports.default = invoke;
});