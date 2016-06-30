define(['exports', '../editor/standardeditor.js', '../engine/dataprocessor/htmldataprocessor.js', './classiceditorui.js', '../ui/editorui/boxed/boxededitoruiview.js', '../utils/elementreplacer.js'], function (exports, _standardeditor, _htmldataprocessor, _classiceditorui, _boxededitoruiview, _elementreplacer) {
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

	var _classiceditorui2 = _interopRequireDefault(_classiceditorui);

	var _boxededitoruiview2 = _interopRequireDefault(_boxededitoruiview);

	var _elementreplacer2 = _interopRequireDefault(_elementreplacer);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Classic editor. Uses inline editable and sticky toolbar, all
  * enclosed in a boxed UI.
  *
  * @memberOf editor-classic
  * @extends ckeditor5.editor.StandardEditor
  */
	class ClassicEditor extends _standardeditor2.default {
		/**
   * Creates an instance of the classic editor.
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

			this.ui = new _classiceditorui2.default(this);
			this.ui.view = new _boxededitoruiview2.default(this.ui.viewModel, this.locale);

			/**
    * The element replacer instance used to hide editor element.
    *
    * @protected
    * @member {utils.ElementReplacer} editor-classic.Classic#_elementReplacer
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
   * Creates a classic editor instance.
   *
   *		ClassicEditor.create( document.querySelector( '#editor' ), {
   *			features: [ 'delete', 'enter', 'typing', 'paragraph', 'undo', 'basic-styles/bold', 'basic-styles/italic' ],
   *			toolbar: [ 'bold', 'italic', 'undo', 'redo' ]
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
				const editor = new ClassicEditor(element, config);

				resolve(editor.initPlugins().then(() => editor._elementReplacer.replace(element, editor.ui.view.element)).then(() => editor.ui.init()).then(() => editor.editing.view.attachDomRoot(editor.ui.editableElement)).then(() => editor.loadDataFromEditorElement()).then(() => editor));
			});
		}
	}
	exports.default = ClassicEditor;
});