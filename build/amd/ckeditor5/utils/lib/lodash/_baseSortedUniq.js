define(['exports', './eq.js'], function (exports, _eq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _eq2 = _interopRequireDefault(_eq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseSortedUniq(array, iteratee) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      if (!index || !(0, _eq2.default)(computed, seen)) {
        var seen = computed;
        result[resIndex++] = value === 0 ? 0 : value;
      }
    }
    return result;
  }

  exports.default = baseSortedUniq;
});