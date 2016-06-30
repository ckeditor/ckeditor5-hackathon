define(['exports', '/ckeditor5/utils/observablemixin.js'], function (exports, _observablemixin) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  /* bender-tags: view */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createDocumentMock;

  var _observablemixin2 = _interopRequireDefault(_observablemixin);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Creates {@link engine.view.Document view Document} mock.
   *
   * @returns {utils.ObservableMixin} Document mock
   */
  function createDocumentMock() {
    const doc = Object.create(_observablemixin2.default);
    doc.set('focusedEditable', null);

    return doc;
  }
});