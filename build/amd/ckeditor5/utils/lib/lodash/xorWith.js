define(['exports', './_arrayFilter.js', './_baseXor.js', './isArrayLikeObject.js', './last.js', './rest.js'], function (exports, _arrayFilter, _baseXor, _isArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _baseXor2 = _interopRequireDefault(_baseXor);

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
   * This method is like `_.xor` except that it accepts `comparator` which is
   * invoked to compare elements of `arrays`. The comparator is invoked with
   * two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.xorWith(objects, others, _.isEqual);
   * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
   */
  var xorWith = (0, _rest2.default)(function (arrays) {
    var comparator = (0, _last2.default)(arrays);
    if ((0, _isArrayLikeObject2.default)(comparator)) {
      comparator = undefined;
    }
    return (0, _baseXor2.default)((0, _arrayFilter2.default)(arrays, _isArrayLikeObject2.default), undefined, comparator);
  });

  exports.default = xorWith;
});