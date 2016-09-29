define(['exports', '../controller.js', '../model.js'], function (exports, _controller, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _controller2 = _interopRequireDefault(_controller);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @memberOf ui.editableUI
  * @extends ui.Controller
  */
	class EditableUI extends _controller2.default {
		/**
   * Creates a new instance of the Editable class.
   *
   * @param {ckeditor5.Editor} editor The editor instance.
   * @param {engine.view.RootEditableElement} editable The editable element.
   */
		constructor(editor, editable) {
			super();

			/**
    * The editor instance.
    *
    * @readonly
    * @member {ckeditor5.Editor} ui.editableUI.EditableUI#editor
    */
			this.editor = editor;

			/**
    * The model for the view.
    *
    * @readonly
    * @member {ui.Model} ui.editableUI.EditableUI#viewModel
    */
			this.viewModel = new _model2.default();

			this.viewModel.bind('isReadOnly', 'isFocused').to(editable);
			this.viewModel.set('name', editable.rootName);
		}
	}
	exports.default = EditableUI;
});