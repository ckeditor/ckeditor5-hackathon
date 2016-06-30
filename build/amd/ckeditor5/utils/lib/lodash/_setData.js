define(['exports', './_baseSetData.js', './now.js'], function (exports, _baseSetData, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseSetData2 = _interopRequireDefault(_baseSetData);

  var _now2 = _interopRequireDefault(_now);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity
   * function to avoid garbage collection pauses in V8. See
   * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = function () {
    var count = 0,
        lastCalled = 0;

    return function (key, value) {
      var stamp = (0, _now2.default)(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return key;
        }
      } else {
        count = 0;
      }
      return (0, _baseSetData2.default)(key, value);
    };
  }();

  exports.default = setData;
});