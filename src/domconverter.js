/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

export default class DOMConverter {
	/**
	 * @param {HTMLDocument} document
	 * @result {Array}
	 */
	toArray( document ) {
		const parsedDocument = [];

		for ( let item of document.body.childNodes ) {
			const parsedElement = parseElement( item );
			parsedDocument.push( parsedElement );
		}

		return parsedDocument;
	}
}

/**
 * @param {HTMLElement} element
 * @returns {Map}
 */
function parseElement( element ) {
	const elementMap = new Map();
	const values = [];

	elementMap.set( 'name', element.tagName.toLocaleLowerCase() );
	elementMap.set( 'values', values );

	const childNodes = Array.from( element.childNodes )
		.filter( node => node instanceof Text );

	for ( let child of childNodes ) {
		// todo: is element (child) a block?

		for ( let nodeMap of parseText( child ) ) {
			values.push( nodeMap );
		}
	}

	return elementMap;
}

/**
 * @param {Text} text
 * @return {Map[]}
 */
function parseText( text ) {
	const regexp = /(.*)<\$text ([^>]+)>(.*)/gi;
	const result = regexp.exec( text.wholeText );

	if ( result === null ) {
		return [ buildTextMap( text.wholeText ) ];
	}

	const textMaps = [];

	if ( !!result[ 1 ] ) {
		textMaps.push( buildTextMap( result[ 1 ] ) );
	}

	textMaps.push(
		buildTextMap( result[ 3 ], result[ 2 ] )
	);

	return textMaps;
}

/**
 * @param {String} text
 * @param {String} attributesAsString
 */
function buildTextMap( text, attributesAsString = '' ) {
	const textMap = new Map();
	const attributesMap = new Map();

	textMap.set( 'name', '$text' );
	textMap.set( 'values', text );
	textMap.set( 'attributes', attributesMap );

	const attrs = attributesAsString
		.split( ' ' )
		.filter( item => !!item.trim().length )
		.map( item => item.split( '=' ) );

	for ( const [attrName, attrValue] of attrs ) {
		attributesMap.set( attrName, attrValue === 'true' ? true : attrValue );
	}

	return textMap;
}
