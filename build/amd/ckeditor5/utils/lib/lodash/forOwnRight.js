define(['exports', './_baseForOwnRight.js', './_baseIteratee.js'], function (exports, _baseForOwnRight, _baseIteratee) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseForOwnRight2 = _interopRequireDefault(_baseForOwnRight);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.forOwn` except that it iterates over properties of
   * `object` in the opposite order.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns `object`.
   * @see _.forOwn
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.forOwnRight(new Foo, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
   */
  function forOwnRight(object, iteratee) {
    return object && (0, _baseForOwnRight2.default)(object, (0, _baseIteratee2.default)(iteratee, 3));
  }

  exports.default = forOwnRight;
});