define(['exports', './_baseExtremum.js', './_baseIteratee.js', './_baseLt.js'], function (exports, _baseExtremum, _baseIteratee, _baseLt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseExtremum2 = _interopRequireDefault(_baseExtremum);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseLt2 = _interopRequireDefault(_baseLt);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.min` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.minBy(objects, function(o) { return o.n; });
   * // => { 'n': 1 }
   *
   * // The `_.property` iteratee shorthand.
   * _.minBy(objects, 'n');
   * // => { 'n': 1 }
   */
  function minBy(array, iteratee) {
    return array && array.length ? (0, _baseExtremum2.default)(array, (0, _baseIteratee2.default)(iteratee), _baseLt2.default) : undefined;
  }

  exports.default = minBy;
});