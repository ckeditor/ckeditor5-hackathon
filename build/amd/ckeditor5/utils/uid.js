define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Returns a unique id. This id is a number (starting from 1) which will never get repeated on successive calls
   * to this method.
   *
   * @function
   * @memberOf utils
   * @returns {Number} A number representing the id.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = (() => {
    let next = 1;

    return () => {
      return next++;
    };
  })();
});