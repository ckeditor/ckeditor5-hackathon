define(['exports', '/ckeditor5/editor/standardeditor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/ckeditor5/ui/editorui/boxed/boxededitorui.js', '/ckeditor5/ui/editorui/boxed/boxededitoruiview.js'], function (exports, _standardeditor, _htmldataprocessor, _boxededitorui, _boxededitoruiview) {
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

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A simplified classic editor. Useful for testing features.
  *
  * @memberOf tests.ckeditor5._utils
  * @extends ckeditor5.editor.StandardEditor
  */
	class ClassicTestEditor extends _standardeditor2.default {
		/**
   * @inheritDoc
   */
		constructor(element, config) {
			super(element, config);

			this.document.createRoot();

			this.editing.createRoot('div');

			this.data.processor = new _htmldataprocessor2.default();

			this.ui = new _boxededitorui2.default(this);
			this.ui.view = new _boxededitoruiview2.default(this.ui.viewModel, this.locale);
		}

		/**
   * @inheritDoc
   */
		destroy() {
			return this.ui.destroy().then(() => super.destroy());
		}

		/**
   * @inheritDoc
   */
		static create(element, config) {
			return new Promise(resolve => {
				const editor = new this(element, config);

				resolve(editor.initPlugins().then(() => editor.ui.init()).then(() => editor.loadDataFromEditorElement()).then(() => editor));
			});
		}
	}
	exports.default = ClassicTestEditor;
});