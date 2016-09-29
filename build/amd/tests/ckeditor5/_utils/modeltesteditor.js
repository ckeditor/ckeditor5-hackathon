define(['exports', '/ckeditor5/editor/editor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js'], function (exports, _editor, _htmldataprocessor) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _editor2 = _interopRequireDefault(_editor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A simple editor implementation with a functional model part of the engine (the document).
  * It contains a full data pipeline but no editing pipeline.
  *
  * Should work in Node.js. If not now, then in the future :).
  *
  * @memberOf tests.ckeditor5._utils
  */
	class ModelTestEditor extends _editor2.default {
		constructor(config) {
			super(config);

			this.document.createRoot();

			this.data.processor = new _htmldataprocessor2.default();
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
   * Creates a virtual, element-less editor instance.
   *
   * @param {Object} config See {@link ckeditor5.editor.StandardEditor}'s param.
   * @returns {Promise} Promise resolved once editor is ready.
   * @returns {ckeditor5.editor.VirtualTestEditor} return.editor The editor instance.
   */
		static create(config) {
			return new Promise(resolve => {
				const editor = new this(config);

				resolve(editor.initPlugins().then(() => editor));
			});
		}
	}
	exports.default = ModelTestEditor;
});