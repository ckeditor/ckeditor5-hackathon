/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../../feature.js';
import EditingController from '../../engine/editingcontroller.js';
import BuildModelConverterFor from '../../engine/conversion/model-converter-builder.js';

import ViewContainerElement from '../../engine/view/containerelement.js';

export default class TableOfContents extends Feature {
	init() {
		const editor = this.editor;

		const tableOfContents = new EditingController( editor.document );
		tableOfContents.createRoot( document.getElementById( 'table-of-contents' ) );

		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'paragraph' )
		.toElement( new ViewContainerElement( 'p', { 'style': 'display:none' } ) );

		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading1' )
		.toElement( new ViewContainerElement( 'p', { 'class': 'header1' } ) );

		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading2' )
		.toElement( new ViewContainerElement( 'p', { 'class': 'header2' } ) );

		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading3' )
		.toElement( new ViewContainerElement( 'p', { 'class': 'header3' } ) );
	}
}
