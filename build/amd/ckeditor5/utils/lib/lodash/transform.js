define(['exports', './_arrayEach.js', './_baseCreate.js', './_baseForOwn.js', './_baseIteratee.js', './_getPrototype.js', './isArray.js', './isFunction.js', './isObject.js', './isTypedArray.js'], function (exports, _arrayEach, _baseCreate, _baseForOwn, _baseIteratee, _getPrototype, _isArray, _isFunction, _isObject, _isTypedArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayEach2 = _interopRequireDefault(_arrayEach);

  var _baseCreate2 = _interopRequireDefault(_baseCreate);

  var _baseForOwn2 = _interopRequireDefault(_baseForOwn);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _getPrototype2 = _interopRequireDefault(_getPrototype);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  var _isObject2 = _interopRequireDefault(_isObject);

  var _isTypedArray2 = _interopRequireDefault(_isTypedArray);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * An alternative to `_.reduce`; this method transforms `object` to a new
   * `accumulator` object which is the result of running each of its own
   * enumerable string keyed properties thru `iteratee`, with each invocation
   * potentially mutating the `accumulator` object. The iteratee is invoked
   * with four arguments: (accumulator, value, key, object). Iteratee functions
   * may exit iteration early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @since 1.3.0
   * @category Object
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The custom accumulator value.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * _.transform([2, 3, 4], function(result, n) {
   *   result.push(n *= n);
   *   return n % 2 == 0;
   * }, []);
   * // => [4, 9]
   *
   * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] }
   */
  function transform(object, iteratee, accumulator) {
    var isArr = (0, _isArray2.default)(object) || (0, _isTypedArray2.default)(object);
    iteratee = (0, _baseIteratee2.default)(iteratee, 4);

    if (accumulator == null) {
      if (isArr || (0, _isObject2.default)(object)) {
        var Ctor = object.constructor;
        if (isArr) {
          accumulator = (0, _isArray2.default)(object) ? new Ctor() : [];
        } else {
          accumulator = (0, _isFunction2.default)(Ctor) ? (0, _baseCreate2.default)((0, _getPrototype2.default)(object)) : {};
        }
      } else {
        accumulator = {};
      }
    }
    (isArr ? _arrayEach2.default : _baseForOwn2.default)(object, function (value, index, object) {
      return iteratee(accumulator, value, index, object);
    });
    return accumulator;
  }

  exports.default = transform;
});