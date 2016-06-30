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
      BIND_KEY_FLAG = 2,
      PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes the method at `object[key]` with `partials`
   * prepended to the arguments it receives.
   *
   * This method differs from `_.bind` by allowing bound functions to reference
   * methods that may be redefined or don't yet exist. See
   * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
   * for more details.
   *
   * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * @static
   * @memberOf _
   * @since 0.10.0
   * @category Function
   * @param {Object} object The object to invoke the method on.
   * @param {string} key The key of the method.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var object = {
   *   'user': 'fred',
   *   'greet': function(greeting, punctuation) {
   *     return greeting + ' ' + this.user + punctuation;
   *   }
   * };
   *
   * var bound = _.bindKey(object, 'greet', 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * object.greet = function(greeting, punctuation) {
   *   return greeting + 'ya ' + this.user + punctuation;
   * };
   *
   * bound('!');
   * // => 'hiya fred!'
   *
   * // Bound with placeholders.
   * var bound = _.bindKey(object, 'greet', _, '!');
   * bound('hi');
   * // => 'hiya fred!'
   */
  var bindKey = (0, _rest2.default)(function (object, key, partials) {
    var bitmask = BIND_FLAG | BIND_KEY_FLAG;
    if (partials.length) {
      var holders = (0, _replaceHolders2.default)(partials, (0, _getHolder2.default)(bindKey));
      bitmask |= PARTIAL_FLAG;
    }
    return (0, _createWrapper2.default)(key, bitmask, object, partials, holders);
  });

  // Assign default placeholders.
  bindKey.placeholder = {};

  exports.default = bindKey;
});