define(['exports', './_arrayMap.js', './_baseDifference.js', './_baseFlatten.js', './_basePick.js', './_getAllKeysIn.js', './rest.js', './_toKey.js'], function (exports, _arrayMap, _baseDifference, _baseFlatten, _basePick, _getAllKeysIn, _rest, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseDifference2 = _interopRequireDefault(_baseDifference);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _basePick2 = _interopRequireDefault(_basePick);

  var _getAllKeysIn2 = _interopRequireDefault(_getAllKeysIn);

  var _rest2 = _interopRequireDefault(_rest);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable string keyed properties of `object` that are
   * not omitted.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [props] The property identifiers to omit.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.omit(object, ['a', 'c']);
   * // => { 'b': '2' }
   */
  var omit = (0, _rest2.default)(function (object, props) {
    if (object == null) {
      return {};
    }
    props = (0, _arrayMap2.default)((0, _baseFlatten2.default)(props, 1), _toKey2.default);
    return (0, _basePick2.default)(object, (0, _baseDifference2.default)((0, _getAllKeysIn2.default)(object), props));
  });

  exports.default = omit;
});