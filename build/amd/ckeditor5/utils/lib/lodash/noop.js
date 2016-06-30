define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * A no-operation function that returns `undefined` regardless of the
   * arguments it receives.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.noop(object) === undefined;
   * // => true
   */
  function noop() {
    // No operation performed.
  }

  exports.default = noop;
});