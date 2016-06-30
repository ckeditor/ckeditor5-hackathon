define(['exports', './_arrayPush.js', './_baseDifference.js', './_baseUniq.js'], function (exports, _arrayPush, _baseDifference, _baseUniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _baseUniq2 = _interopRequireDefault(_baseUniq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of methods like `_.xor`, without support for
   * iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of values.
   */
  function baseXor(arrays, iteratee, comparator) {
    var index = -1,
        length = arrays.length;

    while (++index < length) {
      var result = result ? (0, _arrayPush2.default)((0, _baseDifference2.default)(result, arrays[index], iteratee, comparator), (0, _baseDifference2.default)(arrays[index], result, iteratee, comparator)) : arrays[index];
    }
    return result && result.length ? (0, _baseUniq2.default)(result, iteratee, comparator) : [];
  }

  exports.default = baseXor;
});