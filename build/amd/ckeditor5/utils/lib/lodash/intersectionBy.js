define(['exports', './_arrayMap.js', './_baseIntersection.js', './_baseIteratee.js', './_castArrayLikeObject.js', './last.js', './rest.js'], function (exports, _arrayMap, _baseIntersection, _baseIteratee, _castArrayLikeObject, _last, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIntersection2 = _interopRequireDefault(_baseIntersection);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

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
   * This method is like `_.intersection` except that it accepts `iteratee`
   * which is invoked for each element of each `arrays` to generate the criterion
   * by which they're compared. Result values are chosen from the first array.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee invoked per element.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
   * // => [2.1]
   *
   * // The `_.property` iteratee shorthand.
   * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }]
   */
  var intersectionBy = (0, _rest2.default)(function (arrays) {
    var iteratee = (0, _last2.default)(arrays),
        mapped = (0, _arrayMap2.default)(arrays, _castArrayLikeObject2.default);

    if (iteratee === (0, _last2.default)(mapped)) {
      iteratee = undefined;
    } else {
      mapped.pop();
    }
    return mapped.length && mapped[0] === arrays[0] ? (0, _baseIntersection2.default)(mapped, (0, _baseIteratee2.default)(iteratee)) : [];
  });

  exports.default = intersectionBy;
});