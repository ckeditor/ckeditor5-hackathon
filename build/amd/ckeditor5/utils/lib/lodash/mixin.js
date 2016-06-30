define(['exports', './_arrayEach.js', './_arrayPush.js', './_baseFunctions.js', './_copyArray.js', './isFunction.js', './isObject.js', './keys.js'], function (exports, _arrayEach, _arrayPush, _baseFunctions, _copyArray, _isFunction, _isObject, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _arrayPush2 = _interopRequireDefault(_arrayPush);

  var _baseFunctions2 = _interopRequireDefault(_baseFunctions);

  var _copyArray2 = _interopRequireDefault(_copyArray);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Adds all own enumerable string keyed function properties of a source
   * object to the destination object. If `object` is a function, then methods
   * are added to its prototype as well.
   *
   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
   * avoid conflicts caused by modifying the original.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {Function|Object} [object=lodash] The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
   * @returns {Function|Object} Returns `object`.
   * @example
   *
   * function vowels(string) {
   *   return _.filter(string, function(v) {
   *     return /[aeiou]/i.test(v);
   *   });
   * }
   *
   * _.mixin({ 'vowels': vowels });
   * _.vowels('fred');
   * // => ['e']
   *
   * _('fred').vowels().value();
   * // => ['e']
   *
   * _.mixin({ 'vowels': vowels }, { 'chain': false });
   * _('fred').vowels();
   * // => ['e']
   */
  function mixin(object, source, options) {
    var props = (0, _keys2.default)(source),
        methodNames = (0, _baseFunctions2.default)(source, props);

    var chain = !((0, _isObject2.default)(options) && 'chain' in options) || !!options.chain,
        isFunc = (0, _isFunction2.default)(object);

    (0, _arrayEach2.default)(methodNames, function (methodName) {
      var func = source[methodName];
      object[methodName] = func;
      if (isFunc) {
        object.prototype[methodName] = function () {
          var chainAll = this.__chain__;
          if (chain || chainAll) {
            var result = object(this.__wrapped__),
                actions = result.__actions__ = (0, _copyArray2.default)(this.__actions__);

            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
            result.__chain__ = chainAll;
            return result;
          }
          return func.apply(object, (0, _arrayPush2.default)([this.value()], arguments));
        };
      }
    });

    return object;
  }

  exports.default = mixin;
});