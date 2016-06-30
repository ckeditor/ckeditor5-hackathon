define(['exports', './_createWrapper.js', './_getHolder.js', './_replaceHolders.js', './rest.js'], function (exports, _createWrapper, _getHolder, _replaceHolders, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createWrapper2 = _interopRequireDefault(_createWrapper);

  var _getHolder2 = _interopRequireDefault(_getHolder);

  var _replaceHolders2 = _interopRequireDefault(_replaceHolders);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and `partials` prepended to the arguments it receives.
   *
   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for partially applied arguments.
   *
   * **Note:** Unlike native `Function#bind` this method doesn't set the "length"
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var greet = function(greeting, punctuation) {
   *   return greeting + ' ' + this.user + punctuation;
   * };
   *
   * var object = { 'user': 'fred' };
   *
   * var bound = _.bind(greet, object, 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * // Bound with placeholders.
   * var bound = _.bind(greet, object, _, '!');
   * bound('hi');
   * // => 'hi fred!'
   */
  var bind = (0, _rest2.default)(function (func, thisArg, partials) {
    var bitmask = BIND_FLAG;
    if (partials.length) {
      var holders = (0, _replaceHolders2.default)(partials, (0, _getHolder2.default)(bind));
      bitmask |= PARTIAL_FLAG;
    }
    return (0, _createWrapper2.default)(func, bitmask, thisArg, partials, holders);
  });

  // Assign default placeholders.
  bind.placeholder = {};

  exports.default = bind;
});