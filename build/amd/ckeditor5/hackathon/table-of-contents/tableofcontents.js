define(['exports', '../../feature.js', '../../typing/typing.js', '../../engine/editingcontroller.js', '../../engine/conversion/model-converter-builder.js'], function (exports, _feature, _typing, _editingcontroller, _modelConverterBuilder) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _typing2 = _interopRequireDefault(_typing);

	var _editingcontroller2 = _interopRequireDefault(_editingcontroller);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class TableOfContents extends _feature2.default {
		init() {
			const editor = this.editor;

			const tableOfContents = new _editingcontroller2.default(editor.document);
			tableOfContents.createRoot(document.getElementById('table-of-contents'));

			(0, _modelConverterBuilder2.default)(tableOfContents.modelToView).fromElement('heading1').toElement('p.header1');
			(0, _modelConverterBuilder2.default)(tableOfContents.modelToView).fromElement('heading2').toElement('p.header2');
			(0, _modelConverterBuilder2.default)(tableOfContents.modelToView).fromElement('heading3').toElement('p.header3');

			const typing = new _typing2.default({
				editing: tableOfContents,
				document: editor.document,
				config: editor.config
			});
			typing.init();
		}
	}
	exports.default = TableOfContents;
});