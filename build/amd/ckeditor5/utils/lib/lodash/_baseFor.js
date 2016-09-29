define(['exports', './_createBaseFor.js'], function (exports, _createBaseFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createBaseFor2 = _interopRequireDefault(_createBaseFor);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = (0, _createBaseFor2.default)();

  exports.default = baseFor;
});