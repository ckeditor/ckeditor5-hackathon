define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Checks if value implements iterator interface.
   *
   * @memberOf utils
   * @param {*} value The value to check.
   * @returns {Boolean} True if value implements iterator interface.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIterable;
  function isIterable(value) {
    return !!(value && value[Symbol.iterator]);
  }
});