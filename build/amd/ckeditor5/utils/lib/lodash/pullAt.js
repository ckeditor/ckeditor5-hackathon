define(['exports', './_arrayMap.js', './_baseAt.js', './_baseFlatten.js', './_basePullAt.js', './_compareAscending.js', './_isIndex.js', './rest.js'], function (exports, _arrayMap, _baseAt, _baseFlatten, _basePullAt, _compareAscending, _isIndex, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseAt2 = _interopRequireDefault(_baseAt);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _basePullAt2 = _interopRequireDefault(_basePullAt);

  var _compareAscending2 = _interopRequireDefault(_compareAscending);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Removes elements from `array` corresponding to `indexes` and returns an
   * array of removed elements.
   *
   * **Note:** Unlike `_.at`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...(number|number[])} [indexes] The indexes of elements to remove.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [5, 10, 15, 20];
   * var evens = _.pullAt(array, 1, 3);
   *
   * console.log(array);
   * // => [5, 15]
   *
   * console.log(evens);
   * // => [10, 20]
   */
  var pullAt = (0, _rest2.default)(function (array, indexes) {
    indexes = (0, _baseFlatten2.default)(indexes, 1);

    var length = array ? array.length : 0,
        result = (0, _baseAt2.default)(array, indexes);

    (0, _basePullAt2.default)(array, (0, _arrayMap2.default)(indexes, function (index) {
      return (0, _isIndex2.default)(index, length) ? +index : index;
    }).sort(_compareAscending2.default));

    return result;
  });

  exports.default = pullAt;
});