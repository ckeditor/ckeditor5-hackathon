define(['exports', '../feature.js', '../engine/conversion/model-converter-builder.js', '../engine/conversion/view-converter-builder.js', '../engine/view/attributeelement.js'], function (exports, _feature, _modelConverterBuilder, _viewConverterBuilder, _attributeelement) {
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

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class Bold extends _feature2.default {
		init() {
			const editor = this.editor;
			const data = editor.data;
			const editing = editor.editing;

			// Allow bold attribute on all inline nodes.
			editor.document.schema.allow({ name: '$inline', attributes: ['link'] });

			// Build converter from model to view for data and editing pipelines.
			(0, _modelConverterBuilder2.default)(data.modelToView, editing.modelToView).fromAttribute('link').toElement(href => new _attributeelement2.default('a', { href }));

			// Build converter from view to model for data pipeline.
			(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('a').toAttribute(viewElement => ({ key: 'link', value: viewElement.getAttribute('href') }));
		}
	}
	exports.default = Bold;
});