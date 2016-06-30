define(['exports', './_baseToNumber.js', './_baseToString.js'], function (exports, _baseToNumber, _baseToString) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseToNumber2 = _interopRequireDefault(_baseToNumber);

  var _baseToString2 = _interopRequireDefault(_baseToString);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function that performs a mathematical operation on two values.
   *
   * @private
   * @param {Function} operator The function to perform the operation.
   * @returns {Function} Returns the new mathematical operation function.
   */
  function createMathOperation(operator) {
    return function (value, other) {
      var result;
      if (value === undefined && other === undefined) {
        return 0;
      }
      if (value !== undefined) {
        result = value;
      }
      if (other !== undefined) {
        if (result === undefined) {
          return other;
        }
        if (typeof value == 'string' || typeof other == 'string') {
          value = (0, _baseToString2.default)(value);
          other = (0, _baseToString2.default)(other);
        } else {
          value = (0, _baseToNumber2.default)(value);
          other = (0, _baseToNumber2.default)(other);
        }
        result = operator(value, other);
      }
      return result;
    };
  }

  exports.default = createMathOperation;
});