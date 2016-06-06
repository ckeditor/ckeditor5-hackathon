/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';

import ButtonController from '../ui/button/button.js';
import ButtonView from '../ui/button/buttonview.js';
import Model from '../ui/model.js';

import SuggestionModeEngine from './suggestionmodeengine.js';

export default class SuggestionMode extends Feature {
	static get requires() {
		return [ SuggestionModeEngine ];
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'suggestionMode' );

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: t( 'Suggestion Mode' ),
			iconAlign: 'LEFT'
		} );

		// Bind button model to command.
		buttonModel.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => editor.execute( 'suggestionMode' ) );

		// Add suggestionMode button to feature components.
		editor.ui.featureComponents.add( 'suggestionMode', ButtonController, ButtonView, buttonModel );
	}
}
