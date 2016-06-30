define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/mutationobserver.js', '/ckeditor5/engine/view/observer/selectionobserver.js', '/tests/engine/_utils/view.js'], function (_document, _mutationobserver, _selectionobserver, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _mutationobserver2 = _interopRequireDefault(_mutationobserver);

	var _selectionobserver2 = _interopRequireDefault(_selectionobserver);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const viewDocument = new _document2.default();
	const viewRoot = viewDocument.createRoot(document.getElementById('editor'));

	viewDocument.addObserver(_mutationobserver2.default);
	viewDocument.addObserver(_selectionobserver2.default);

	viewDocument.focusedEditable = viewRoot;

	(0, _view.setData)(viewDocument, '<container:p><attribute:b>foo</attribute:b>bar</container:p>' + '<container:p>bom</container:p>');

	viewDocument.on('selectionChange', (evt, data) => {
		console.log(data);
		viewDocument.selection.setTo(data.newSelection);
	});

	viewDocument.render();
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
