define(['exports', './_baseSum.js'], function (exports, _baseSum) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSum2 = _interopRequireDefault(_baseSum);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array ? array.length : 0;
    return length ? (0, _baseSum2.default)(array, iteratee) / length : NAN;
  }

  exports.default = baseMean;
});