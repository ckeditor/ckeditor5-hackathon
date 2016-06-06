/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import Command from '../command/command.js';

import BuildModelConverterFor from '../engine/conversion/model-converter-builder.js';

import Range from '../engine/model/range.js';

import InsertOperation from '../engine/model/operation/insertoperation.js';

const INSERTED = 'inserted';
const DELETED = 'deleted';

export default class SuggestionModeEngine extends Feature {
	init() {
		const editor = this.editor;
		const editing = editor.editing;
		const doc = editor.document;
		const command = new SuggestionModeCommand( editor );

		editor.commands.set( 'suggestionMode', command );

		// Allow delete and insert attribute on all inline nodes.
		doc.schema.allow( { name: '$inline', attributes: [ INSERTED ] } );
		doc.schema.allow( { name: '$inline', attributes: [ DELETED ] } );

		// Build converters from model to view for editing pipeline.
		BuildModelConverterFor( editing.modelToView )
			.fromAttribute( DELETED )
			.toElement( 'del' );
		BuildModelConverterFor( editing.modelToView )
			.fromAttribute( INSERTED )
			.toElement( 'ins' );

		// Override default action of composer.deleteContents().
		this.listenTo( doc.composer, 'deleteContents', ( evt, data ) => {
			// Feature is off.
			if ( !command.value ) {
				return;
			}

			const sel = data.selection;

			doc.enqueueChanges( () => {
				doc.batch().setAttr( DELETED, true, sel.getFirstRange() );

				const pos = sel.getFirstRange()[ data.options.direction == 'FORWARD' ? 'end' : 'start' ];
				sel.setRanges( [ new Range( pos, pos ) ] );
			} );

			evt.stop();
		}, null, 0 );

		// Mark all inserted text.
		this.listenTo( doc, 'change', ( evt, type, data, batch ) => {
			// Feature is off.
			if ( !command.value ) {
				return;
			}

			if ( type != 'insert' ) {
				return;
			}

			const lastOperation = getLastOperation( batch );

			// May be redundant after we checked the type above.
			if ( !( lastOperation instanceof InsertOperation ) ) {
				return;
			}

			// Do not mark text which was inserted inside a deleted text as inserted.
			// This is how Google Docs work – typing within previously deleted text is still considered
			// as removing this bit. Makes some sense.
			if ( isInsertionWithinDeletion( data.range ) ) {
				return;
			}

			doc.enqueueChanges( () => {
				for ( let value of data.range ) {
					const range = new Range( value.previousPosition, value.nextPosition );
					batch.setAttr( INSERTED, true, range );
					batch.removeAttr( DELETED, range );
				}
			} );
		} );
	}
}

class SuggestionModeCommand extends Command {
	constructor( editor ) {
		super( editor );

		this.set( 'value', false );
	}

	_doExecute() {
		this.value = !this.value;
	}
}

function getLastOperation( batch ) {
	return last( last( batch.deltas ).operations );
}

function last( array ) {
	return array[ array.length - 1 ];
}

function isInsertionWithinDeletion( changeRange ) {
	const nodeBefore = changeRange.start.nodeBefore;
	const nodeAfter = changeRange.end.nodeAfter;

	// If insertion happened at some boundary, then it's not "within" deleted content.
	if ( !nodeBefore || !nodeAfter ) {
		return false;
	}

	return nodeBefore.hasAttribute( DELETED ) && nodeAfter.hasAttribute( DELETED );
}
