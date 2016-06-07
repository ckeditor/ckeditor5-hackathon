/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import TreeWalker from '../engine/model/treewalker.js';
import Position from '../engine/model/position.js';
import LivePosition from '../engine/model/liveposition.js';
import Text from '../engine/model/text.js';

/**
 * Text transformations PoC.
 *
 * @extends ckeditor5.Feature
 */
export default class TextTransformator extends Feature {
	/**
	 * @inheritdoc
	 */
	constructor( ...args ) {
		super( ...args );

		/**
		 * Set of transformation definitions.
		 *
		 * @type {Map}
		 */
		this.transformDefinitions = new Map();
		this.transformDefinitions.set( 'cke', new Text( 'CKE' ) );
		this.transformDefinitions.set( ':)', new Text( '\u263A' ) );
	}

	/**
	 * @inheritdoc
	 */
	init() {
		this.editor.document.on( 'change', ( event, type, changes, batch ) => {
			if ( type != 'insert' ) {
				return;
			}

			for ( let value of changes.range.getItems( { singleCharacters: true } ) ) {
				let matched = this._matchChangeWithPatterns( Position.createAfter( value ), this.transformDefinitions );

				if ( !matched.success ) {
					continue;
				}

				const doc = this.editor.document;
				let livePos = LivePosition.createFromPosition( matched.position );

				doc.enqueueChanges( () => {
					if ( livePos.root != doc.graveyard &&
						this._matchChangeWithPatterns( matched.position, this.transformDefinitions )
					) {
						for ( let i = 0; i < matched.transformation[ 0 ].length; i++ ) {
							batch.remove( livePos.nodeBefore );
						}

						batch.insert( livePos, matched.transformation[ 1 ] );
					}
				} );
			}
		} );
	}

	/**
	 * Iterate through the change range and match with transformation definitions.
	 *
	 * @param {Object} position
	 * @param {Map} transformDefinitions
	 * @returns {Object} matched definition data
	 * @private
	 */
	_matchChangeWithPatterns( position, transformDefinitions ) {
		let matched = { position };

		for ( let transformation of transformDefinitions ) {
			const walker = new TreeWalker( {
				singleCharacters: true,
				direction: 'BACKWARD',
				startPosition: matched.position
			} );

			matched.success = true;

			let current = walker.next();
			let characters = transformation[ 0 ].split( '' );

			for ( let i = characters.length - 1; i >= 0; i-- ) {
				if ( current.done || current.value.item.character != characters[ i ] ) {
					matched.success = false;
					break;
				}

				current = walker.next();
			}

			if ( matched.success ) {
				matched.transformation = transformation;
				break;
			}
		}

		if ( !matched.success ) {
			return { success: false };
		}

		return matched;
	}
}
