define(['exports', './_arrayMap.js', './_baseIndexOf.js', './_baseIndexOfWith.js', './_baseUnary.js'], function (exports, _arrayMap, _baseIndexOf, _baseIndexOfWith, _baseUnary) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIndexOf2 = _interopRequireDefault(_baseIndexOf);

  var _baseIndexOfWith2 = _interopRequireDefault(_baseIndexOfWith);

  var _baseUnary2 = _interopRequireDefault(_baseUnary);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * The base implementation of `_.pullAllBy` without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to remove.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns `array`.
   */
  function basePullAll(array, values, iteratee, comparator) {
    var indexOf = comparator ? _baseIndexOfWith2.default : _baseIndexOf2.default,
        index = -1,
        length = values.length,
        seen = array;

    if (iteratee) {
      seen = (0, _arrayMap2.default)(array, (0, _baseUnary2.default)(iteratee));
    }
    while (++index < length) {
      var fromIndex = 0,
          value = values[index],
          computed = iteratee ? iteratee(value) : value;

      while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
        if (seen !== array) {
          splice.call(seen, fromIndex, 1);
        }
        splice.call(array, fromIndex, 1);
      }
    }
    return array;
  }

  exports.default = basePullAll;
});