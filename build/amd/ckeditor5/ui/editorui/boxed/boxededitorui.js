define(['exports', '../../../ui/editorui/editorui.js', '../../../ui/controllercollection.js'], function (exports, _editorui, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _editorui2 = _interopRequireDefault(_editorui);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Boxed editor UI. The class representing classic editor interface, which contains of a toolbar and editable are,
  * closed within a box.
  *
  * @member ui.editorUI.boxed
  * @extends ui.editorUI.EditorUI
  */
	class BoxedEditorUI extends _editorui2.default {
		/**
   * Creates a BoxedEditorUI instance.
   *
   * @param {ckeditor5.Editor} editor
   */
		constructor(editor) {
			super(editor);

			this.collections.add(new _controllercollection2.default('top'));
			this.collections.add(new _controllercollection2.default('main'));

			const config = editor.config;

			/**
    * The editor's width. Defaults to {@link ckeditor5.editor.config.ui.width}.
    *
    * Note: a specific creator that was used must support this setting.
    *
    * @observable
    * @property {Number} width
    */
			this.set('width', config.get('ui.width'));

			/**
    * The editor's height. Defaults to {@link ckeditor5.editor.config.ui.height}.
    *
    * Note: a specific creator that was used must support this setting.
    *
    * @observable
    * @property {Number} height
    */
			this.set('height', config.get('ui.height'));
		}

		/**
   * @readonly
   * @property {ui.Model} viewModel
   */
		get viewModel() {
			return this;
		}
	}
	exports.default = BoxedEditorUI;
});