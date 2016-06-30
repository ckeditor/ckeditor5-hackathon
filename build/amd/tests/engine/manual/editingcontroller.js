define('tests', ['/ckeditor5/engine/editingcontroller.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/documentfragment.js', '/tests/engine/_utils/model.js', '/ckeditor5/engine/conversion/model-converter-builder.js'], function (_editingcontroller, _document, _position, _range, _documentfragment, _model, _modelConverterBuilder) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _editingcontroller2 = _interopRequireDefault(_editingcontroller);

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const model = new _document2.default();
	window.model = model;
	const modelRoot = model.createRoot();

	const editing = new _editingcontroller2.default(model);
	editing.createRoot(document.getElementById('editor'));

	model.schema.registerItem('paragraph', '$block');
	(0, _modelConverterBuilder2.default)(editing.modelToView).fromElement('paragraph').toElement('p');

	const modelData = new _documentfragment2.default((0, _model.parse)('<paragraph>foo</paragraph>' + '<paragraph></paragraph>' + '<paragraph>bar</paragraph>')._children);

	model.enqueueChanges(() => {
		model.batch().insert(_position2.default.createAt(modelRoot, 0), modelData);
		model.selection.addRange(_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 0, modelRoot.getChild(0), 0));
	});

	// enter
	editing.view.on('keydown', (evt, data) => {
		if (data.keyCode == 13) {
			model.enqueueChanges(() => {
				model.batch().split(model.selection.getFirstPosition());
			});
		}
	});

	// delete
	editing.view.on('keydown', (evt, data) => {
		if (data.keyCode == 46) {
			model.enqueueChanges(() => {
				model.batch().remove(_range2.default.createFromPositionAndShift(model.selection.getFirstPosition(), 1));
			});
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
