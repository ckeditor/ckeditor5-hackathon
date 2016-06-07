/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Command from '../command/command.js';
import Text from '../engine/model/text.js';
import Range from '../engine/model/range.js';
const SAMPLE_TEXT = 'sample';

export default class MarkdownTextCommand extends Command {
	constructor( editor, attribute, delimiter ) {
		super( editor );

		this.set( 'value', false );
		this.delimiter = delimiter;

		this.listenTo( this.editor.document.selection, 'change:attribute', () => {
			this.value = this.editor.document.selection.hasAttribute( attribute );
		} );
	}

	_doExecute() {
		const doc = this.editor.document;
		const selection = doc.selection;

		if ( selection.isCollapsed ) {
			this._insertText( doc );
		} else {
			// TODO: Range selections.
		}
	}

	_insertText( doc ) {
		doc.enqueueChanges( () => {
			const position = doc.selection.getFirstPosition();
			const batch = doc.batch();
			const text = new Text( this.delimiter + SAMPLE_TEXT + this.delimiter );
			const delimiterSize = this.delimiter.length;

			batch.insert( position, text );

			const range = Range.createFromParentsAndOffsets(
				position.parent,
				position.offset + delimiterSize,
				position.parent,
				position.offset + delimiterSize + SAMPLE_TEXT.length
			);

			doc.selection.setRanges( [ range ] );
		} );
	}
}
