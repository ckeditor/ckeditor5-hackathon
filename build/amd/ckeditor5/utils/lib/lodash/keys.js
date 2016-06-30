define(['exports', './_baseHas.js', './_baseKeys.js', './_indexKeys.js', './isArrayLike.js', './_isIndex.js', './_isPrototype.js'], function (exports, _baseHas, _baseKeys, _indexKeys, _isArrayLike, _isIndex, _isPrototype) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseHas2 = _interopRequireDefault(_baseHas);

  var _baseKeys2 = _interopRequireDefault(_baseKeys);

  var _indexKeys2 = _interopRequireDefault(_indexKeys);

  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

  var _isIndex2 = _interopRequireDefault(_isIndex);

  var _isPrototype2 = _interopRequireDefault(_isPrototype);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
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
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    var isProto = (0, _isPrototype2.default)(object);
    if (!(isProto || (0, _isArrayLike2.default)(object))) {
      return (0, _baseKeys2.default)(object);
    }
    var indexes = (0, _indexKeys2.default)(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;

    for (var key in object) {
      if ((0, _baseHas2.default)(object, key) && !(skipIndexes && (key == 'length' || (0, _isIndex2.default)(key, length))) && !(isProto && key == 'constructor')) {
        result.push(key);
      }
    }
    return result;
  }

  exports.default = keys;
});