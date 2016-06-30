define(['exports', './_arrayFilter.js', './_arrayMap.js', './_baseProperty.js', './_baseTimes.js', './isArrayLikeObject.js'], function (exports, _arrayFilter, _arrayMap, _baseProperty, _baseTimes, _isArrayLikeObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseProperty2 = _interopRequireDefault(_baseProperty);

  var _baseTimes2 = _interopRequireDefault(_baseTimes);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * This method is like `_.zip` except that it accepts an array of grouped
   * elements and creates an array regrouping the elements to their pre-zip
   * configuration.
   *
   * @static
   * @memberOf _
   * @since 1.2.0
   * @category Array
   * @param {Array} array The array of grouped elements to process.
   * @returns {Array} Returns the new array of regrouped elements.
   * @example
   *
   * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   *
   * _.unzip(zipped);
   * // => [['fred', 'barney'], [30, 40], [true, false]]
   */
  function unzip(array) {
    if (!(array && array.length)) {
      return [];
    }
    var length = 0;
    array = (0, _arrayFilter2.default)(array, function (group) {
      if ((0, _isArrayLikeObject2.default)(group)) {
        length = nativeMax(group.length, length);
        return true;
      }
    });
    return (0, _baseTimes2.default)(length, function (index) {
      return (0, _arrayMap2.default)(array, (0, _baseProperty2.default)(index));
    });
  }

  exports.default = unzip;
});