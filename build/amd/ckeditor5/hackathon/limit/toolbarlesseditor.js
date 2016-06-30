define(['exports', '../../editor/standardeditor.js', '../../engine/dataprocessor/htmldataprocessor.js', '../../ui/editorui/boxed/boxededitorui.js', '../../ui/editorui/boxed/boxededitoruiview.js', '../../ui/editableui/editableui.js', '../../ui/editableui/inline/inlineeditableuiview.js', '../../utils/elementreplacer.js'], function (exports, _standardeditor, _htmldataprocessor, _boxededitorui, _boxededitoruiview, _editableui, _inlineeditableuiview, _elementreplacer) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _standardeditor2 = _interopRequireDefault(_standardeditor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _boxededitorui2 = _interopRequireDefault(_boxededitorui);

	var _boxededitoruiview2 = _interopRequireDefault(_boxededitoruiview);

	var _editableui2 = _interopRequireDefault(_editableui);

	var _inlineeditableuiview2 = _interopRequireDefault(_inlineeditableuiview);

	var _elementreplacer2 = _interopRequireDefault(_elementreplacer);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Toolbarless editor. The editor with no toolbar.
  *
  * @extends ckeditor5.editor.StandardEditor
  */
	class ToolbarlessEditor extends _standardeditor2.default {
		/**
   * Creates an instance of the Toolbarless editor.
   *
   * @param {HTMLElement} element The DOM element that will be the source for the created editor.
   * The data will be loaded from it and loaded back to it once the editor is destroyed.
   * @param {Object} config The editor config.
   */
		constructor(element, config) {
			super(element, config);

			this.document.createRoot();

			this.editing.createRoot('div');

			this.data.processor = new _htmldataprocessor2.default();

			this.ui = this._createUI();

			/**
    * The element replacer instance used to hide editor element.
    *
    * @protected
    * @member {utils.ElementReplacer} ToolbarlessEditor#_elementReplacer
    */
			this._elementReplacer = new _elementreplacer2.default();
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

			return this.ui.destroy().then(() => super.destroy());
		}

		/**
   * Creates editor main editable.
   *
   * @protected
   * @returns {ui.editableUI.EditableUI}
   */
		_createUI() {
			const editable = new _editableui2.default(this, this.editing.view.getRoot());
			editable.view = new _inlineeditableuiview2.default(editable.viewModel, this.locale);

			const ui = new _boxededitorui2.default(this);
			ui.view = new _boxededitoruiview2.default(ui.viewModel, this.locale);
			ui.editable = editable;

			ui.add('main', editable);

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
		static create(element, config) {
			return new Promise(resolve => {
				const editor = new ToolbarlessEditor(element, config);

				resolve(editor.initPlugins().then(() => editor._elementReplacer.replace(element, editor.ui.view.element)).then(() => editor.ui.init()).then(() => editor.editing.view.attachDomRoot(editor.ui.editable.view.element)).then(() => editor.loadDataFromEditorElement()).then(() => editor));
			});
		}
	}
	exports.default = ToolbarlessEditor;
});