define(['exports', './_LazyWrapper.js', './_LodashWrapper.js', './_copyArray.js'], function (exports, _LazyWrapper, _LodashWrapper, _copyArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _LodashWrapper2 = _interopRequireDefault(_LodashWrapper);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of `wrapper`.
   *
   * @private
   * @param {Object} wrapper The wrapper to clone.
   * @returns {Object} Returns the cloned wrapper.
   */
  function wrapperClone(wrapper) {
    if (wrapper instanceof _LazyWrapper2.default) {
      return wrapper.clone();
    }
    var result = new _LodashWrapper2.default(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = (0, _copyArray2.default)(wrapper.__actions__);
    result.__index__ = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
  }

  exports.default = wrapperClone;
});