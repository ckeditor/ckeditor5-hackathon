define(['exports', './_baseKeysIn.js', './_indexKeys.js', './_isIndex.js', './_isPrototype.js'], function (exports, _baseKeysIn, _indexKeys, _isIndex, _isPrototype) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseKeysIn2 = _interopRequireDefault(_baseKeysIn);

  var _indexKeys2 = _interopRequireDefault(_indexKeys);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _isPrototype2 = _interopRequireDefault(_isPrototype);

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

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    var index = -1,
        isProto = (0, _isPrototype2.default)(object),
        props = (0, _baseKeysIn2.default)(object),
        propsLength = props.length,
        indexes = (0, _indexKeys2.default)(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;

    while (++index < propsLength) {
      var key = props[index];
      if (!(skipIndexes && (key == 'length' || (0, _isIndex2.default)(key, length))) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  exports.default = keysIn;
});