define(['exports', './_arrayMap.js', './_baseFlatten.js', './_basePick.js', './rest.js', './_toKey.js'], function (exports, _arrayMap, _baseFlatten, _basePick, _rest, _toKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _basePick2 = _interopRequireDefault(_basePick);

  var _rest2 = _interopRequireDefault(_rest);

  var _toKey2 = _interopRequireDefault(_toKey);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [props] The property identifiers to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = (0, _rest2.default)(function (object, props) {
    return object == null ? {} : (0, _basePick2.default)(object, (0, _arrayMap2.default)((0, _baseFlatten2.default)(props, 1), _toKey2.default));
  });

  exports.default = pick;
});