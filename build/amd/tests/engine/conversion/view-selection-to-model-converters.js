define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/selection.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/conversion/view-selection-to-model-converters.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js'], function (_document, _selection, _range, _document3, _mapper, _viewSelectionToModelConverters, _model, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _selection2 = _interopRequireDefault(_selection);

	var _range2 = _interopRequireDefault(_range);

	var _document4 = _interopRequireDefault(_document3);

	var _mapper2 = _interopRequireDefault(_mapper);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('convertSelectionChange', () => {
		let model, view, mapper, convertSelection, modelRoot, viewRoot;

		beforeEach(() => {
			model = new _document4.default();
			modelRoot = model.createRoot();
			model.schema.registerItem('paragraph', '$block');

			(0, _model.setData)(model, '<paragraph>foo</paragraph><paragraph>bar</paragraph>');

			view = new _document2.default();
			viewRoot = view.createRoot('div');

			(0, _view.setData)(view, '<p>foo</p><p>bar</p>');

			mapper = new _mapper2.default();
			mapper.bindElements(modelRoot, viewRoot);
			mapper.bindElements(modelRoot.getChild(0), viewRoot.getChild(0));
			mapper.bindElements(modelRoot.getChild(1), viewRoot.getChild(1));

			convertSelection = (0, _viewSelectionToModelConverters.convertSelectionChange)(model, mapper);
		});

		it('should convert collapsed selection', () => {
			const viewSelection = new _selection2.default();
			viewSelection.addRange(_range2.default.createFromParentsAndOffsets(viewRoot.getChild(0).getChild(0), 1, viewRoot.getChild(0).getChild(0), 1));

			convertSelection(null, { newSelection: viewSelection });

			expect((0, _model.getData)(model)).to.equals('<paragraph>f<selection />oo</paragraph><paragraph>bar</paragraph>');
		});

		it('should convert multi ranges selection', () => {
			const viewSelection = new _selection2.default();
			viewSelection.addRange(_range2.default.createFromParentsAndOffsets(viewRoot.getChild(0).getChild(0), 1, viewRoot.getChild(0).getChild(0), 2));
			viewSelection.addRange(_range2.default.createFromParentsAndOffsets(viewRoot.getChild(1).getChild(0), 1, viewRoot.getChild(1).getChild(0), 2));

			convertSelection(null, { newSelection: viewSelection });

			// Too bad getData shows only the first range.
			expect((0, _model.getData)(model)).to.equals('<paragraph>f<selection>o</selection>o</paragraph><paragraph>bar</paragraph>');

			const ranges = Array.from(model.selection.getRanges());
			expect(ranges.length).to.equals(2);

			expect(ranges[0].start.parent).to.equals(modelRoot.getChild(0));
			expect(ranges[0].start.offset).to.equals(1);
			expect(ranges[0].end.parent).to.equals(modelRoot.getChild(0));
			expect(ranges[0].end.offset).to.equals(2);

			expect(ranges[1].start.parent).to.equals(modelRoot.getChild(1));
			expect(ranges[1].start.offset).to.equals(1);
			expect(ranges[1].end.parent).to.equals(modelRoot.getChild(1));
			expect(ranges[1].end.offset).to.equals(2);
		});

		it('should convert revers selection', () => {
			const viewSelection = new _selection2.default();
			viewSelection.addRange(_range2.default.createFromParentsAndOffsets(viewRoot.getChild(0).getChild(0), 1, viewRoot.getChild(0).getChild(0), 2), true);

			convertSelection(null, { newSelection: viewSelection });

			// Too bad getData shows only the first range.
			expect((0, _model.getData)(model)).to.equals('<paragraph>f<selection backward>o</selection>o</paragraph><paragraph>bar</paragraph>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
