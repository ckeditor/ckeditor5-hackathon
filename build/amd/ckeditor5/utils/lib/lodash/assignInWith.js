define(['exports', './_copyObject.js', './_createAssigner.js', './keysIn.js'], function (exports, _copyObject, _createAssigner, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _copyObject2 = _interopRequireDefault(_copyObject);

  var _createAssigner2 = _interopRequireDefault(_createAssigner);

  var _keysIn2 = _interopRequireDefault(_keysIn);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * This method is like `_.assignIn` except that it accepts `customizer`
   * which is invoked to produce the assigned values. If `customizer` returns
   * `undefined`, assignment is handled by the method instead. The `customizer`
   * is invoked with five arguments: (objValue, srcValue, key, object, source).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extendWith
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @see _.assignWith
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   return _.isUndefined(objValue) ? srcValue : objValue;
   * }
   *
   * var defaults = _.partialRight(_.assignInWith, customizer);
   *
   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var assignInWith = (0, _createAssigner2.default)(function (object, source, srcIndex, customizer) {
    (0, _copyObject2.default)(source, (0, _keysIn2.default)(source), object, customizer);
  });

  exports.default = assignInWith;
});