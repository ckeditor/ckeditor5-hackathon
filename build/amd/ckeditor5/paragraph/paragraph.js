define(['exports', '../feature.js', '../engine/conversion/model-converter-builder.js', '../engine/conversion/view-converter-builder.js'], function (exports, _feature, _modelConverterBuilder, _viewConverterBuilder) {
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

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A paragraph feature for editor.
  * Introduces `<paragraph>` element in the model which renders as `<p>` in the DOM and data.
  *
  * @memberOf paragraph
  * @extends ckeditor5.Feature
  */
	class Paragraph extends _feature2.default {
		/**
   * @inheritDoc
   */
		init() {
			const editor = this.editor;
			const data = editor.data;
			const editing = editor.editing;

			// Schema.
			editor.document.schema.registerItem('paragraph', '$block');

			// Build converter from model to view for data and editing pipelines.
			(0, _modelConverterBuilder2.default)(data.modelToView, editing.modelToView).fromElement('paragraph').toElement('p');

			// Build converter from view to model for data pipeline.
			(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('p').toElement('paragraph');
		}
	}
	exports.default = Paragraph;
});