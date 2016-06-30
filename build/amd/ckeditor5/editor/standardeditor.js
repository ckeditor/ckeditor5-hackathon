define(['exports', './editor.js', '../keystrokehandler.js', '../engine/editingcontroller.js', '../utils/dom/getdatafromelement.js', '../utils/dom/setdatainelement.js'], function (exports, _editor, _keystrokehandler, _editingcontroller, _getdatafromelement, _setdatainelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _editor2 = _interopRequireDefault(_editor);

	var _keystrokehandler2 = _interopRequireDefault(_keystrokehandler);

	var _editingcontroller2 = _interopRequireDefault(_editingcontroller);

	var _getdatafromelement2 = _interopRequireDefault(_getdatafromelement);

	var _setdatainelement2 = _interopRequireDefault(_setdatainelement);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Class representing a typical browser-based editor. It handles a single source element and
  * uses {@link engine.EditingController}.
  *
  * @memberOf ckeditor5.editor
  */
	class StandardEditor extends _editor2.default {
		/**
   * Creates a new instance of the standard editor.
   *
   * @param {HTMLElement} element The DOM element that will be the source
   * for the created editor.
   * @param {Object} config The editor config.
   */
		constructor(element, config) {
			super(config);

			/**
    * The element on which the editor has been initialized.
    *
    * @readonly
    * @member {HTMLElement} ckeditor5.editor.StandardEditor#element
    */
			this.element = element;

			// Documented in Editor.
			this.editing = new _editingcontroller2.default(this.document);

			/**
    * Instance of the {@link ckeditor5.KeystrokeHandler}.
    *
    * @readonly
    * @member {engine.treecontroller.DataController} ckeditor5.editor.StandardEditor#keystrokes
    */
			this.keystrokes = new _keystrokehandler2.default(this);

			/**
    * Editor UI instance.
    *
    * This property is set by more specialized editor constructors. However, it's required
    * for features to work (their UI-related part will try to interact with editor UI),
    * so every editor class which is meant to work with default features should set this property.
    *
    * @readonly
    * @member {ui.editorUI.EditorUI} ckeditor5.editor.StandardEditor#ui
    */
		}

		/**
   * @inheritDoc
   */
		destroy() {
			return Promise.resolve().then(() => this.editing.destroy()).then(super.destroy());
		}

		/**
   * Sets the data in the editor's main root.
   *
   * @param {*} data The data to load.
   */
		setData(data) {
			this.data.set(data);
		}

		/**
   * Gets the data from the editor's main root.
   */
		getData() {
			return this.data.get();
		}

		/**
   * Updates the {@link ckeditor5.editor.StandardEditor#element editor element}'s content with the data.
   */
		updateEditorElement() {
			(0, _setdatainelement2.default)(this.element, this.getData());
		}

		/**
   * Loads the data from the {@link ckeditor5.editor.StandardEditor#element editor element} to the main root.
   */
		loadDataFromEditorElement() {
			this.setData((0, _getdatafromelement2.default)(this.element));
		}

		/**
   * Creates a standard editor instance.
   *
   * @param {HTMLElement} element See {@link ckeditor5.editor.StandardEditor}'s param.
   * @param {Object} config See {@link ckeditor5.editor.StandardEditor}'s param.
   * @returns {Promise} Promise resolved once editor is ready.
   * @returns {ckeditor5.editor.StandardEditor} return.editor The editor instance.
   */
		static create(element, config) {
			return new Promise(resolve => {
				const editor = new this(element, config);

				resolve(editor.initPlugins().then(() => editor));
			});
		}
	}
	exports.default = StandardEditor;
});