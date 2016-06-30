define(['exports', '/ckeditor5/engine/model/treewalker.js'], function (exports, _treewalker) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getNodesAndText = getNodesAndText;
  exports.jsonParseStringify = jsonParseStringify;

  var _treewalker2 = _interopRequireDefault(_treewalker);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Returns tree structure as a simplified string. Elements are uppercase and characters are lowercase.
   * Start and end of an element is marked the same way, by the element's name (in uppercase).
   *
   *		let element = new Element( 'div', [], [ 'abc', new Element( 'p', [], 'foo' ), 'xyz' ] );
   *		modelUtils.getNodesAndText( element ); // abcPfooPxyz
   *
   * @param {engine.model.Range} range Range to stringify.
   * @returns {String} String representing element inner structure.
   */
  function getNodesAndText(range) {
    let txt = '';
    const treeWalker = new _treewalker2.default({ boundaries: range });

    for (let value of treeWalker) {
      let node = value.item;
      let nodeText = node.text || node.character;

      if (nodeText) {
        txt += nodeText.toLowerCase();
      } else {
        txt += node.name.toUpperCase();
      }
    }

    return txt;
  }

  /**
   * Returns object JSON representation. It pases an object by JSON.stringify and JSON.parse functions.
   *
   * @param {Object|Array} object
   */
  function jsonParseStringify(object) {
    return JSON.parse(JSON.stringify(object));
  }
});