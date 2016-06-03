/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global console:false */

'use strict';

import Feature from '../feature.js';
// import Model from '../ui/model.js';

/**
 * Autocomplete
 *
 * @extends ckeditor5.Feature
 */
export default class Undo extends Feature {
	init() {
		// const t = editor.t;

		this.editor.document.on( 'change', () => {
			this._check();
		} );
	}

	_check() {
		const editor = this.editor;
		const cfg = editor.config.get( 'autocomplete' );

		// A sample @te^xt.
		const sel = editor.document.selection;

		// "A sample @text."
		const text = sel.focus.parent.getText();
		const selOffset = sel.focus.offset;

		// "A sample @te"
		const textBefore = text.substr( 0, selOffset + 1 );

		let lastTrigger = null;
		let lastTriggerIndex = 0;

		for ( let c in cfg ) {
			const index = textBefore.lastIndexOf( c );

			if ( index > lastTriggerIndex ) {
				lastTriggerIndex = index;
				lastTrigger = c;
			}
		}

		if ( !lastTrigger ) {
			console.log( '[i] No trigger found.' );

			return;
		}

		// "te"
		const currentText = text.slice( lastTriggerIndex + 1, selOffset + 1 );

		if ( currentText.match( /\s/g ) ) {
			console.log( '[i] Whitespace between trigger and current position.' );

			return;
		}

		const suggestions = cfg[ lastTrigger ].filter( s => {
			return s.indexOf( currentText ) === 0;
		} ).sort();

		console.log( currentText, suggestions );
	}
}
