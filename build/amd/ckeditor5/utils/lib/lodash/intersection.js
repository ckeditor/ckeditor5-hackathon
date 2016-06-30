define(['exports', './_arrayMap.js', './_baseIntersection.js', './_castArrayLikeObject.js', './rest.js'], function (exports, _arrayMap, _baseIntersection, _castArrayLikeObject, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIntersection2 = _interopRequireDefault(_baseIntersection);

  var _castArrayLikeObject2 = _interopRequireDefault(_castArrayLikeObject);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of unique values that are included in all given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons. The order of result values is determined by the
   * order they occur in the first array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersection([2, 1], [4, 2], [1, 2]);
   * // => [2]
   */
  var intersection = (0, _rest2.default)(function (arrays) {
    var mapped = (0, _arrayMap2.default)(arrays, _castArrayLikeObject2.default);
    return mapped.length && mapped[0] === arrays[0] ? (0, _baseIntersection2.default)(mapped) : [];
  });

  exports.default = intersection;
});