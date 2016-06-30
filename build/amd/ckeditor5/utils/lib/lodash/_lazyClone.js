define(['exports', './_LazyWrapper.js', './_copyArray.js'], function (exports, _LazyWrapper, _copyArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of the lazy wrapper object.
   *
   * @private
   * @name clone
   * @memberOf LazyWrapper
   * @returns {Object} Returns the cloned `LazyWrapper` object.
   */
  function lazyClone() {
    var result = new _LazyWrapper2.default(this.__wrapped__);
    result.__actions__ = (0, _copyArray2.default)(this.__actions__);
    result.__dir__ = this.__dir__;
    result.__filtered__ = this.__filtered__;
    result.__iteratees__ = (0, _copyArray2.default)(this.__iteratees__);
    result.__takeCount__ = this.__takeCount__;
    result.__views__ = (0, _copyArray2.default)(this.__views__);
    return result;
  }

  exports.default = lazyClone;
});