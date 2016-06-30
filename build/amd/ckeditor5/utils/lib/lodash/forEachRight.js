define(['exports', './_arrayEachRight.js', './_baseEachRight.js', './_baseIteratee.js', './isArray.js'], function (exports, _arrayEachRight, _baseEachRight, _baseIteratee, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEachRight2 = _interopRequireDefault(_arrayEachRight);

  var _baseEachRight2 = _interopRequireDefault(_baseEachRight);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _isArray2 = _interopRequireDefault(_isArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.forEach` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @alias eachRight
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEach
   * @example
   *
   * _.forEachRight([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `2` then `1`.
   */
  function forEachRight(collection, iteratee) {
    var func = (0, _isArray2.default)(collection) ? _arrayEachRight2.default : _baseEachRight2.default;
    return func(collection, (0, _baseIteratee2.default)(iteratee, 3));
  }

  exports.default = forEachRight;
});