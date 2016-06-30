define(['module', 'exports', './constant.js', './_root.js'], function (module, exports, _constant, _root) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _constant2 = _interopRequireDefault(_constant);

  var _root2 = _interopRequireDefault(_root);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType ? exports : undefined;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType ? module : undefined;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : undefined;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root2.default.Buffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = !Buffer ? (0, _constant2.default)(false) : function (value) {
    return value instanceof Buffer;
  };

  exports.default = isBuffer;
});