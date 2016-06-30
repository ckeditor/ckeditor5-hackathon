define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Sets data in a given element.
   *
   * @method utils.dom.setDataInElement
   * @param {HTMLElement} el The element in which the data will be set.
   * @param {String} data The data string.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setDataInElement;
  function setDataInElement(el, data) {
    if (el instanceof HTMLTextAreaElement) {
      el.value = data;
    }

    el.innerHTML = data;
  }
});