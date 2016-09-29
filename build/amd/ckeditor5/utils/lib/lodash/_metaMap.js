define(['exports', './_WeakMap.js'], function (exports, _WeakMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _WeakMap2 = _interopRequireDefault(_WeakMap);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to store function metadata. */
  var metaMap = _WeakMap2.default && new _WeakMap2.default();

  exports.default = metaMap;
});