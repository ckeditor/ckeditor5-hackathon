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

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * The base implementation of methods like `_.difference` without support
   * for excluding multiple arrays or iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes2.default,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

    if (!length) {
      return result;
    }
    if (iteratee) {
      values = (0, _arrayMap2.default)(values, (0, _baseUnary2.default)(iteratee));
    }
    if (comparator) {
      includes = _arrayIncludesWith2.default;
      isCommon = false;
    } else if (values.length >= LARGE_ARRAY_SIZE) {
      includes = _cacheHas2.default;
      isCommon = false;
      values = new _SetCache2.default(values);
    }
    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
    return result;
  }

  exports.default = baseDifference;
});