define(['exports', './_baseIteratee.js', './_baseMean.js'], function (exports, _baseIteratee, _baseMean) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseMean2 = _interopRequireDefault(_baseMean);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.mean` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the value to be averaged.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {number} Returns the mean.
   * @example
   *
   * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
   *
   * _.meanBy(objects, function(o) { return o.n; });
   * // => 5
   *
   * // The `_.property` iteratee shorthand.
   * _.meanBy(objects, 'n');
   * // => 5
   */
  function meanBy(array, iteratee) {
    return (0, _baseMean2.default)(array, (0, _baseIteratee2.default)(iteratee));
  }

  exports.default = meanBy;
});