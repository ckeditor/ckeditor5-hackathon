define(['exports', './_baseMerge.js', './_createAssigner.js'], function (exports, _baseMerge, _createAssigner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseMerge2 = _interopRequireDefault(_baseMerge);

  var _createAssigner2 = _interopRequireDefault(_createAssigner);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with seven arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = {
   *   'fruits': ['apple'],
   *   'vegetables': ['beet']
   * };
   *
   * var other = {
   *   'fruits': ['banana'],
   *   'vegetables': ['carrot']
   * };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
   */
  var mergeWith = (0, _createAssigner2.default)(function (object, source, srcIndex, customizer) {
    (0, _baseMerge2.default)(object, source, srcIndex, customizer);
  });

  exports.default = mergeWith;
});