define(['exports', './_baseUniq.js'], function (exports, _baseUniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseUniq2 = _interopRequireDefault(_baseUniq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurrence of each
   * element is kept.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   */
  function uniq(array) {
    return array && array.length ? (0, _baseUniq2.default)(array) : [];
  }

  exports.default = uniq;
});