define(['exports'], function (exports) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  /**
   * Removes given node from parent.
   *
   * @method utils.dom.remove
   * @param {Node} node Node to remove.
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = remove;
  function remove(node) {
    const parent = node.parentNode;

    if (parent) {
      parent.removeChild(node);
    }
  }
});