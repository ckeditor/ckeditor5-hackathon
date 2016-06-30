define(['exports', './_SetCache.js', './_arrayIncludes.js', './_arrayIncludesWith.js', './_cacheHas.js', './_createSet.js', './_setToArray.js'], function (exports, _SetCache, _arrayIncludes, _arrayIncludesWith, _cacheHas, _createSet, _setToArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SetCache2 = _interopRequireDefault(_SetCache);

  var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

  var _arrayIncludesWith2 = _interopRequireDefault(_arrayIncludesWith);

  var _cacheHas2 = _interopRequireDefault(_cacheHas);

  var _createSet2 = _interopRequireDefault(_createSet);

  var _setToArray2 = _interopRequireDefault(_setToArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes2.default,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = _arrayIncludesWith2.default;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : (0, _createSet2.default)(array);
      if (set) {
        return (0, _setToArray2.default)(set);
      }
      isCommon = false;
      includes = _cacheHas2.default;
      seen = new _SetCache2.default();
    } else {
      seen = iteratee ? [] : result;
    }
    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  exports.default = baseUniq;
});