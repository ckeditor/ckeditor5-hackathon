define(['exports', './_baseMerge.js', './isObject.js'], function (exports, _baseMerge, _isObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseMerge2 = _interopRequireDefault(_baseMerge);

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   * @returns {*} Returns the value to assign.
   */
  function mergeDefaults(objValue, srcValue, key, object, source, stack) {
    if ((0, _isObject2.default)(objValue) && (0, _isObject2.default)(srcValue)) {
      (0, _baseMerge2.default)(objValue, srcValue, undefined, mergeDefaults, stack.set(srcValue, objValue));
    }
    return objValue;
  }

  exports.default = mergeDefaults;
});