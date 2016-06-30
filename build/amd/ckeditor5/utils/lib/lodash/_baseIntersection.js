define(['exports', './_SetCache.js', './_arrayIncludes.js', './_arrayIncludesWith.js', './_arrayMap.js', './_baseUnary.js', './_cacheHas.js'], function (exports, _SetCache, _arrayIncludes, _arrayIncludesWith, _arrayMap, _baseUnary, _cacheHas) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SetCache2 = _interopRequireDefault(_SetCache);

  var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

  var _arrayIncludesWith2 = _interopRequireDefault(_arrayIncludesWith);

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseUnary2 = _interopRequireDefault(_baseUnary);

  var _cacheHas2 = _interopRequireDefault(_cacheHas);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * The base implementation of methods like `_.intersection`, without support
   * for iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of shared values.
   */
  function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? _arrayIncludesWith2.default : _arrayIncludes2.default,
        length = arrays[0].length,
        othLength = arrays.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];

    while (othIndex--) {
      var array = arrays[othIndex];
      if (othIndex && iteratee) {
        array = (0, _arrayMap2.default)(array, (0, _baseUnary2.default)(iteratee));
      }
      maxLength = nativeMin(array.length, maxLength);
      caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new _SetCache2.default(othIndex && array) : undefined;
    }
    array = arrays[0];

    var index = -1,
        seen = caches[0];

    outer: while (++index < length && result.length < maxLength) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = comparator || value !== 0 ? value : 0;
      if (!(seen ? (0, _cacheHas2.default)(seen, computed) : includes(result, computed, comparator))) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache ? (0, _cacheHas2.default)(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  exports.default = baseIntersection;
});