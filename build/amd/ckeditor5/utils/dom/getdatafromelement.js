define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Gets data from a given source element.
   *
   * @method utils.dom.getDataFromElement
   * @param {HTMLElement} el The element from which the data will be retrieved.
   * @returns {String} The data string.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getDataFromElement;
  function getDataFromElement(el) {
    if (el instanceof HTMLTextAreaElement) {
      return el.value;
    }

    return el.innerHTML;
  }
});