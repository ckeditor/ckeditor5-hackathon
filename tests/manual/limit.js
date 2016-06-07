/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global console:false */
/* global alert:false */

'use strict';

import Editor from '/ckeditor5/hackathon/limit/toolbarlesseditor.js';
import Limit from '/ckeditor5/hackathon/limit/limit.js';

const counter = document.getElementById( 'counter' );
const button = document.querySelector( '#editor-area form button' );

Editor.create( document.querySelector( '#editor' ), {
	features: [ 'delete', 'enter', 'typing', 'paragraph', Limit ],
	limit: 25
} )
.then( editor => {
	const limitPlugin = editor.plugins.get( Limit );

	window.editor = editor;

	button.addEventListener( 'click', () => alert( editor.getData() ) );

	limitPlugin.on( 'change:count', () => {
		const count = 25 - limitPlugin.count;
		counter.innerText = count;

		if ( count >= 0 ) {
			counter.style.color = '#8899a6';
			button.style.opacity = '1';
		} else {
			counter.style.color = '#d40d12';
			button.style.opacity = '.2';
		}
	} );
} )
.catch( err => {
	console.error( err.stack );
} );
