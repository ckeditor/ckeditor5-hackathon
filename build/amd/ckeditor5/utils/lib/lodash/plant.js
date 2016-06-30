define(['exports', './_baseLodash.js', './_wrapperClone.js'], function (exports, _baseLodash, _wrapperClone) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseLodash2 = _interopRequireDefault(_baseLodash);

  var _wrapperClone2 = _interopRequireDefault(_wrapperClone);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a clone of the chain sequence planting `value` as the wrapped value.
   *
   * @name plant
   * @memberOf _
   * @since 3.2.0
   * @category Seq
   * @param {*} value The value to plant.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2]).map(square);
   * var other = wrapped.plant([3, 4]);
   *
   * other.value();
   * // => [9, 16]
   *
   * wrapped.value();
   * // => [1, 4]
   */
  function wrapperPlant(value) {
    var result,
        parent = this;

    while (parent instanceof _baseLodash2.default) {
      var clone = (0, _wrapperClone2.default)(parent);
      clone.__index__ = 0;
      clone.__values__ = undefined;
      if (result) {
        previous.__wrapped__ = clone;
      } else {
        result = clone;
      }
      var previous = clone;
      parent = parent.__wrapped__;
    }
    previous.__wrapped__ = value;
    return result;
  }

  exports.default = wrapperPlant;
});