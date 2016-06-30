define(['exports', './_createToPairs.js', './keysIn.js'], function (exports, _createToPairs, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createToPairs2 = _interopRequireDefault(_createToPairs);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of own and inherited enumerable string keyed-value pairs
   * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
   * or set, its entries are returned.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias entriesIn
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
   * _.toPairsIn(new Foo);
   * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
   */
  var toPairsIn = (0, _createToPairs2.default)(_keysIn2.default);

  exports.default = toPairsIn;
});