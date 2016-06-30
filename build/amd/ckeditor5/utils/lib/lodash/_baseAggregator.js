define(['exports', './_baseEach.js'], function (exports, _baseEach) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseEach2 = _interopRequireDefault(_baseEach);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Aggregates elements of `collection` on `accumulator` with keys transformed
   * by `iteratee` and values set by `setter`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function baseAggregator(collection, setter, iteratee, accumulator) {
    (0, _baseEach2.default)(collection, function (value, key, collection) {
      setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
  }

  exports.default = baseAggregator;
});