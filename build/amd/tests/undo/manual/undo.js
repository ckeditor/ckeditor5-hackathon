define('tests', ['/ckeditor5/creator-classic/classic.js'], function (_classic) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* global console:false */

	'use strict';

	var _classic2 = _interopRequireDefault(_classic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_classic2.default.create(document.querySelector('#editor'), {
		features: ['delete', 'enter', 'typing', 'paragraph', 'undo', 'basic-styles/bold', 'basic-styles/italic'],
		toolbar: ['bold', 'italic', 'undo', 'redo']
	}).then(editor => {
		window.editor = editor;
	}).catch(err => {
		console.error(err.stack);
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
