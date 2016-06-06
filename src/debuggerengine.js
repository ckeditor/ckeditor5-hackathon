/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import { stringify } from '/tests/engine/_utils/model.js';

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

		const debugElement = window.document.createElement( 'div' );
		debugElement.id = 'editor-debugger';
		debugElement.style.border = '1px solid red';
		debugElement.style.minHeight = '100px';

		doc.on( 'change', ( ) => {
			doc.enqueueChanges( () => {
				// const treeAsString = stringify( editor.document.getRoot().getChild( 0 ) );
				// console.log( { treeAsString } );
			} );
		} );

		window.stringify = stringify;
		window.document.body.appendChild( debugElement );
	}
}
