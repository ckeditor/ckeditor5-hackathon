/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import Undo from '../undo/undo.js';

import AttributeDelta from '../engine/model/delta/attributedelta.js';
import InsertDelta from '../engine/model/delta/insertdelta.js';
import MergeDelta from '../engine/model/delta/mergedelta.js';
import MoveDelta from '../engine/model/delta/movedelta.js';
import RemoveDelta from '../engine/model/delta/removedelta.js';
import RenameDelta from '../engine/model/delta/renamedelta.js';
import SplitDelta from '../engine/model/delta/splitdelta.js';
import UnwrapDelta from '../engine/model/delta/unwrapdelta.js';
import WeakInsertDelta from '../engine/model/delta/weakinsertdelta.js';
import WrapDelta from '../engine/model/delta/wrapdelta.js';

import InsertOperation from '../engine/model/operation/insertoperation.js';
import MoveOperation from '../engine/model/operation/moveoperation.js';
import AttributeOperation from '../engine/model/operation/moveoperation.js';

import ModelRange from '../engine/model/range.js';

export default class SelectiveUndo extends Feature {
	static get requires() {
		return [ Undo ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		this.previewedItem = null;
		this.previewedRanges = [];
		this.items = [];
		this.uiHolder = this._initUi();

		window.document.body.appendChild( this.uiHolder );

		const undo = this.editor.commands.get( 'undo' );

		this.listenTo( this.editor.document, 'change', ( evt, type, data, batch ) => {
			if ( batch.type == 'undo' || batch.type == 'ignore' ) {
				return;
			}

			const item = this._getItem( batch );

			if ( item ) {
				this._updateItem( item, type, data, batch );
			} else {
				this._addItem( type, data, batch );
			}
		} );

		this.listenTo( this.editor.document, 'change', ( evt, type, data, batch ) => {
			if ( this.previewedItem != null ) {
				this._closePreview( this.previewedItem );
			}
		}, 0 );

		this.listenTo( this.editor.document, 'change', ( evt, type, data, batch ) => {
			if ( this.previewedItem != null ) {
				this.previewItem( this.previewedItem );
			}
		}, 9999 );

		this.listenTo( undo, 'revert', ( evt, batch ) => {
			this._removeItem( batch )
		} );
	}

	_getItem( batch ) {
		for ( let item of this.items ) {
			if ( item.batch == batch ) {
				return item;
			}
		}

		return null;
	}

	_addItem( type, data, batch ) {
		const item = {};

		item.id = this.items.length + 1;
		item.batch = batch;

		item.ui = window.document.createElement( 'div' );
		item.ui.className = 'ck-editor__selective-undo__item';
		item.ui.innerHTML = this._getBatchDescription( batch, item.id );

		item.ui.addEventListener( 'click', () => {
			this._revertItem( item );
		} );

		item.ui.addEventListener( 'mouseenter', () => {
			this._previewItem( item );
			this.previewedItem = item;
		} );

		item.ui.addEventListener( 'mouseleave', () => {
			this._closePreview( item );
			this.previewedItem = null;
		} );

		this.uiHolder.appendChild( item.ui );

		this.items.push( item );
	}

	_updateItem( item, type, data, batch ) {
		item.ui.innerHTML = this._getBatchDescription( batch, item.id );
	}

	_removeItem( batch ) {
		const item = this._getItem( batch );

		if ( item ) {
			this.uiHolder.removeChild( item.ui );
		}
	}

	_revertItem( item ) {
		this.editor.execute( 'undo', item.batch );
	}

	_previewItem( item ) {
		let ranges = [];

		for ( let delta of item.batch.deltas ) {
			for ( let operation of delta.operations ) {
				if ( operation instanceof InsertOperation ) {
					ranges.push( ModelRange.createFromPositionAndShift( operation.position, operation.nodeList.length ) );
				} else if ( operation instanceof MoveOperation ) {
					ranges.push( ModelRange.createFromPositionAndShift( operation.position, 1 ) );
					ranges.push( ModelRange.createFromPositionAndShift( operation.position, operation.howMany ) );
				} else if ( operation instanceof AttributeOperation ) {

				}
			}
		}
	}

	_closePreview( item ) {
	}

	_getBatchDescription( batch, id ) {
		let lastDelta = null;
		let description = 'Batch #' + id;

		for ( let delta of batch.deltas ) {
			if ( delta instanceof AttributeDelta ) {
				description += '<br />Change attribute <strong>' + delta.key + '</strong> to <strong>' + delta.value + '</strong>';
			} else if ( delta instanceof WeakInsertDelta ) {
				if ( !( lastDelta instanceof WeakInsertDelta ) ) {
					description += '<br />Write/insert text: ';
				}

				for ( let operation of delta.operations ) {
					for ( let item of operation.nodeList ) {
						description += item.name || item.character;
					}
				}
			} else if ( delta instanceof InsertDelta ) {
				if ( !( lastDelta instanceof InsertDelta ) ) {
					description += '<br />Insert: ';
				}

				for ( let operation of delta.operations ) {
					for ( let item of operation.nodeList ) {
						description += item.name || item.character;
					}
				}
			} else if ( delta instanceof MergeDelta ) {
				description += '<br />Merge elements';
			} else if ( delta instanceof RemoveDelta ) {
				description += '<br />Remove elements';
			} else if ( delta instanceof MoveDelta ) {
				description += '<br />Move elements';
			} else if ( delta instanceof RenameDelta ) {
				description += '<br />Change element name';
			} else if ( delta instanceof SplitDelta ) {
				description += '<br />Split element';
			} else if ( delta instanceof UnwrapDelta ) {
				description += '<br />Unwrap element contents';
			} else if ( delta instanceof WrapDelta ) {
				description += '<br />Wrap element contents';
			}

			lastDelta = delta;
		}

		return description;
	}

	_initUi() {
		const element = window.document.createElement( 'div' );
		element.className = 'ck-editor__selective-undo';

		return element;
	}
}

// Helper function for `UndoCommand`.
// Is responsible for restoring given `selectionState` and transform it
// accordingly to the changes that happened to the document after the
// `selectionState` got saved.
function restoreSelection( selectionState, baseVersion, document ) {
	const history = document.history;

	// Take all selection ranges that were stored with undone batch.
	const ranges = selectionState.ranges;

	// This will keep the transformed selection ranges.
	const transformedRanges = [];

	for ( let originalRange of ranges ) {
		// We create `transformed` array. At the beginning it will have only the original range.
		// During transformation the original range will change or even break into smaller ranges.
		// After the range is broken into two ranges, we have to transform both of those ranges separately.
		// For that reason, we keep all transformed ranges in one array and operate on it.
		let transformed = [ originalRange ];

		// The ranges will be transformed by active deltas from history that happened
		// after the selection got stored. Note, that at this point the document history
		// already is updated so we will not transform the range by deltas that got undone,
		// or their reversed version.
		for ( let historyItem of history.getHistoryItems( baseVersion ) ) {
			const delta = historyItem.delta;

			for ( let operation of delta.operations ) {
				// We look through all operations from all deltas.

				for ( let i = 0; i < transformed.length; i++ ) {
					// We transform every range by every operation.
					// We keep current state of transformation in `transformed` array and update it.
					let result;

					switch ( operation.type ) {
						case 'insert':
							result = transformed[ i ].getTransformedByInsertion(
								operation.position,
								operation.nodeList.length,
								true
							);
							break;

						case 'move':
						case 'remove':
						case 'reinsert':
							result = transformed[ i ].getTransformedByMove(
								operation.sourcePosition,
								operation.targetPosition,
								operation.howMany,
								true
							);
							break;
					}

					// If we have a transformation result, we substitute it in `transformed` array with
					// the range that got transformed. Keep in mind that the result is an array
					// and may contain multiple ranges.
					if ( result ) {
						transformed.splice( i, 1, ...result );

						// Fix iterator.
						i = i + result.length - 1;
					}
				}
			}
		}

		// After `originalRange` got transformed, we have an array of ranges. Some of those
		// ranges may be "touching" -- they can be next to each other and could be merged.
		// Let's do this. First, we have to sort those ranges because they don't have to be
		// in an order.
		transformed.sort( ( a, b ) => a.start.isBefore( b.start ) ? -1 : 1 );

		// Then we check if two consecutive ranges are touching. We can do it pair by pair
		// in one dimensional loop because ranges are sorted.
		for ( let i = 1 ; i < transformed.length; i++ ) {
			let a = transformed[ i - 1 ];
			let b = transformed[ i ];

			if ( a.end.isTouching( b.start ) ) {
				a.end = b.end;
				transformed.splice( i, 1 );
				i--;
			}
		}

		// For each `originalRange` from `ranges`, we take only one transformed range.
		// This is because we want to prevent situation where single-range selection
		// got transformed to mulit-range selection. We will take the first range that
		// is not in the graveyard.
		const transformedRange = transformed.find(
			( range ) => range.start.root != document.graveyard
		);

		if ( transformedRange ) {
			transformedRanges.push( transformedRange );
		}
	}

	// `transformedRanges` may be empty if all ranges ended up in graveyard.
	// If that is the case, do not restore selection.
	if ( transformedRanges.length ) {
		document.selection.setRanges( transformedRanges, selectionState.isBackward );
	}
}
