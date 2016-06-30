define(['exports', './_apply.js', './_arrayMap.js', './_baseIteratee.js', './rest.js'], function (exports, _apply, _arrayMap, _baseIteratee, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that iterates over `pairs` and invokes the corresponding
   * function of the first predicate to return truthy. The predicate-function
   * pairs are invoked with the `this` binding and arguments of the created
   * function.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {Array} pairs The predicate-function pairs.
   * @returns {Function} Returns the new composite function.
   * @example
   *
   * var func = _.cond([
   *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
   *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
   *   [_.constant(true),                _.constant('no match')]
   * ]);
   *
   * func({ 'a': 1, 'b': 2 });
   * // => 'matches A'
   *
   * func({ 'a': 0, 'b': 1 });
   * // => 'matches B'
   *
   * func({ 'a': '1', 'b': '2' });
   * // => 'no match'
   */
  function cond(pairs) {
    var length = pairs ? pairs.length : 0,
        toIteratee = _baseIteratee2.default;

    pairs = !length ? [] : (0, _arrayMap2.default)(pairs, function (pair) {
      if (typeof pair[1] != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return [toIteratee(pair[0]), pair[1]];
    });

    return (0, _rest2.default)(function (args) {
      var index = -1;
      while (++index < length) {
        var pair = pairs[index];
        if ((0, _apply2.default)(pair[0], this, args)) {
          return (0, _apply2.default)(pair[1], this, args);
        }
      }
    });
  }

  exports.default = cond;
});