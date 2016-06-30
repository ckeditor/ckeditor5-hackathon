define(['exports', './_baseDifference.js', './_baseFlatten.js', './isArrayLikeObject.js', './last.js', './rest.js'], function (exports, _baseDifference, _baseFlatten, _isArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _last2 = _interopRequireDefault(_last);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.difference` except that it accepts `comparator`
   * which is invoked to compare elements of `array` to `values`. Result values
   * are chosen from the first array. The comparator is invoked with two arguments:
   * (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   *
   * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
   * // => [{ 'x': 2, 'y': 1 }]
   */
  var differenceWith = (0, _rest2.default)(function (array, values) {
    var comparator = (0, _last2.default)(values);
    if ((0, _isArrayLikeObject2.default)(comparator)) {
      comparator = undefined;
    }
    return (0, _isArrayLikeObject2.default)(array) ? (0, _baseDifference2.default)(array, (0, _baseFlatten2.default)(values, 1, _isArrayLikeObject2.default, true), undefined, comparator) : [];
  });

  exports.default = differenceWith;
});