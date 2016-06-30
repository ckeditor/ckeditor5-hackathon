define(['exports', './_baseCreate.js', './_baseLodash.js'], function (exports, _baseCreate, _baseLodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseCreate2 = _interopRequireDefault(_baseCreate);

  var _baseLodash2 = _interopRequireDefault(_baseLodash);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */
  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
  }

  LodashWrapper.prototype = (0, _baseCreate2.default)(_baseLodash2.default.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  exports.default = LodashWrapper;
});