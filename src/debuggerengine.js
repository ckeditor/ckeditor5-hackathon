/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
// import DOMConventer from './domconventer';
import { stringify } from '/tests/engine/_utils/model.js';

function makeList( element ) {
	const ul = document.createElement( 'ul' );
	let li = document.createElement( 'li' );
	let tagName;

	ul.appendChild( li );

	if ( element instanceof Text ) {
		li.appendChild( element );
	} else {
		tagName = element.tagName.toLocaleLowerCase();

		if ( tagName === 'body' ) {
			tagName = '$root';
		}

		li.appendChild( new Text( `<${ tagName }>` ) );
	}

	for ( let item of element.childNodes ) {
		li.appendChild( makeList( item ) );
	}

	if ( tagName ) {
		li = document.createElement( 'li' );
		li.appendChild( new Text( `</${ tagName }>` ) );
		ul.appendChild( li );
	}

	return ul;
}

/**
 * @memberOf debugger
 * @extends ckeditor5.Feature
 */
export default class DebuggerEngine extends Feature {

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const doc = editor.document;
		// const conventer = new DOMConventer();
		const debugElement = window.document.createElement( 'div' );
		debugElement.style.border = '1px solid red';

		doc.on( 'change', () => {
			doc.enqueueChanges( () => {
				const domParser = new DOMParser();
				const modelAsString = stringify( doc.getRoot() );
				const parsedDoc = domParser.parseFromString( modelAsString, 'text/html' );
				// const convertedDoc = conventer.toArray( parsedDoc );

				while ( debugElement.firstChild ) {
					debugElement.removeChild( debugElement.firstChild );
				}

				debugElement.appendChild( makeList( parsedDoc.body ) );
			} );
		} );

		// todo: refactor following lines:
		window.stringify = stringify;
		window.document.body.appendChild( debugElement );
	}
}
