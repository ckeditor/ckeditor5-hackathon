define(['exports', '../lib/lodash/isString.js', '../isiterable.js'], function (exports, _isString, _isiterable) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createElement;

  var _isString2 = _interopRequireDefault(_isString);

  var _isiterable2 = _interopRequireDefault(_isiterable);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates element with attributes and children.
   *
   *		createElement( document, 'p' ); // <p>
   *		createElement( document, 'p', { class: 'foo' } ); // <p class="foo">
   *		createElement( document, 'p', null, 'foo' ); // <p>foo</p>
   *		createElement( document, 'p', null, [ 'foo', createElement( document, 'img' ) ] ); // <p>foo<img></p>
   *
   * @method utils.dom.createElement
   * @param {Document} doc Document used to create element.
   * @param {String} name Name of the element.
   * @param {Object} attributes Object keys will become attributes keys and object values will became attributes values.
   * @param {Node|String|Array.<Node|String>} children Child or array of children. Strings will be automatically turned
   * into Text nodes.
   * @returns {Element} Created element.
   */
  function createElement(doc, name, attributes = {}, children = []) {
    const element = doc.createElement(name);

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    if ((0, _isString2.default)(children) || !(0, _isiterable2.default)(children)) {
      children = [children];
    }

    for (let child of children) {
      if ((0, _isString2.default)(child)) {
        child = doc.createTextNode(child);
      }

      element.appendChild(child);
    }

    return element;
  }
});