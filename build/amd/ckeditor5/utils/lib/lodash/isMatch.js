define(['exports', './_baseIsMatch.js', './_getMatchData.js'], function (exports, _baseIsMatch, _getMatchData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseIsMatch2 = _interopRequireDefault(_baseIsMatch);

  var _getMatchData2 = _interopRequireDefault(_getMatchData);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Performs a partial deep comparison between `object` and `source` to
   * determine if `object` contains equivalent property values. This method is
   * equivalent to a `_.matches` function when `source` is partially applied.
   *
   * **Note:** This method supports comparing the same values as `_.isEqual`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.isMatch(object, { 'age': 40 });
   * // => true
   *
   * _.isMatch(object, { 'age': 36 });
   * // => false
   */
  function isMatch(object, source) {
    return object === source || (0, _baseIsMatch2.default)(object, source, (0, _getMatchData2.default)(source));
  }

  exports.default = isMatch;
});