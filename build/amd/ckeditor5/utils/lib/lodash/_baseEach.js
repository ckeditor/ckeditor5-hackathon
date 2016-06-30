define(['exports', './_baseForOwn.js', './_createBaseEach.js'], function (exports, _baseForOwn, _createBaseEach) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);

  var _createBaseEach2 = _interopRequireDefault(_createBaseEach);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = (0, _createBaseEach2.default)(_baseForOwn2.default);

  exports.default = baseEach;
});