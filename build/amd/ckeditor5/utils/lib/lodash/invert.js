define(['exports', './constant.js', './_createInverter.js', './identity.js'], function (exports, _constant, _createInverter, _identity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _constant2 = _interopRequireDefault(_constant);

  var _createInverter2 = _interopRequireDefault(_createInverter);

  var _identity2 = _interopRequireDefault(_identity);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an object composed of the inverted keys and values of `object`.
   * If `object` contains duplicate values, subsequent values overwrite
   * property assignments of previous values.
   *
   * @static
   * @memberOf _
   * @since 0.7.0
   * @category Object
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   */
  var invert = (0, _createInverter2.default)(function (result, value, key) {
    result[value] = key;
  }, (0, _constant2.default)(_identity2.default));

  exports.default = invert;
});