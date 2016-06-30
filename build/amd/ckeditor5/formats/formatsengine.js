define(['exports', '../feature.js', '../engine/conversion/model-converter-builder.js', '../engine/conversion/view-converter-builder.js', '../paragraph/paragraph.js', './formatscommand.js'], function (exports, _feature, _modelConverterBuilder, _viewConverterBuilder, _paragraph, _formatscommand) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	var _viewConverterBuilder2 = _interopRequireDefault(_viewConverterBuilder);

	var _paragraph2 = _interopRequireDefault(_paragraph);

	var _formatscommand2 = _interopRequireDefault(_formatscommand);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const formats = [{ id: 'paragraph', viewElement: 'p', label: 'Paragraph' }, { id: 'heading1', viewElement: 'h2', label: 'Heading 1' }, { id: 'heading2', viewElement: 'h3', label: 'Heading 2' }, { id: 'heading3', viewElement: 'h4', label: 'Heading 3' }];

	class FormatsEngine extends _feature2.default {
		static get requires() {
			return [_paragraph2.default];
		}

		init() {
			const editor = this.editor;
			const data = editor.data;
			const editing = editor.editing;

			for (let format of formats) {
				// Skip paragraph - it is defined in required Paragraph feature.
				if (format.id !== 'paragraph') {
					// Schema.
					editor.document.schema.registerItem(format.id, '$block');

					// Build converter from model to view for data and editing pipelines.
					(0, _modelConverterBuilder2.default)(data.modelToView, editing.modelToView).fromElement(format.id).toElement(format.viewElement);

					// Build converter from view to model for data pipeline.
					(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement(format.viewElement).toElement(format.id);
				}
			}

			// Register command.
			const command = new _formatscommand2.default(editor, formats);
			editor.commands.set('format', command);
		}
	}
	exports.default = FormatsEngine;
});