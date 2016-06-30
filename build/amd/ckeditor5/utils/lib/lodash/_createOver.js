define(['exports', './_apply.js', './_arrayMap.js', './_baseFlatten.js', './_baseIteratee.js', './_baseUnary.js', './isArray.js', './_isFlattenableIteratee.js', './rest.js'], function (exports, _apply, _arrayMap, _baseFlatten, _baseIteratee, _baseUnary, _isArray, _isFlattenableIteratee, _rest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _apply2 = _interopRequireDefault(_apply);

  var _arrayMap2 = _interopRequireDefault(_arrayMap);

  var _baseFlatten2 = _interopRequireDefault(_baseFlatten);

  var _baseIteratee2 = _interopRequireDefault(_baseIteratee);

  var _baseUnary2 = _interopRequireDefault(_baseUnary);

  var _isArray2 = _interopRequireDefault(_isArray);

  var _isFlattenableIteratee2 = _interopRequireDefault(_isFlattenableIteratee);

  var _rest2 = _interopRequireDefault(_rest);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates a function like `_.over`.
   *
   * @private
   * @param {Function} arrayFunc The function to iterate over iteratees.
   * @returns {Function} Returns the new over function.
   */
  function createOver(arrayFunc) {
    return (0, _rest2.default)(function (iteratees) {
      iteratees = iteratees.length == 1 && (0, _isArray2.default)(iteratees[0]) ? (0, _arrayMap2.default)(iteratees[0], (0, _baseUnary2.default)(_baseIteratee2.default)) : (0, _arrayMap2.default)((0, _baseFlatten2.default)(iteratees, 1, _isFlattenableIteratee2.default), (0, _baseUnary2.default)(_baseIteratee2.default));

      return (0, _rest2.default)(function (args) {
        var thisArg = this;
        return arrayFunc(iteratees, function (iteratee) {
          return (0, _apply2.default)(iteratee, thisArg, args);
        });
      });
    });
  }

  exports.default = createOver;
});