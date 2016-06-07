/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Command from '../command/command.js';
import RootElement from '../engine/model/rootelement.js';
import Range from '../engine/model/range.js';
import Position from '../engine/model/position.js';

export default class MarkdownBlockCommand extends Command {
	constructor( editor, blockName, delimiter ) {
		super( editor );

		const selection = this.editor.document.selection;
		this.delimiter = delimiter;
		this.set( 'value', false );

		this.listenTo( selection, 'change:attribute', () => {
			const block = findTopmostBlock( selection.getFirstPosition() );
			this.value = block.name === blockName;
		} );
	}

	_doExecute() {
		const doc = this.editor.document;
		const selection = doc.selection;
		const remove = this.value;

		if ( selection.isCollapsed ) {
			doc.enqueueChanges( () => {
				const position = selection.getFirstPosition();
				const block = findTopmostBlock( position );
				const batch = doc.batch();

				const text = block.getText();
				// TODO: Remove ardcoded headers.
				const regexp = /^#{1,3}\s/;
				const matched = regexp.exec( text );

				if ( matched !== null ) {
					batch.remove( Range.createFromParentsAndOffsets( block, 0, block, matched[ 0 ].length ) );
				}
			} );

			doc.enqueueChanges( () => {
				const batch = doc.batch();
				const position = selection.getFirstPosition();
				const block = findTopmostBlock( position );

				if ( !remove ) {
					batch.insert( Position.createFromParentAndOffset( block, 0 ), this.delimiter );
				}
			} );
		}
	}
}

// TODO: Duplicated method.
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
