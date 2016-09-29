define(['exports', './_Set.js', './noop.js', './_setToArray.js'], function (exports, _Set, _noop, _setToArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Set2 = _interopRequireDefault(_Set);

  var _noop2 = _interopRequireDefault(_noop);

  var _setToArray2 = _interopRequireDefault(_setToArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Creates a set of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet = !(_Set2.default && 1 / (0, _setToArray2.default)(new _Set2.default([, -0]))[1] == INFINITY) ? _noop2.default : function (values) {
    return new _Set2.default(values);
  };

  exports.default = createSet;
});