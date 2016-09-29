define(['exports', './_arrayEach.js', './_baseFlatten.js', './bind.js', './rest.js', './_toKey.js'], function (exports, _arrayEach, _baseFlatten, _bind, _rest, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _bind2 = _interopRequireDefault(_bind);

  var _rest2 = _interopRequireDefault(_rest);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Binds methods of an object to the object itself, overwriting the existing
   * method.
   *
   * **Note:** This method doesn't set the "length" property of bound functions.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {...(string|string[])} methodNames The object method names to bind.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var view = {
   *   'label': 'docs',
   *   'onClick': function() {
   *     console.log('clicked ' + this.label);
   *   }
   * };
   *
   * _.bindAll(view, 'onClick');
   * jQuery(element).on('click', view.onClick);
   * // => Logs 'clicked docs' when clicked.
   */
  var bindAll = (0, _rest2.default)(function (object, methodNames) {
    (0, _arrayEach2.default)((0, _baseFlatten2.default)(methodNames, 1), function (key) {
      key = (0, _toKey2.default)(key);
      object[key] = (0, _bind2.default)(object[key], object);
    });
    return object;
  });

  exports.default = bindAll;
});