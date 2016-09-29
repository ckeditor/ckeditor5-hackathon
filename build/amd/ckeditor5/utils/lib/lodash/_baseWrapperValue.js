define(['exports', './_LazyWrapper.js', './_arrayPush.js', './_arrayReduce.js'], function (exports, _LazyWrapper, _arrayPush, _arrayReduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `wrapperValue` which returns the result of
   * performing a sequence of actions on the unwrapped `value`, where each
   * successive action is supplied the return value of the previous.
   *
   * @private
   * @param {*} value The unwrapped value.
   * @param {Array} actions Actions to perform to resolve the unwrapped value.
   * @returns {*} Returns the resolved value.
   */
  function baseWrapperValue(value, actions) {
    var result = value;
    if (result instanceof _LazyWrapper2.default) {
      result = result.value();
    }
    return (0, _arrayReduce2.default)(actions, function (result, action) {
      return action.func.apply(action.thisArg, (0, _arrayPush2.default)([result], action.args));
    }, result);
  }

  exports.default = baseWrapperValue;
});