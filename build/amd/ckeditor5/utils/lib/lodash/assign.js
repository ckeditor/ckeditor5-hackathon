define(['exports', './_assignValue.js', './_copyObject.js', './_createAssigner.js', './isArrayLike.js', './_isPrototype.js', './keys.js'], function (exports, _assignValue, _copyObject, _createAssigner, _isArrayLike, _isPrototype, _keys) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assignValue2 = _interopRequireDefault(_assignValue);

  var _copyObject2 = _interopRequireDefault(_copyObject);

  var _createAssigner2 = _interopRequireDefault(_createAssigner);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isPrototype2 = _interopRequireDefault(_isPrototype);

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
  var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

  /**
   * Assigns own enumerable string keyed properties of source objects to the
   * destination object. Source objects are applied from left to right.
   * Subsequent sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object` and is loosely based on
   * [`Object.assign`](https://mdn.io/Object/assign).
   *
   * @static
   * @memberOf _
   * @since 0.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assignIn
   * @example
   *
   * function Foo() {
   *   this.c = 3;
   * }
   *
   * function Bar() {
   *   this.e = 5;
   * }
   *
   * Foo.prototype.d = 4;
   * Bar.prototype.f = 6;
   *
   * _.assign({ 'a': 1 }, new Foo, new Bar);
   * // => { 'a': 1, 'c': 3, 'e': 5 }
   */
  var assign = (0, _createAssigner2.default)(function (object, source) {
    if (nonEnumShadows || (0, _isPrototype2.default)(source) || (0, _isArrayLike2.default)(source)) {
      (0, _copyObject2.default)(source, (0, _keys2.default)(source), object);
      return;
    }
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        (0, _assignValue2.default)(object, key, source[key]);
      }
    }
  });

  exports.default = assign;
});