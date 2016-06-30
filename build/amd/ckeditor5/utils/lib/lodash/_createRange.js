define(['exports', './_baseRange.js', './_isIterateeCall.js', './toNumber.js'], function (exports, _baseRange, _isIterateeCall, _toNumber) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseRange2 = _interopRequireDefault(_baseRange);

  var _isIterateeCall2 = _interopRequireDefault(_isIterateeCall);

  var _toNumber2 = _interopRequireDefault(_toNumber);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a `_.range` or `_.rangeRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new range function.
   */
  function createRange(fromRight) {
    return function (start, end, step) {
      if (step && typeof step != 'number' && (0, _isIterateeCall2.default)(start, end, step)) {
        end = step = undefined;
      }
      // Ensure the sign of `-0` is preserved.
      start = (0, _toNumber2.default)(start);
      start = start === start ? start : 0;
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = (0, _toNumber2.default)(end) || 0;
      }
      step = step === undefined ? start < end ? 1 : -1 : (0, _toNumber2.default)(step) || 0;
      return (0, _baseRange2.default)(start, end, step, fromRight);
    };
  }

  exports.default = createRange;
});