define(['exports', './_assignMergeValue.js', './_baseClone.js', './_copyArray.js', './isArguments.js', './isArray.js', './isArrayLikeObject.js', './isFunction.js', './isObject.js', './isPlainObject.js', './isTypedArray.js', './toPlainObject.js'], function (exports, _assignMergeValue, _baseClone, _copyArray, _isArguments, _isArray, _isArrayLikeObject, _isFunction, _isObject, _isPlainObject, _isTypedArray, _toPlainObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assignMergeValue2 = _interopRequireDefault(_assignMergeValue);

  var _baseClone2 = _interopRequireDefault(_baseClone);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _isArguments2 = _interopRequireDefault(_isArguments);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isArrayLikeObject2 = _interopRequireDefault(_isArrayLikeObject);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

  var _isTypedArray2 = _interopRequireDefault(_isTypedArray);

  var _toPlainObject2 = _interopRequireDefault(_toPlainObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = object[key],
        srcValue = source[key],
        stacked = stack.get(srcValue);

    if (stacked) {
      (0, _assignMergeValue2.default)(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      newValue = srcValue;
      if ((0, _isArray2.default)(srcValue) || (0, _isTypedArray2.default)(srcValue)) {
        if ((0, _isArray2.default)(objValue)) {
          newValue = objValue;
        } else if ((0, _isArrayLikeObject2.default)(objValue)) {
          newValue = (0, _copyArray2.default)(objValue);
        } else {
          isCommon = false;
          newValue = (0, _baseClone2.default)(srcValue, true);
        }
      } else if ((0, _isPlainObject2.default)(srcValue) || (0, _isArguments2.default)(srcValue)) {
        if ((0, _isArguments2.default)(objValue)) {
          newValue = (0, _toPlainObject2.default)(objValue);
        } else if (!(0, _isObject2.default)(objValue) || srcIndex && (0, _isFunction2.default)(objValue)) {
          isCommon = false;
          newValue = (0, _baseClone2.default)(srcValue, true);
        } else {
          newValue = objValue;
        }
      } else {
        isCommon = false;
      }
    }
    stack.set(srcValue, newValue);

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    }
    stack['delete'](srcValue);
    (0, _assignMergeValue2.default)(object, key, newValue);
  }

  exports.default = baseMergeDeep;
});