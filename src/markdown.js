/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import ViewText from '../engine/view/text.js';
import MutationObserver from '../engine/view/observer/mutationobserver.js';
import Range from '../engine/model/range.js';
import RootElement from '../engine/model/rootelement.js';
import ViewRange from '../engine/view/range.js';
import ViewAttributeElement from '../engine/view/attributeelement.js';
import ViewContainerElement from '../engine/view/containerelement.js';
import ViewMatcher from '../engine/view/matcher.js';
import BuildViewConverterFor from '../engine/conversion/view-converter-builder.js';
import BuildModelConverterFor from '../engine/conversion/model-converter-builder.js';
let first = true;
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
		const data = editor.data;
		const editing = editor.editing;

		editor.document.schema.allow( { name: '$inline', attributes: [ 'bold-md' ] } );
		editor.document.schema.allow( { name: '$inline', attributes: [ 'italic-md' ] } );

		BuildModelConverterFor( data.modelToView, editing.modelToView )
			.fromAttribute( 'bold-md' )
			.toElement( 'strong' );

		BuildViewConverterFor( data.viewToModel )
			.fromElement( 'strong' )
			.toAttribute( 'bold-md', true );

		BuildModelConverterFor( data.modelToView, editing.modelToView )
			.fromAttribute( 'italic-md' )
			.toElement( 'em' );

		BuildViewConverterFor( data.viewToModel )
			.fromElement( 'em' )
			.toAttribute( 'italic-md', true );

		editing.model.on( 'change', ( evt, type, data ) => {
			console.log( 'model changed', type );

			if ( type === 'insert' ) {
				const insertPosition = data.range.start;
				const insertBlock = findTopmostBlock( insertPosition );

				removeAttributes( insertBlock );
				applyAttributes( insertBlock );
			} else
			if ( type === 'remove' ) {
				const removePosition = data.sourcePosition;
				const removeBlock = findTopmostBlock( removePosition );


				if ( removeBlock !== null ) {
					removeAttributes( removeBlock );
					applyAttributes( removeBlock );
				}
			} else
			if ( type === 'move' ) {
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
			const range = Range.createFromElement( block );
			doc.enqueueChanges( () => {
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
