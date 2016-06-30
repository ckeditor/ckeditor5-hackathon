define(['exports', './_baseInverter.js'], function (exports, _baseInverter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseInverter2 = _interopRequireDefault(_baseInverter);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function like `_.invertBy`.
   *
   * @private
   * @param {Function} setter The function to set accumulator values.
   * @param {Function} toIteratee The function to resolve iteratees.
   * @returns {Function} Returns the new inverter function.
   */
  function createInverter(setter, toIteratee) {
    return function (object, iteratee) {
      return (0, _baseInverter2.default)(object, setter, toIteratee(iteratee), {});
    };
  }

  exports.default = createInverter;
});