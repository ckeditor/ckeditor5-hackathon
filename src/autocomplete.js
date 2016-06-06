/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global console:false */

'use strict';

import Feature from '../feature.js';
import Collection from '/ckeditor5/utils/collection.js';
import Model from '/ckeditor5/ui/model.js';

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import FloatingDropdownPanelView from './floatingdropdownpanelview.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

/**
 * Autocomplete
 *
 * @extends ckeditor5.Feature
 */
export default class Autocomplete extends Feature {
	/**
	 * TODO
	 */
	init() {
		const editor = this.editor;

		this.model = new Model( {
			currentText: '',
			suggestions: new Collection( { idProperty: 'label' } )
		} );

		this._setupUi();

		editor.document.on( 'changesDone', this._check, this );
	}

	/**
	 * TODO
	 */
	_setupUi() {
		const editor = this.editor;
		const suggestions = this.model.suggestions;

		const panelModel = new Model( {
			isOn: false
		} );

		const listModel = new Model( {
			items: this.model.suggestions
		} );

		const panelView = new FloatingDropdownPanelView( panelModel );
		const panel = new DropdownPanel( panelModel, panelView );
		const list = new List( listModel, new ListView( listModel ) );

		panel.add( 'content', list );
		editor.ui.collections.get( 'body' ).add( panel );

		// Show the panel when there are some suggestions.
		this.listenTo( suggestions, 'add', () => {
			panelModel.isOn = true;
		} );

		// Hide the panel when no suggestions.
		this.listenTo( suggestions, 'remove', () => {
			if ( !this.model.suggestions.length ) {
				panelModel.isOn = false;
			}
		} );

		this.listenTo( panelModel, 'change:isOn', ( evt, name, value ) => {
			if ( value ) {
				panelView.position();
			}
		} );

		this.listenTo( listModel, 'execute', this._insert, this );
	}

	/**
	 * TODO
	 */
	_check() {
		const editor = this.editor;
		const cfg = editor.config.get( 'autocomplete' );

		// A s#ample @te^xt.
		const sel = editor.document.selection;

		// "A s#ample @text."
		const text = sel.focus.parent.getText();
		const selOffset = sel.focus.offset;

		// "A s#ample @te"
		const textBefore = text.substr( 0, selOffset );

		let lastTrigger = null;
		let lastTriggerIndex = -1;

		this.model.suggestions.clear();

		for ( let c in cfg ) {
			const index = textBefore.lastIndexOf( c );

			if ( index > lastTriggerIndex ) {
				// "A s#ample @te"
				// -----------^
				lastTriggerIndex = index;

				// "@"
				lastTrigger = c;
			}
		}

		if ( !lastTrigger ) {
			console.log( '[i] No trigger found.' );

			return;
		}

		// TODO: Different offset when backspace
		const currentText =
			// "te"
			text.slice( lastTriggerIndex, selOffset ) +
			// "xt."
			text.slice( selOffset ).split( /\s/g )[ 0 ];

		console.log( `[i] Current "${ currentText }", Before: "${ textBefore }"` );

		if ( currentText.match( /\s/g ) ) {
			console.log( '[i] Whitespace between trigger and current position.' );

			return;
		}

		this.model.currentText = currentText;

		cfg[ lastTrigger ]
			.filter( sugText => {
				if ( currentText === lastTrigger ) {
					return sugText;
				} else {
					return sugText !== currentText && sugText.indexOf( currentText ) === 0;
				}
			} )
			.sort()
			.forEach( sugText => {
				console.log( `[i] Suggestion "${ sugText }" found.` );

				// It's very, very memory-inefficient. But it's a PoC, so...
				this.model.suggestions.add( new Model( {
					label: sugText
				} ) );
			} );
	}

	/**
	 * TODO
	 */
	_insert( evt, itemModel ) {
		const editor = this.editor;
		const doc = editor.document;

		doc.enqueueChanges( () => {
			doc.batch().insert(
				doc.selection.focus,
				itemModel.label.slice( this.model.currentText.length )
			);
		} );
	}
}
