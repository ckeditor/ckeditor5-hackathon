define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Creates a spy function (ala Sinon.js) that can be used to inspect call to it.
   *
   * The following are the present features:
   *
   * * spy.called: property set to `true` if the function has been called at least once.
   *
   * @memberOf utils
   * @returns {Function} The spy function.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = spy;
  function spy() {
    return function spy() {
      spy.called = true;
    };
  }
});