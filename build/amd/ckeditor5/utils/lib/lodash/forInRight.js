define(['exports', './_baseForRight.js', './_baseIteratee.js', './keysIn.js'], function (exports, _baseForRight, _baseIteratee, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseForRight2 = _interopRequireDefault(_baseForRight);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.forIn` except that it iterates over properties of
   * `object` in the opposite order.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns `object`.
   * @see _.forIn
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.forInRight(new Foo, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
   */
  function forInRight(object, iteratee) {
    return object == null ? object : (0, _baseForRight2.default)(object, (0, _baseIteratee2.default)(iteratee, 3), _keysIn2.default);
  }

  exports.default = forInRight;
});