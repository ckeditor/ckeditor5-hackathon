define(['exports', './_baseForOwn.js'], function (exports, _baseForOwn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.invert` and `_.invertBy` which inverts
   * `object` with values transformed by `iteratee` and set by `setter`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform values.
   * @param {Object} accumulator The initial inverted object.
   * @returns {Function} Returns `accumulator`.
   */
  function baseInverter(object, setter, iteratee, accumulator) {
    (0, _baseForOwn2.default)(object, function (value, key, object) {
      setter(accumulator, iteratee(value), key, object);
    });
    return accumulator;
  }

  exports.default = baseInverter;
});