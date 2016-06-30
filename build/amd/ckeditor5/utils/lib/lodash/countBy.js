define(['exports', './_createAggregator.js'], function (exports, _createAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createAggregator2 = _interopRequireDefault(_createAggregator);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` thru `iteratee`. The corresponding value of
   * each key is the number of times the key was returned by `iteratee`. The
   * iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array|Function|Object|string} [iteratee=_.identity]
   *  The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([6.1, 4.2, 6.3], Math.floor);
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  var countBy = (0, _createAggregator2.default)(function (result, value, key) {
    hasOwnProperty.call(result, key) ? ++result[key] : result[key] = 1;
  });

  exports.default = countBy;
});