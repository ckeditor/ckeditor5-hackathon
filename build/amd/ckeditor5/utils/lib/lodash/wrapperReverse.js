define(['exports', './_LazyWrapper.js', './_LodashWrapper.js', './reverse.js', './thru.js'], function (exports, _LazyWrapper, _LodashWrapper, _reverse, _thru) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _LodashWrapper2 = _interopRequireDefault(_LodashWrapper);

  var _reverse2 = _interopRequireDefault(_reverse);

  var _thru2 = _interopRequireDefault(_thru);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is the wrapper version of `_.reverse`.
   *
   * **Note:** This method mutates the wrapped array.
   *
   * @name reverse
   * @memberOf _
   * @since 0.1.0
   * @category Seq
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var array = [1, 2, 3];
   *
   * _(array).reverse().value()
   * // => [3, 2, 1]
   *
   * console.log(array);
   * // => [3, 2, 1]
   */
  function wrapperReverse() {
    var value = this.__wrapped__;
    if (value instanceof _LazyWrapper2.default) {
      var wrapped = value;
      if (this.__actions__.length) {
        wrapped = new _LazyWrapper2.default(this);
      }
      wrapped = wrapped.reverse();
      wrapped.__actions__.push({
        'func': _thru2.default,
        'args': [_reverse2.default],
        'thisArg': undefined
      });
      return new _LodashWrapper2.default(wrapped, this.__chain__);
    }
    return this.thru(_reverse2.default);
  }

  exports.default = wrapperReverse;
});