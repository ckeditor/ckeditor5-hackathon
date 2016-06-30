define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/focusobserver.js'], function (_document, _focusobserver) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  /* global console:false */

  'use strict';

  var _document2 = _interopRequireDefault(_document);

  var _focusobserver2 = _interopRequireDefault(_focusobserver);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const viewDocument = new _document2.default();

  viewDocument.on('focus', (evt, data) => console.log('event:focus', data.domTarget));
  viewDocument.on('blur', (evt, data) => console.log('event:blur', data.domTarget));

  viewDocument.addObserver(_focusobserver2.default);

  const domEditable1 = document.getElementById('editable1');
  const domEditable2 = document.getElementById('editable2');

  const editable1 = viewDocument.createRoot(domEditable1, 'editable1');
  const editable2 = viewDocument.createRoot(domEditable2, 'editable2');

  editable1.on('change:isFocused', () => domEditable1.style.backgroundColor = editable1.isFocused ? 'green' : 'red');
  editable2.on('change:isFocused', () => domEditable2.style.backgroundColor = editable2.isFocused ? 'green' : 'red');
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
