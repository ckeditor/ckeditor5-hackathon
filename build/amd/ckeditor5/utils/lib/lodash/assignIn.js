define(['exports', './_assignValue.js', './_copyObject.js', './_createAssigner.js', './isArrayLike.js', './_isPrototype.js', './keysIn.js'], function (exports, _assignValue, _copyObject, _createAssigner, _isArrayLike, _isPrototype, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assignValue2 = _interopRequireDefault(_assignValue);

  var _copyObject2 = _interopRequireDefault(_copyObject);

  var _createAssigner2 = _interopRequireDefault(_createAssigner);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isPrototype2 = _interopRequireDefault(_isPrototype);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
  var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

  /**
   * This method is like `_.assign` except that it iterates over own and
   * inherited source properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assign
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * function Bar() {
   *   this.d = 4;
   * }
   *
   * Foo.prototype.c = 3;
   * Bar.prototype.e = 5;
   *
   * _.assignIn({ 'a': 1 }, new Foo, new Bar);
   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
   */
  var assignIn = (0, _createAssigner2.default)(function (object, source) {
    if (nonEnumShadows || (0, _isPrototype2.default)(source) || (0, _isArrayLike2.default)(source)) {
      (0, _copyObject2.default)(source, (0, _keysIn2.default)(source), object);
      return;
    }
    for (var key in source) {
      (0, _assignValue2.default)(object, key, source[key]);
    }
  });

  exports.default = assignIn;
});