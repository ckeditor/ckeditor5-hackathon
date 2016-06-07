/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Command from '../command/command.js';
import Range from '../engine/model/range.js';
import Position from '../engine/model/position.js';
import { findTopmostBlock } from './markdown.js';

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
