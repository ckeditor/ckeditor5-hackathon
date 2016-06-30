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

	const ITALIC = 'italic';

	class ItalicEngine extends _feature2.default {
		init() {
			const editor = this.editor;
			const data = editor.data;
			const editing = editor.editing;

			// Allow italic attribute on all inline nodes.
			editor.document.schema.allow({ name: '$inline', attributes: [ITALIC] });

			// Build converter from model to view for data and editing pipelines.
			(0, _modelConverterBuilder2.default)(data.modelToView, editing.modelToView).fromAttribute(ITALIC).toElement('em');

			// Build converter from view to model for data pipeline.
			(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('em').fromElement('i').fromAttribute('style', { 'font-style': 'italic' }).toAttribute(ITALIC, true);

			// Create italic command.
			editor.commands.set(ITALIC, new _attributecommand2.default(editor, ITALIC));
		}
	}
	exports.default = ItalicEngine;
});