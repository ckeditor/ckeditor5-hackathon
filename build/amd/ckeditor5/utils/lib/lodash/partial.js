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
  var PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes `func` with `partials` prepended to the
   * arguments it receives. This method is like `_.bind` except it does **not**
   * alter the `this` binding.
   *
   * The `_.partial.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method doesn't set the "length" property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @since 0.2.0
   * @category Function
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) {
   *   return greeting + ' ' + name;
   * };
   *
   * var sayHelloTo = _.partial(greet, 'hello');
   * sayHelloTo('fred');
   * // => 'hello fred'
   *
   * // Partially applied with placeholders.
   * var greetFred = _.partial(greet, _, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   */
  var partial = (0, _rest2.default)(function (func, partials) {
    var holders = (0, _replaceHolders2.default)(partials, (0, _getHolder2.default)(partial));
    return (0, _createWrapper2.default)(func, PARTIAL_FLAG, undefined, partials, holders);
  });

  // Assign default placeholders.
  partial.placeholder = {};

  exports.default = partial;
});