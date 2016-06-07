/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import Range from '../engine/model/range.js';
import RootElement from '../engine/model/rootelement.js';
import BuildModelConverterFor from '../engine/conversion/model-converter-builder.js';
import Model from '../ui/model.js';
import ButtonController from '../ui/button/button.js';
import ButtonView from '../ui/button/buttonview.js';
import MarkdownTextCommand from './markdowntextcommand.js';
import MarkdownBlockCommand from './markdownblockcommand.js';

/**
 * A paragraph feature for editor.
 * Introduces `<paragraph>` element in the model which renders as `<p>` in the DOM and data.
 *
 * @memberOf paragraph
 * @extends ckeditor5.Feature
 */
export default class Markdown extends Feature {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const doc = editor.document;
		let block = false;

		this._createConverters();
		this._createTextCommand( 'bold-md', '**', 'Bold', 'bold', 'CTRL+B' );
		this._createTextCommand( 'italic-md', '*', 'Italic', 'italic', 'CTRL+I' );
		this._createBlockCommand( 'heading1-md', 'heading1', 'H1', '# ' );
		this._createBlockCommand( 'heading2-md', 'heading2', 'H2', '## ' );
		this._createBlockCommand( 'heading3-md', 'heading3', 'H3', '### ' );

		// Listen to model changes and add attributes.
		this.listenTo( doc, 'change', ( evt, type, data ) => {
			if ( type === 'insert' && !block ) {
				console.log( 'insert' );
				const insertPosition = data.range.start;
				const insertBlock = findTopmostBlock( insertPosition );

				removeAttributes( insertBlock );
				applyAttributes( insertBlock );
				applyHeaders( insertBlock );
			} else
			if ( type === 'remove' && !block ) {
				console.log( 'remove' );
				const removePosition = data.sourcePosition;
				const removeBlock = findTopmostBlock( removePosition );

				if ( removeBlock !== null ) {
					removeAttributes( removeBlock );
					applyAttributes( removeBlock );
					applyHeaders( removeBlock );
				}
			} else
			if ( type === 'move' ) {
				console.log( 'move' );
				const movePosition = data.sourcePosition;
				const moveBlock = findTopmostBlock( movePosition );

				removeAttributes( moveBlock );
				applyAttributes( moveBlock );

				const destPosition = data.range.start;
				const destBlock = findTopmostBlock( destPosition );

				removeAttributes( destBlock );
				applyAttributes( destBlock );
			}
		} );

		function removeAttributes( block ) {
			doc.enqueueChanges( () => {
				const range = Range.createFromElement( block );

				if ( block.root.rootName !== '$graveyard' ) {
					const batch = doc.batch();
					batch.removeAttr( 'bold-md', range );
					batch.removeAttr( 'italic-md', range );
				}
			} );
		}

		function applyAttributes( block ) {
			const text = block.getText();
			const regexp = new RegExp( /(\*\*.+?\*\*)|(\*.+?\*)/g );

			let result;

			// Strong && emphasis.
			while ( ( result = regexp.exec( text ) ) !== null ) {
				let matched;
				let attr;

				if ( result[ 1 ] ) {
					matched = result[ 1 ];
					attr = 'bold-md';
				}

				if ( result[ 2 ] ) {
					matched = result[ 2 ];
					attr = 'italic-md';
				}

				const index = result.index;

				doc.enqueueChanges( () => {
					const batch = doc.batch();
					const range = Range.createFromParentsAndOffsets( block, index, block, index + matched.length );
					batch.setAttr( attr, true, range );
				} );
			}
		}

		function applyHeaders( block ) {
			const text = block.getText();

			if ( /^#\s/.test( text ) ) {
				rename( 'heading1', block );
			} else
			if ( /^##\s/.test( text ) ) {
				rename( 'heading2', block );
			} else
			if ( /^###\s/.test( text ) ) {
				rename( 'heading3', block );
			}
			else {
				rename( 'paragraph', block );
			}
		}

		function rename( name, element ) {
			if ( element.name === name ) {
				return;
			}

			// We will not listen on events fired when renaming is happening.
			block = true;
			doc.enqueueChanges( () => {
				const ranges = [ ...doc.selection.getRanges() ];
				const isSelectionBackward = doc.selection.isBackward;
				const batch = doc.batch();

				batch.rename( name, element );

				doc.selection.setRanges( ranges, isSelectionBackward );
				block = false;
			} );
		}
	}

	_createConverters() {
		const schema = this.editor.document.schema;
		const editing = this.editor.editing;

		schema.allow( { name: '$inline', attributes: 'bold-md' } );
		schema.allow( { name: '$inline', attributes: 'italic-md' } );

		BuildModelConverterFor( editing.modelToView )
			.fromAttribute( 'bold-md' )
			.toElement( 'strong' );

		BuildModelConverterFor( editing.modelToView )
			.fromAttribute( 'italic-md' )
			.toElement( 'em' );
	}

	_createTextCommand( name, delimiter, label, icon, keystroke ) {
		const editor = this.editor;

		const command = new MarkdownTextCommand( editor, name, delimiter );
		editor.commands.set( name, command );

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: label,
			icon: icon,
			iconAlign: 'LEFT'
		} );

		// Bind model to command.
		buttonModel.bind( 'isEnabled', 'isOn' ).to( command, 'isEnabled', 'value' );

		// Add bold button to feature components.
		editor.ui.featureComponents.add( name, ButtonController, ButtonView, buttonModel );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => editor.execute( name ) );

		// Keystroke.
		editor.keystrokes.set( keystroke, name );
	}

	_createBlockCommand( commandName, blockName, label, delimiter ) {
		const editor = this.editor;

		const command = new MarkdownBlockCommand( editor, blockName, delimiter );
		editor.commands.set( commandName, command );

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: label,
			iconAlign: 'LEFT'
		} );

		// Bind model to command.
		buttonModel.bind( 'isEnabled', 'isOn' ).to( command, 'isEnabled', 'value' );

		// Add bold button to feature components.
		editor.ui.featureComponents.add( commandName, ButtonController, ButtonView, buttonModel );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => editor.execute( commandName ) );
	}
}

// Looks for topmost element from position parent to element placed in root.
//
// NOTE: This method does not checks schema directly - assumes that only block elements can be placed directly inside
// root.
//
// @private
// @param {engine.model.Position} position
// @param {Boolean} [nodeAfter=true] When position is placed inside root element this will determine if element before
// or after given position will be returned.
// @returns {engine.model.Element}
function findTopmostBlock( position, nodeAfter = true ) {
	let parent = position.parent;

	// If position is placed inside root - get element after/before it.
	if ( parent instanceof RootElement ) {
		return nodeAfter ? position.nodeAfter : position.nodeBefore;
	}

	while ( !( parent.parent instanceof RootElement ) ) {
		parent = parent.parent;
	}

	return parent;
}
