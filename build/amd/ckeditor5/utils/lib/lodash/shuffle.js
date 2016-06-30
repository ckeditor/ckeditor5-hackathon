define(['exports', './sampleSize.js'], function (exports, _sampleSize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sampleSize2 = _interopRequireDefault(_sampleSize);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /**
   * Creates an array of shuffled values, using a version of the
   * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to shuffle.
   * @returns {Array} Returns the new shuffled array.
   * @example
   *
   * _.shuffle([1, 2, 3, 4]);
   * // => [4, 1, 3, 2]
   */
  function shuffle(collection) {
    return (0, _sampleSize2.default)(collection, MAX_ARRAY_LENGTH);
  }

  exports.default = shuffle;
});