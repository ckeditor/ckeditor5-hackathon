define(['exports', './_baseForOwnRight.js', './_createBaseEach.js'], function (exports, _baseForOwnRight, _createBaseEach) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseForOwnRight2 = _interopRequireDefault(_baseForOwnRight);

  var _createBaseEach2 = _interopRequireDefault(_createBaseEach);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `_.forEachRight` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEachRight = (0, _createBaseEach2.default)(_baseForOwnRight2.default, true);

  exports.default = baseEachRight;
});