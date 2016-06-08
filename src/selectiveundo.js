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
import RemoveOperation from '../engine/model/operation/removeoperation.js';
import MoveOperation from '../engine/model/operation/moveoperation.js';
import AttributeOperation from '../engine/model/operation/attributeoperation.js';

import ModelRange from '../engine/model/range.js';

import ViewRange from '../engine/view/range.js';
import ViewAttributeElement from '../engine/view/attributeelement.js';
import ViewContainerElement from '../engine/view/containerelement.js';

export default class SelectiveUndo extends Feature {
	static get requires() {
		return [ Undo ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		this.previewedItem = null;
		this.previewElements = [];
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
				this._closePreview();
			}
		}, 0 );

		this.listenTo( this.editor.document, 'change', ( evt, type, data, batch ) => {
			if ( this.previewedItem != null ) {
				this._previewItem( this.previewedItem );
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
			this._closePreview();
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
		this._closePreview();
		this.previewedItem = null;
		this.editor.execute( 'undo', item.batch );
	}

	_previewItem( item ) {
		let ranges = [];

		for ( let delta of item.batch.deltas ) {
			for ( let operation of delta.operations ) {
				let baseVersion = operation.baseVersion;
				let deltaVersion = delta.baseVersion;

				if ( delta instanceof InsertDelta && operation instanceof InsertOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.position, operation.nodeList.length )
					} );
				} else if ( delta instanceof RemoveDelta && operation instanceof RemoveOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.sourcePosition, 0 )
					} );
				} else if ( delta instanceof SplitDelta && operation instanceof MoveOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.sourcePosition, 0 )
					} );
				} else if ( delta instanceof MergeDelta && operation instanceof MoveOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.movedRangeStart, 0 )
					} );
				} else if ( delta instanceof MoveDelta && operation instanceof MoveOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.movedRangeStart, operation.howMany )
					} );

					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromPositionAndShift( operation.sourcePosition, 0 )
					} );
				} else if ( delta instanceof AttributeDelta && operation instanceof AttributeOperation ) {
					ranges.push( {
						baseVersion,
						deltaVersion,
						range: ModelRange.createFromRange( operation.range )
					} );
				}
			}
		}

		let transformedRanges = convertRanges( ranges, this.editor.document.history );
		const mapper = this.editor.editing.mapper;
		const writer = this.editor.editing.view.writer;

		for ( let range of transformedRanges ) {
			if ( range.start.root.rootName == '$graveyard' ) {
				continue;
			}

			if ( range.isEmpty ) {
				let viewPos = mapper.toViewPosition( range.start );
				let viewElement = new ViewContainerElement( 'span', { 'class': 'selective-undo-pointer' } );
				writer.insert( viewPos, viewElement );

				this.previewElements.push( {
					type: 'pointer',
					position: viewPos,
					element: viewElement
				} );
			} else {
				let viewRange = mapper.toViewRange( range );
				let viewElement = new ViewAttributeElement( 'span', { 'class': 'selective-undo-range' } );
				let newRange = writer.wrap( viewRange, viewElement );

				this.previewElements.push( {
					type: 'range',
					range: newRange,
					element: viewElement
				} );
			}

			this.editor.editing.modelToView.convertSelection( this.editor.document.selection );
			this.editor.editing.view.render();
		}
	}

	_closePreview() {
		const writer = this.editor.editing.view.writer;

		for ( let item of this.previewElements.reverse() ) {
			if ( item.type == 'pointer' ) {
				let index = item.element.getIndex();
				let viewRange = ViewRange.createFromParentsAndOffsets( item.element.parent, index, item.element.parent, index + 1 );
				writer.remove( viewRange );
			} else {
				let parent = item.range.start.parent;
				let newRange = ViewRange.createFromParentsAndOffsets( parent, 0, parent, parent.getChildCount() );
				writer.unwrap( newRange, item.element );
			}

			this.editor.editing.modelToView.convertSelection( this.editor.document.selection );
			this.editor.editing.view.render();
		}

		this.previewElements = [];
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

function convertRanges( ranges, history ) {
	let transformedRanges = [];

	for ( let item of ranges ) {
		let range = item.range;
		let baseVersion = item.baseVersion;
		let deltaVersion = item.deltaVersion;
		let transformed = [ range ];

		for ( let historyItem of history.getHistoryItems( deltaVersion ) ) {
			let delta = historyItem.delta;

			for ( let operation of delta.operations ) {
				if ( operation.baseVersion <= baseVersion ) {
					continue;
				}

				for ( let i = 0; i < transformed.length; i++ ) {
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

					if ( result ) {
						transformed.splice( i, 1, ...result );

						i = i + result.length - 1;
					}
				}
			}
		}

		transformedRanges = transformedRanges.concat( transformed );
	}

	transformedRanges.sort( ( a, b ) => a.start.isBefore( b.start ) ? -1 : 1 );

	for ( let i = 1 ; i < transformedRanges.length; i++ ) {
		let a = transformedRanges[ i - 1 ];
		let b = transformedRanges[ i ];

		if ( a.end.isTouching( b.start ) ) {
			a.end = b.end;
			transformedRanges.splice( i, 1 );
			i--;
		}
	}

	return transformedRanges;
}
