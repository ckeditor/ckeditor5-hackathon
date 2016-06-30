define(['exports', './_LazyWrapper.js', './_getData.js', './_getFuncName.js', './wrapperLodash.js'], function (exports, _LazyWrapper, _getData, _getFuncName, _wrapperLodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LazyWrapper2 = _interopRequireDefault(_LazyWrapper);

  var _getData2 = _interopRequireDefault(_getData);

  var _getFuncName2 = _interopRequireDefault(_getFuncName);

  var _wrapperLodash2 = _interopRequireDefault(_wrapperLodash);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Checks if `func` has a lazy counterpart.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
   *  else `false`.
   */
  function isLaziable(func) {
    var funcName = (0, _getFuncName2.default)(func),
        other = _wrapperLodash2.default[funcName];

    if (typeof other != 'function' || !(funcName in _LazyWrapper2.default.prototype)) {
      return false;
    }
    if (func === other) {
      return true;
    }
    var data = (0, _getData2.default)(other);
    return !!data && func === data[0];
  }

  exports.default = isLaziable;
});