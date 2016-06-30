define(['module', 'exports', './_checkGlobal.js'], function (module, exports, _checkGlobal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _checkGlobal2 = _interopRequireDefault(_checkGlobal);

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

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = (0, _checkGlobal2.default)(freeExports && freeModule && typeof global == 'object' && global);

  /** Detect free variable `self`. */
  var freeSelf = (0, _checkGlobal2.default)(objectTypes[typeof self] && self);

  /** Detect free variable `window`. */
  var freeWindow = (0, _checkGlobal2.default)(objectTypes[typeof window] && window);

  /** Detect `this` as the global object. */
  var thisGlobal = (0, _checkGlobal2.default)(objectTypes[typeof undefined] && undefined);

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

  exports.default = root;
});