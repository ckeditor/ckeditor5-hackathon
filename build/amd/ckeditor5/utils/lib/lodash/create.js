define(['exports', './_baseAssign.js', './_baseCreate.js'], function (exports, _baseAssign, _baseCreate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseAssign2 = _interopRequireDefault(_baseAssign);

  var _baseCreate2 = _interopRequireDefault(_baseCreate);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates an object that inherits from the `prototype` object. If a
   * `properties` object is given, its own enumerable string keyed properties
   * are assigned to the created object.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Object
   * @param {Object} prototype The object to inherit from.
   * @param {Object} [properties] The properties to assign to the object.
   * @returns {Object} Returns the new object.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * function Circle() {
   *   Shape.call(this);
   * }
   *
   * Circle.prototype = _.create(Shape.prototype, {
   *   'constructor': Circle
   * });
   *
   * var circle = new Circle;
   * circle instanceof Circle;
   * // => true
   *
   * circle instanceof Shape;
   * // => true
   */
  function create(prototype, properties) {
    var result = (0, _baseCreate2.default)(prototype);
    return properties ? (0, _baseAssign2.default)(result, properties) : result;
  }

  exports.default = create;
});