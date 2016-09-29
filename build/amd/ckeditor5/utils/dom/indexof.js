define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Returns index of the node in the parent element.
   *
   * @method utils.dom.indexOf
   * @param {Node} node Node which index is tested.
   * @returns {Number} Index of the node in the parent element. Returns 0 if node has no parent.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = indexOf;
  function indexOf(node) {
    let index = 0;

    while (node.previousSibling) {
      node = node.previousSibling;
      index++;
    }

    return index;
  }
});