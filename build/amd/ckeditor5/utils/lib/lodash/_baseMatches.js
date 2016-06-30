define(['exports', './_baseIsMatch.js', './_getMatchData.js', './_matchesStrictComparable.js'], function (exports, _baseIsMatch, _getMatchData, _matchesStrictComparable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIsMatch2 = _interopRequireDefault(_baseIsMatch);

  var _getMatchData2 = _interopRequireDefault(_getMatchData);

  var _matchesStrictComparable2 = _interopRequireDefault(_matchesStrictComparable);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = (0, _getMatchData2.default)(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return (0, _matchesStrictComparable2.default)(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
      return object === source || (0, _baseIsMatch2.default)(object, source, matchData);
    };
  }

  exports.default = baseMatches;
});