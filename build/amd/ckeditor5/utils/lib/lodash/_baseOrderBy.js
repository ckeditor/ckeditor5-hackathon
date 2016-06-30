define(['exports', './_arrayMap.js', './_baseIteratee.js', './_baseMap.js', './_baseSortBy.js', './_baseUnary.js', './_compareMultiple.js', './identity.js'], function (exports, _arrayMap, _baseIteratee, _baseMap, _baseSortBy, _baseUnary, _compareMultiple, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseMap2 = _interopRequireDefault(_baseMap);

  var _baseSortBy2 = _interopRequireDefault(_baseSortBy);

  var _baseUnary2 = _interopRequireDefault(_baseUnary);

  var _compareMultiple2 = _interopRequireDefault(_compareMultiple);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = (0, _arrayMap2.default)(iteratees.length ? iteratees : [_identity2.default], (0, _baseUnary2.default)(_baseIteratee2.default));

    var result = (0, _baseMap2.default)(collection, function (value, key, collection) {
      var criteria = (0, _arrayMap2.default)(iteratees, function (iteratee) {
        return iteratee(value);
      });
      return { 'criteria': criteria, 'index': ++index, 'value': value };
    });

    return (0, _baseSortBy2.default)(result, function (object, other) {
      return (0, _compareMultiple2.default)(object, other, orders);
    });
  }

  exports.default = baseOrderBy;
});