/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import Range from '../engine/model/range';
import Element from '../engine/model/element';
import TextProxy from '../engine/model/textproxy';

export default class Debugger extends Feature {
	/**
	 * @inheritDoc
	 */
	init() {
		this.debugElement = makeElement( 'div', 'ck-editor__code' );
		window.document.body.appendChild( this.debugElement );

		// Draw tree.
		this.listenTo( this.editor.document, 'change', () => {
			this.drawTree();
		} );
	}

	/**
	 * Prints the tree based on data model.
	 *
	 * @return {void}
	 */
	drawTree() {
		const editor = this.editor;
		const documentRoot = editor.document.getRoot();

		while ( this.debugElement.firstChild ) {
			this.debugElement.removeChild( this.debugElement.firstChild );
		}

		const tree = Range.createFromElement( documentRoot ).getWalker();

		const rootList = makeElement( 'ol' );
		const openRoot = makeElement( 'li', 'ck-editor__code-line' );
		const closeRoot = makeElement( 'li', 'ck-editor__code-line' );
		const openSpanRoot = makeElement( 'span', 'ck-editor__element' );
		const closeSpanRoot = makeElement( 'span', 'ck-editor__element' );

		openSpanRoot.appendChild( new Text( '<$root>' ) );
		closeSpanRoot.appendChild( new Text( '</$root>' ) );

		openRoot.appendChild( openSpanRoot );
		closeRoot.appendChild( closeSpanRoot );

		rootList.appendChild( openRoot );
		rootList.appendChild( closeRoot );

		let indent = 1;

		for ( let treeElement of tree ) {
			const listElement = makeElement( 'li', 'ck-editor__code-line' );

			if ( treeElement.type === 'ELEMENT_END' ) {
				indent -= 1;
			}

			const itemValue = makeElement( 'span' );
			let elementName;
			let elementContent;

			if ( treeElement.item instanceof Element ) {
				itemValue.classList.add( 'ck-editor__element' );

				elementName = treeElement.item.name;

				if ( treeElement.type === 'ELEMENT_START' ) {
					elementContent = '<' + elementName + '>';
				} else {
					elementContent = '</' + elementName + '>';
				}
			} else if ( treeElement.item instanceof TextProxy ) {
				itemValue.classList.add( 'ck-editor__text' );

				elementName = '$text';
				elementContent = treeElement.item.text;

				for ( let [attr, value] of treeElement.item.getAttributes() ) {
					const attribueSpan = makeElement(
						'span',
						'ck-editor__text-badge',
						`ck-editor__text-badge--${ attr }`
					);

					attribueSpan.appendChild( new Text( `${ attr }:${ value }` ) );
					listElement.appendChild( attribueSpan );
				}
			} else {
				elementName = 'UNKNOWN_ELEMENT';
				elementContent = '';
			}

			itemValue.appendChild( new Text( elementContent ) );

			listElement.insertBefore( itemValue, listElement.firstChild );
			listElement.insertBefore( new Text( ' '.repeat( 4 * indent ) ), itemValue );

			rootList.insertBefore( listElement, rootList.lastChild );

			if ( treeElement.type === 'ELEMENT_START' ) {
				indent += 1;
			}
		}

		this.debugElement.appendChild( rootList );
	}
}

/**
 * @param {String} elementName
 * @param {String} classList
 * @returns {Element}
 */
function makeElement( elementName, ...classList ) {
	const element = window.document.createElement( elementName );
	classList.forEach( className => element.classList.add( className ) );

	return element;
}
