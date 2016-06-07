/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import StandardEditor from '../../editor/standardeditor.js';

import HtmlDataProcessor from '../../engine/dataprocessor/htmldataprocessor.js';

import BoxedEditorUI from '../../ui/editorui/boxed/boxededitorui.js';
import BoxedEditorUIView from '../../ui/editorui/boxed/boxededitoruiview.js';
import EditableUI from '../../ui/editableui/editableui.js';
import InlineEditableUIView from '../../ui/editableui/inline/inlineeditableuiview.js';

import ElementReplacer from '../../utils/elementreplacer.js';

/**
 * Toolbarless editor. The editor with no toolbar.
 *
 * @extends ckeditor5.editor.StandardEditor
 */
export default class ToolbarlessEditor extends StandardEditor {
	/**
	 * Creates an instance of the Toolbarless editor.
	 *
	 * @param {HTMLElement} element The DOM element that will be the source for the created editor.
	 * The data will be loaded from it and loaded back to it once the editor is destroyed.
	 * @param {Object} config The editor config.
	 */
	constructor( element, config ) {
		super( element, config );

		this.document.createRoot();

		this.editing.createRoot( 'div' );

		this.data.processor = new HtmlDataProcessor();

		this.ui = this._createUI();

		/**
		 * The element replacer instance used to hide editor element.
		 *
		 * @protected
		 * @member {utils.ElementReplacer} ToolbarlessEditor#_elementReplacer
		 */
		this._elementReplacer = new ElementReplacer();
	}

	/**
	 * Destroys the editor instance, releasing all resources used by it.
	 *
	 * Updates the original editor element with the data.
	 *
	 * @returns {Promise}
	 */
	destroy() {
		this.updateEditorElement();
		this._elementReplacer.restore();

		return this.ui.destroy()
			.then( () => super.destroy() );
	}

	/**
	 * Creates editor main editable.
	 *
	 * @protected
	 * @returns {ui.editableUI.EditableUI}
	 */
	_createUI() {
		const editable = new EditableUI( this, this.editing.view.getRoot() );
		editable.view = new InlineEditableUIView( editable.viewModel, this.locale );

		const ui = new BoxedEditorUI( this );
		ui.view = new BoxedEditorUIView( ui.viewModel, this.locale );
		ui.editable = editable;

		ui.add( 'main', editable );

		return ui;
	}

	/**
	 * Creates a toolbar-less editor instance.
	 *
	 *		ClassicEditor.create( document.querySelector( '#editor' ), {
	 *			features: [ 'delete', 'enter', 'typing', 'paragraph', 'undo', 'basic-styles/bold', 'basic-styles/italic' ]
	 *		} )
	 *		.then( editor => {
	 *			console.log( 'Editor was initialized', editor );
	 *		} )
	 *		.catch( err => {
	 *			console.error( err.stack );
	 *		} );
	 *
	 * @param {HTMLElement} element See {@link ckeditor5.editor.ClassicEditor#constructor}'s param.
	 * @param {Object} config See {@link ckeditor5.editor.ClassicEditor#constructor}'s param.
	 * @returns {Promise} Promise resolved once editor is ready.
	 * @returns {ckeditor5.editor.StandardEditor} return.editor The editor instance.
	 */
	static create( element, config ) {
		return new Promise( ( resolve ) => {
			const editor = new ToolbarlessEditor( element, config );

			resolve(
				editor.initPlugins()
					.then( () => editor._elementReplacer.replace( element, editor.ui.view.element ) )
					.then( () => editor.ui.init() )
					.then( () => editor.editing.view.attachDomRoot( editor.ui.editable.view.element ) )
					.then( () => editor.loadDataFromEditorElement() )
					.then( () => editor )
			);
		} );
	}
}
