/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';

import BuildModelConverterFor from '../engine/conversion/model-converter-builder.js';
import DeleteObserver from '../delete/deleteobserver.js';

import Range from '../engine/model/range.js';

// import deleteContents from '../engine/model/composer/deletecontents.js';

const INSERTED = 'inserted';
const DELETED = 'deleted';

export default class SuggestionMode extends Feature {
	init() {
		const editor = this.editor;
		const editing = editor.editing;
		const doc = editor.document;

		editing.view.addObserver( DeleteObserver );

		// Allow bold attribute on all inline nodes.
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
			const sel = data.selection;

			doc.enqueueChanges( () => {
				doc.batch().setAttr( DELETED, true, sel.getFirstRange() );

				const pos = sel.getFirstRange()[ data.options.direction == 'FORWARD' ? 'end' : 'start' ];
				sel.setRanges( [ new Range( pos, pos ) ] );
			} );

			evt.stop();
		}, null, 0 );
	}
}
