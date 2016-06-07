/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import { stringify } from '/tests/engine/_utils/model.js';
import Feature from '../feature.js';
import ButtonController from '../ui/button/button.js';
import ButtonView from '../ui/button/buttonview.js';
import Model from '../ui/model.js';
import DebuggerCommand from './debuggercommand';
import DOMConverter from './domconverter';

export default class Debugger extends Feature {
	/**
	 * @inheritDoc
	 */
	init() {
		// todo: find better way to create element
		this.debugElement = makeElement( 'div', 'ck-editor__code' );
		this.domParser = new DOMParser();
		this.domConventer = new DOMConverter();

		const editor = this.editor;
		const doc = editor.document;
		const t = editor.t;

		const command = new DebuggerCommand( editor );

		editor.commands.set( 'debugger', command );

		this.debugElement.style.display = 'none';
		editor.ui.view.element.appendChild( this.debugElement );

		// Create button model.
		const buttonModel = new Model( {
			isEnabled: true,
			isOn: false,
			label: t( 'Debugger' ),
			iconAlign: 'LEFT'
		} );

		// Add debugger button to feature components.
		editor.ui.featureComponents.add( 'debugger', ButtonController, ButtonView, buttonModel );

		// Bind button model to command.
		buttonModel.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

		// Execute command.
		this.listenTo( buttonModel, 'execute', () => {
			editor.execute( 'debugger' );

			if ( command.value ) {
				this.drawTree();
				this.debugElement.style.display = 'block';
			} else {
				this.debugElement.style.display = 'none';
			}
		} );

		// Draw tree.
		this.listenTo( doc, 'change', () => {
			if ( !command.value ) {
				return;
			}

			this.drawTree();
		} );
	}

	/**
	 * Prints the tree based on data model.
	 *
	 * @return {void}
	 */
	drawTree() {
		const modelAsString = stringify( this.editor.document.getRoot() );
		const parsedDoc = this.domParser.parseFromString( modelAsString, 'text/html' );
		const convertedDoc = this.domConventer.toArray( parsedDoc );

		while ( this.debugElement.firstChild ) {
			this.debugElement.removeChild( this.debugElement.firstChild );
		}

		this.debugElement.appendChild( makeList( convertedDoc ) );
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

/**
 * @param {Map[]} mapTree
 * @param {HTMLElement|null} rootElement
 * @returns {HTMLElement}
 * @todo refactor!
 */
function makeList( mapTree, rootElement = null ) {
	if ( !rootElement ) {
		rootElement = makeElement( 'ul' );
	}

	for ( let item of mapTree.values() ) {
		let openElementList = makeElement( 'li', 'ck-editor--clickable' );
		let closeElementList = makeElement( 'li', 'ck-editor--non-clickable', 'js-ignore-folding' );
		let helperElementList = makeElement( 'li', 'ck-editor__list-helper' );
		const tagValueOpenElement = makeElement( 'span', 'ck-editor__code-element' );
		const elementName = item.get( 'name' );

		tagValueOpenElement.appendChild( new Text( elementName ) );
		openElementList.appendChild( new Text( '<' ) );
		openElementList.appendChild( tagValueOpenElement );
		openElementList.appendChild( new Text( '>' ) );

		const tagValueCloseElement = makeElement( 'span', 'ck-editor__code-element', 'ck-editor--non-clickable', 'js-ignore-folding' );
		tagValueCloseElement.appendChild( new Text( elementName ) );

		closeElementList.appendChild( new Text( '</' ) );
		closeElementList.appendChild( tagValueCloseElement );
		closeElementList.appendChild( new Text( '>' ) );

		if ( elementName !== '$text' ) {
			rootElement.appendChild( openElementList );
			rootElement.appendChild( makeList( item.get( 'values' ), openElementList ) );
			rootElement.appendChild( closeElementList );
			rootElement.appendChild( helperElementList );
		} else {
			let rootElementList = rootElement.querySelector( 'ul' );

			if ( !rootElementList ) {
				rootElementList = makeElement( 'ul' );
				rootElement.appendChild( rootElementList );
			}

			let textList = makeElement( 'ul', 'ck-editor--non-clickable', 'js-ignore-folding' );
			let textElementList = makeElement( 'li', 'ck-editor--non-clickable', 'js-ignore-folding', 'ck-editor__code-text' );

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
			rootElementList.appendChild( helperElementList );

			// todo: is `values` a block element?
			textElementList.appendChild( new Text( item.get( 'values' ) ) );
			textList.appendChild( textElementList );
		}

		openElementList.addEventListener( 'click', ( e ) => {
			if ( e.srcElement.classList.contains( 'js-ignore-folding' ) ) {
				return;
			}

			e.stopPropagation();
			e.currentTarget.classList.toggle( 'ck-editor__code-element--is-close' );
		} );
	}

	return rootElement;
}
