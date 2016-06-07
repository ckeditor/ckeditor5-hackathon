/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global console:false */

'use strict';

import ClassicEditor from '/ckeditor5/creator-classic/classic.js';

ClassicEditor.create( document.querySelector( '#editor' ), {
	features: [ 'delete', 'enter', 'typing', 'paragraph', 'formats/formatsengine', 'undo', 'hackathon/markdown' ],
	toolbar: [ 'heading1-md', 'heading2-md', 'heading3-md', 'bold-md', 'italic-md' ]
} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
