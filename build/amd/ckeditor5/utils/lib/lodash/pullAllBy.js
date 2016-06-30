define(['exports', './_baseIteratee.js', './_basePullAll.js'], function (exports, _baseIteratee, _basePullAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _basePullAll2 = _interopRequireDefault(_basePullAll);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.pullAll` except that it accepts `iteratee` which is
   * invoked for each element of `array` and `values` to generate the criterion
   * by which they're compared. The iteratee is invoked with one argument: (value).
   *
   * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Array} values The values to remove.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
   *
   * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
   * console.log(array);
   * // => [{ 'x': 2 }]
   */
  function pullAllBy(array, values, iteratee) {
    return array && array.length && values && values.length ? (0, _basePullAll2.default)(array, values, (0, _baseIteratee2.default)(iteratee)) : array;
  }

  exports.default = pullAllBy;
});