define(['exports', './_baseEach.js'], function (exports, _baseEach) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseEach2 = _interopRequireDefault(_baseEach);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.every` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true;
    (0, _baseEach2.default)(collection, function (value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  exports.default = baseEvery;
});