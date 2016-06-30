define(['exports', './_isStrictComparable.js', './toPairs.js'], function (exports, _isStrictComparable, _toPairs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isStrictComparable2 = _interopRequireDefault(_isStrictComparable);

  var _toPairs2 = _interopRequireDefault(_toPairs);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = (0, _toPairs2.default)(object),
        length = result.length;

    while (length--) {
      result[length][2] = (0, _isStrictComparable2.default)(result[length][1]);
    }
    return result;
  }

  exports.default = getMatchData;
});