define(['exports', './_Stack.js', './_arrayEach.js', './_assignMergeValue.js', './_baseMergeDeep.js', './isArray.js', './isObject.js', './isTypedArray.js', './keysIn.js'], function (exports, _Stack, _arrayEach, _assignMergeValue, _baseMergeDeep, _isArray, _isObject, _isTypedArray, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Stack2 = _interopRequireDefault(_Stack);

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _assignMergeValue2 = _interopRequireDefault(_assignMergeValue);

  var _baseMergeDeep2 = _interopRequireDefault(_baseMergeDeep);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _isTypedArray2 = _interopRequireDefault(_isTypedArray);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    if (!((0, _isArray2.default)(source) || (0, _isTypedArray2.default)(source))) {
      var props = (0, _keysIn2.default)(source);
    }
    (0, _arrayEach2.default)(props || source, function (srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if ((0, _isObject2.default)(srcValue)) {
        stack || (stack = new _Stack2.default());
        (0, _baseMergeDeep2.default)(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        (0, _assignMergeValue2.default)(object, key, newValue);
      }
    });
  }

  exports.default = baseMerge;
});