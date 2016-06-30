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

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @constructor
   * @param {*} value The value to wrap.
   */
  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
  }

  // Ensure `LazyWrapper` is an instance of `baseLodash`.
  LazyWrapper.prototype = (0, _baseCreate2.default)(_baseLodash2.default.prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;

  exports.default = LazyWrapper;
});