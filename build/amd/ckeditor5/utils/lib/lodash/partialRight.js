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
  var PARTIAL_RIGHT_FLAG = 64;

  /**
   * This method is like `_.partial` except that partially applied arguments
   * are appended to the arguments it receives.
   *
   * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method doesn't set the "length" property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
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
   * var greetFred = _.partialRight(greet, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   *
   * // Partially applied with placeholders.
   * var sayHelloTo = _.partialRight(greet, 'hello', _);
   * sayHelloTo('fred');
   * // => 'hello fred'
   */
  var partialRight = (0, _rest2.default)(function (func, partials) {
    var holders = (0, _replaceHolders2.default)(partials, (0, _getHolder2.default)(partialRight));
    return (0, _createWrapper2.default)(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
  });

  // Assign default placeholders.
  partialRight.placeholder = {};

  exports.default = partialRight;
});