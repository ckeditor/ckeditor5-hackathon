define(['exports', './_createToPairs.js', './keys.js'], function (exports, _createToPairs, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createToPairs2 = _interopRequireDefault(_createToPairs);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of own enumerable string keyed-value pairs for `object`
   * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
   * entries are returned.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias entries
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the key-value pairs.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.toPairs(new Foo);
   * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
   */
  var toPairs = (0, _createToPairs2.default)(_keys2.default);

  exports.default = toPairs;
});