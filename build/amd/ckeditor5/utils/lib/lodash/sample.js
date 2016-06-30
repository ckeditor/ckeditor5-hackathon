define(['exports', './_baseRandom.js', './isArrayLike.js', './values.js'], function (exports, _baseRandom, _isArrayLike, _values) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseRandom2 = _interopRequireDefault(_baseRandom);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _values2 = _interopRequireDefault(_values);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets a random element from `collection`.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to sample.
   * @returns {*} Returns the random element.
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   */
  function sample(collection) {
    var array = (0, _isArrayLike2.default)(collection) ? collection : (0, _values2.default)(collection),
        length = array.length;

    return length > 0 ? array[(0, _baseRandom2.default)(0, length - 1)] : undefined;
  }

  exports.default = sample;
});