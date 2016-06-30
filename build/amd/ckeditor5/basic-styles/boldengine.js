define(['exports', '../feature.js', '../engine/conversion/model-converter-builder.js', '../engine/conversion/view-converter-builder.js', '../command/attributecommand.js'], function (exports, _feature, _modelConverterBuilder, _viewConverterBuilder, _attributecommand) {
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

	var _attributecommand2 = _interopRequireDefault(_attributecommand);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const BOLD = 'bold';

	class BoldEngine extends _feature2.default {
		init() {
			const editor = this.editor;
			const data = editor.data;
			const editing = editor.editing;

			// Allow bold attribute on all inline nodes.
			editor.document.schema.allow({ name: '$inline', attributes: [BOLD] });

			// Build converter from model to view for data and editing pipelines.
			(0, _modelConverterBuilder2.default)(data.modelToView, editing.modelToView).fromAttribute(BOLD).toElement('strong');

			// Build converter from view to model for data pipeline.
			(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('strong').fromElement('b').fromAttribute('style', { 'font-weight': 'bold' }).toAttribute(BOLD, true);

			// Create bold command.
			editor.commands.set(BOLD, new _attributecommand2.default(editor, BOLD));
		}
	}
	exports.default = BoldEngine;
});