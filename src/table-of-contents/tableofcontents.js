/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../../feature.js';
import Typing from '../../typing/typing.js';
import EditingController from '../../engine/editingcontroller.js';
import BuildModelConverterFor from '../../engine/conversion/model-converter-builder.js';

export default class TableOfContents extends Feature {
	init() {
		const editor = this.editor;

		const tableOfContents = new EditingController( editor.document );
		tableOfContents.createRoot( document.getElementById( 'table-of-contents' ) );

		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading1' ).toElement( 'p.header1' );
		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading2' ).toElement( 'p.header2' );
		BuildModelConverterFor( tableOfContents.modelToView ).fromElement( 'heading3' ).toElement( 'p.header3' );

		const typing = new Typing( {
			editing: tableOfContents,
			document: editor.document,
			config: editor.config
		} );
		typing.init();
	}
}
