/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import DOMConventer from './domconventer';
import { stringify } from '/tests/engine/_utils/model.js';

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

/**
 * @param {Map[]} mapTree
 * @param {HTMLElement|null} rootElement
 * @returns {HTMLElement}
 */
function makeList( mapTree, rootElement = null ) {
	if ( !rootElement ) {
		rootElement = makeElement( 'ul' );
	}

	for ( let item of mapTree.values() ) {
		const elementName = item.get( 'name' );
		let openElementList = makeElement( 'li' );
		let closeElementList = makeElement( 'li', 'js-ignore-folding' );

		openElementList.addEventListener( 'click', ( e ) => {
			if ( e.srcElement.classList.contains( 'js-ignore-folding' ) ) {
				return;
			}

			e.stopPropagation();
			e.currentTarget.classList.toggle( 'ck-editor__code-element--is-close' );
		} );

		const tagValueOpenElement = makeElement( 'span', 'ck-editor__code-element' );
		tagValueOpenElement.appendChild( new Text( elementName ) );

		openElementList.appendChild( new Text( '<' ) );
		openElementList.appendChild( tagValueOpenElement );
		openElementList.appendChild( new Text( '>' ) );

		const tagValueCloseElement = makeElement( 'span', 'ck-editor__code-element' );
		tagValueCloseElement.appendChild( new Text( elementName ) );

		closeElementList.appendChild( new Text( '</' ) );
		closeElementList.appendChild( tagValueCloseElement );
		closeElementList.appendChild( new Text( '>' ) );

		if ( elementName !== '$text' ) {
			rootElement.appendChild( openElementList );
			rootElement.appendChild( makeList( item.get( 'values' ), openElementList ) );
			rootElement.appendChild( closeElementList );
		} else {
			let rootElementList = rootElement.querySelector( 'ul' );

			if ( !rootElementList ) {
				rootElementList = makeElement( 'ul' );
				rootElement.appendChild( rootElementList );
			}

			let textList = makeElement( 'ul', 'js-ignore-folding' );
			let textElementList = makeElement( 'li', 'js-ignore-folding', 'ck-editor__code-text' );

			for ( let [attrName, attrValue] of item.get( 'attributes' ).entries() ) {
				openElementList.insertBefore( new Text( ' ' ), openElementList.lastChild );

				const attrNameElement = makeElement( 'span', 'ck-editor__code-attribute-name' );
				attrNameElement.appendChild( new Text( attrName ) );

				const attrValueElement = makeElement( 'span', 'ck-editor__code-attribute-value' );
				attrValueElement.appendChild( new Text( attrValue.toString() ) );

				openElementList.insertBefore( new Text( ' ' ), openElementList.lastChild );
				openElementList.insertBefore( attrNameElement, openElementList.lastChild );
				openElementList.insertBefore( new Text( '=' ), openElementList.lastChild );
				openElementList.insertBefore( attrValueElement, openElementList.lastChild );
			}

			rootElementList.appendChild( openElementList );
			openElementList.appendChild( textList );
			rootElementList.appendChild( closeElementList );

			// todo: is `values` a block element?
			textElementList.appendChild( new Text( item.get( 'values' ) ) );
			textList.appendChild( textElementList );
		}
	}

	return rootElement;
}

/**
 * @memberOf debugger
 * @extends ckeditor5.Feature
 */
export default class Debugger extends Feature {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const domParser = new DOMParser();
		const domConventer = new DOMConventer();

		// todo: find better way to create element
		const debugElement = window.document.createElement( 'div' );
		editor.ui.view.element.appendChild( debugElement );

		debugElement.classList.add( 'ck-editor__code' );

		editor.document.on( 'change', () => {
			editor.document.enqueueChanges( () => {
				const modelAsString = stringify( editor.document.getRoot() );
				const parsedDoc = domParser.parseFromString( modelAsString, 'text/html' );
				const convertedDoc = domConventer.toArray( parsedDoc );

				while ( debugElement.firstChild ) {
					debugElement.removeChild( debugElement.firstChild );
				}

				debugElement.appendChild( makeList( convertedDoc ) );
			} );
		} );
	}
}
