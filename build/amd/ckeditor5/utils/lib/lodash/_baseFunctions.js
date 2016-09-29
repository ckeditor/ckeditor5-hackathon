define(['exports', './_arrayFilter.js', './isFunction.js'], function (exports, _arrayFilter, _isFunction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayFilter2 = _interopRequireDefault(_arrayFilter);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.functions` which creates an array of
   * `object` function property names filtered from `props`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Array} props The property names to filter.
   * @returns {Array} Returns the function names.
   */
  function baseFunctions(object, props) {
    return (0, _arrayFilter2.default)(props, function (key) {
      return (0, _isFunction2.default)(object[key]);
    });
  }

  exports.default = baseFunctions;
});