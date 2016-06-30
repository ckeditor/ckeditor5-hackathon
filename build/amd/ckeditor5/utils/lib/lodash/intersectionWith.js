define(['exports', './_arrayMap.js', './_baseIntersection.js', './_castArrayLikeObject.js', './last.js', './rest.js'], function (exports, _arrayMap, _baseIntersection, _castArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIntersection2 = _interopRequireDefault(_baseIntersection);

  var _castArrayLikeObject2 = _interopRequireDefault(_castArrayLikeObject);

  var _last2 = _interopRequireDefault(_last);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.intersection` except that it accepts `comparator`
   * which is invoked to compare elements of `arrays`. Result values are chosen
   * from the first array. The comparator is invoked with two arguments:
   * (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.intersectionWith(objects, others, _.isEqual);
   * // => [{ 'x': 1, 'y': 2 }]
   */
  var intersectionWith = (0, _rest2.default)(function (arrays) {
    var comparator = (0, _last2.default)(arrays),
        mapped = (0, _arrayMap2.default)(arrays, _castArrayLikeObject2.default);

    if (comparator === (0, _last2.default)(mapped)) {
      comparator = undefined;
    } else {
      mapped.pop();
    }
    return mapped.length && mapped[0] === arrays[0] ? (0, _baseIntersection2.default)(mapped, undefined, comparator) : [];
  });

  exports.default = intersectionWith;
});