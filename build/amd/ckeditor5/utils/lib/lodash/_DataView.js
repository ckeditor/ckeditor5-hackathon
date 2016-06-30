define(['exports', './_getNative.js', './_root.js'], function (exports, _getNative, _root) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getNative2 = _interopRequireDefault(_getNative);

  var _root2 = _interopRequireDefault(_root);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Built-in method references that are verified to be native. */
  var DataView = (0, _getNative2.default)(_root2.default, 'DataView');

  exports.default = DataView;
});