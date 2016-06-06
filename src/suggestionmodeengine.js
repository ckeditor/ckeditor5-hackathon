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
import InsertDelta from '../engine/model/delta/insertdelta.js';

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

			this._handleDeletion( data.selection, data.options );

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

			this._handleInsertion( data.range, batch );
		} );
	}

	// This is a bit tricky:
	//
	// 1. If deleting a not yet modified text, simply mark it as deleted.
	// 2. If deleting a previously inserted text, then delete it as you would do normally.
	//
	// However, the selection may contain a bigger chunk of content with lots of inserted, deleted or original text.
	// We shouldn't modify it node by node, but in bigger chunks. That's why we use filterNodes and have some fun below.
	_handleDeletion( sel, options ) {
		const doc = this.editor.document;

		doc.enqueueChanges( () => {
			const deletedRange = sel.getFirstRange();

			sel.removeAllRanges();

			// Case 1.
			for ( let fragRange of filterNodes( deletedRange, isNotModified ) ) {
				doc.batch().setAttr( DELETED, true, fragRange );
			}

			// Case 2.
			let insertedRanges = Array.from( filterNodes( deletedRange, isInserted ) );
			let fragRange;
			let selectionPosition = deletedRange[ options.direction == 'FORWARD' ? 'end' : 'start' ];

			while ( ( fragRange = insertedRanges.pop() ) ) {
				// TODO Finding the expected selection position is more tricky than this.
				// Case: "xx[xiix]xx" (i == inserted, x == existing). Now press backspace.
				// Selection should end up at offset 2. It ends at offset 3.
				selectionPosition = fragRange.start;
				doc.batch().remove( fragRange );
			}

			sel.setRanges( [ new Range( selectionPosition, selectionPosition ) ] );
		} );
	}

	_handleInsertion( modifiedRange, batch ) {
		const editor = this.editor;
		const doc = editor.document;

		const lastOperation = getLastOperation( batch );
		const lastDelta = lastOperation.delta;

		// Checking the last operation type may be redundant after we checked it above (TODO).
		// However, checking the delta type let's us know whether it wasn't e.g. a split delta,
		// which isn't insertion. After all, we don't want to mark second part of split paragraph as inserted.
		if ( !( lastOperation instanceof InsertOperation ) || !( lastDelta instanceof InsertDelta ) ) {
			return;
		}

		// Do not mark text which was inserted inside a deleted text as inserted.
		// This is how Google Docs work – typing within previously deleted text is still considered
		// as removing this bit. Makes some sense.
		if ( isInsertionWithinDeletion( modifiedRange ) ) {
			return;
		}

		doc.enqueueChanges( () => {
			// We're not checking type of the item (whether it's a text or element) so we'll mark elements
			// as well. This is actually fine, but we'd need converters to render that. Also, it'd matter whether
			// e.g. a right or left side of an block was merged with another block, so it's quite a lot of work
			// which I'm ignoring at this point.
			for ( let value of modifiedRange ) {
				const range = new Range( value.previousPosition, value.nextPosition );

				batch.setAttr( INSERTED, true, range );
				// We need to remove the deleted attribute, because typing uses weakinsert, so
				// the text automatically inherits current attributes.
				batch.removeAttr( DELETED, range );
			}
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

// Generates a collection of ranges which contain all nodes that satisfy the callback.
function* filterNodes( range, callback ) {
	let startPos;

	for ( let value of range ) {
		if ( !startPos && callback( value.item ) ) {
			startPos = value.previousPosition;

			continue;
		}

		if ( startPos && !callback( value.item ) ) {
			yield new Range( startPos, value.previousPosition );

			startPos = null;
		}
	}

	if ( startPos ) {
		yield new Range( startPos, range.end );
	}
}

function isNotModified( item ) {
	return !item.hasAttribute( DELETED ) && !item.hasAttribute( INSERTED );
}

function isInserted( item ) {
	return item.hasAttribute( INSERTED );
}
