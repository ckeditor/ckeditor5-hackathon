define(['exports', './_baseUniq.js'], function (exports, _baseUniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseUniq2 = _interopRequireDefault(_baseUniq);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.uniq` except that it accepts `comparator` which
   * is invoked to compare elements of `array`. The comparator is invoked with
   * two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },  { 'x': 1, 'y': 2 }];
   *
   * _.uniqWith(objects, _.isEqual);
   * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
   */
  function uniqWith(array, comparator) {
    return array && array.length ? (0, _baseUniq2.default)(array, undefined, comparator) : [];
  }

  exports.default = uniqWith;
});