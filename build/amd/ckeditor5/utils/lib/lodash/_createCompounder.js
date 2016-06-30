define(['exports', './_arrayReduce.js', './deburr.js', './words.js'], function (exports, _arrayReduce, _deburr, _words) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

  var _deburr2 = _interopRequireDefault(_deburr);

  var _words2 = _interopRequireDefault(_words);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]";

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Creates a function like `_.camelCase`.
   *
   * @private
   * @param {Function} callback The function to combine each word.
   * @returns {Function} Returns the new compounder function.
   */
  function createCompounder(callback) {
    return function (string) {
      return (0, _arrayReduce2.default)((0, _words2.default)((0, _deburr2.default)(string).replace(reApos, '')), callback, '');
    };
  }

  exports.default = createCompounder;
});