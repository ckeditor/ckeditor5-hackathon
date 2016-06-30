define(['exports', '../ui/editorui/boxed/boxededitorui.js', '../ui/editableui/editableui.js', '../ui/editableui/inline/inlineeditableuiview.js', '../ui/model.js', '../ui/bindings/toolbar.js', '../ui/stickytoolbar/stickytoolbarview.js'], function (exports, _boxededitorui, _editableui, _inlineeditableuiview, _model, _toolbar, _stickytoolbarview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _boxededitorui2 = _interopRequireDefault(_boxededitorui);

	var _editableui2 = _interopRequireDefault(_editableui);

	var _inlineeditableuiview2 = _interopRequireDefault(_inlineeditableuiview);

	var _model2 = _interopRequireDefault(_model);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _stickytoolbarview2 = _interopRequireDefault(_stickytoolbarview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Classic editor UI. Uses inline editable and sticky toolbar, all
  * enclosed in a boxed UI.
  *
  * @memberOf editor-classic
  * @extends ui.editorUI.boxed.BoxedEditorUI
  */
	class ClassicEditorUI extends _boxededitorui2.default {
		/**
   * Creates an instance of the classic editor UI.
   *
   * @param {ckeditor5.editor.Editor} editor
   */
		constructor(editor) {
			super(editor);

			/**
    * Toolbar controller.
    *
    * @readonly
    * @member {ui.toolbar.Toolbar} editor-classic.ClassicEditorUI#toolbar
    */
			this.toolbar = this._createToolbar();

			/**
    * Editable UI controller.
    *
    * @readonly
    * @member {ui.editableUI.EditableUI} editor-classic.ClassicEditorUI#editable
    */
			this.editable = this._createEditableUI();
		}

		/**
   * The editing host.
   *
   * @readonly
   * @type {HTMLElement}
   */
		get editableElement() {
			return this.editable.view.element;
		}

		/**
   * @inheritDoc
   */
		init() {
			if (this.editor.config.toolbar) {
				this.toolbar.addButtons(this.editor.config.toolbar);
			}

			return super.init();
		}

		/**
   * Creates editor sticky toolbar.
   *
   * @protected
   * @returns {ui.toolbar.Toolbar}
   */
		_createToolbar() {
			const editor = this.editor;

			const toolbarModel = new _model2.default();
			const toolbarView = new _stickytoolbarview2.default(toolbarModel, editor.locale);
			const toolbar = new _toolbar2.default(toolbarModel, toolbarView, editor);

			toolbarModel.bind('isActive').to(editor.editing.view.getRoot(), 'isFocused');

			this.add('top', toolbar);

			return toolbar;
		}

		/**
   * Creates editor main editable.
   *
   * @protected
   * @returns {ui.editableUI.EditableUI}
   */
		_createEditableUI() {
			const editor = this.editor;

			const editable = editor.editing.view.getRoot();
			const editableUI = new _editableui2.default(editor, editable);
			const editableUIView = new _inlineeditableuiview2.default(editableUI.viewModel, editor.locale);

			editableUI.view = editableUIView;

			this.add('main', editableUI);

			return editableUI;
		}
	}
	exports.default = ClassicEditorUI;
});