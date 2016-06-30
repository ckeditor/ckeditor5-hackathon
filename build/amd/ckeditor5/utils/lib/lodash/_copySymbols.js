define(['exports', './_copyObject.js', './_getSymbols.js'], function (exports, _copyObject, _getSymbols) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _copyObject2 = _interopRequireDefault(_copyObject);

  var _getSymbols2 = _interopRequireDefault(_getSymbols);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Copies own symbol properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return (0, _copyObject2.default)(source, (0, _getSymbols2.default)(source), object);
  }

  exports.default = copySymbols;
});