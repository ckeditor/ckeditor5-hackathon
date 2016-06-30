define(['exports', './toNumber.js'], function (exports, _toNumber) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toNumber2 = _interopRequireDefault(_toNumber);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that performs a relational operation on two values.
   *
   * @private
   * @param {Function} operator The function to perform the operation.
   * @returns {Function} Returns the new relational operation function.
   */
  function createRelationalOperation(operator) {
    return function (value, other) {
      if (!(typeof value == 'string' && typeof other == 'string')) {
        value = (0, _toNumber2.default)(value);
        other = (0, _toNumber2.default)(other);
      }
      return operator(value, other);
    };
  }

  exports.default = createRelationalOperation;
});