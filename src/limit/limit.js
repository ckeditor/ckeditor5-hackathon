/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import ModelRange from '../../engine/model/range.js';
import BuildModelConverterFor from '../../engine/conversion/model-converter-builder.js';

import Feature from '../../feature.js';

import ObservableMixin from '../../utils/ObservableMixin.js';
import mix from '../../utils/mix.js';

export default class Limit extends Feature {
	init() {
		const editor = this.editor;
		const doc = editor.document;
		const limit = editor.config.get( 'limit' );

		this.set( 'count' );

		BuildModelConverterFor( editor.editing.modelToView ) // no data converter
			.fromAttribute( 'overflow' )
			.toElement( 'span.overflow' );

		// There is no conversion builder from attribute to nothing. We need to do it manually.
		editor.data.modelToView.on( 'insert:$text', ( evt, data ) => {
			if ( data.item.getAttribute( 'overflow' ) ) {
				evt.stop();
			}
		}, null, 0 );

		doc.on( 'change', ( evt, type, data, batch ) => {
			doc.enqueueChanges( () => {
				const range = ModelRange.createFromElement( doc.getRoot() );
				let count = 0;

				for ( let value of range.getWalker( { singleCharacters: true } ) ) {
					if ( value.type == 'CHARACTER' ) {
						count++;

						if ( count > limit ) {
							batch.setAttr( 'overflow', true, value.item );
						} else {
							batch.removeAttr( 'overflow', value.item );
						}
					}
				}

				this.count = count;
			} );
		} );
	}
}

mix( Limit, ObservableMixin );
