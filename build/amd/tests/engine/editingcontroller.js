define('tests', ['/ckeditor5/engine/editingcontroller.js', '/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/mutationobserver.js', '/ckeditor5/engine/view/observer/selectionobserver.js', '/ckeditor5/engine/view/observer/focusobserver.js', '/ckeditor5/engine/view/observer/keyobserver.js', '/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/conversion/modelconversiondispatcher.js', '/ckeditor5/engine/conversion/model-converter-builder.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/utils/dom/createelement.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js'], function (_editingcontroller, _document, _mutationobserver, _selectionobserver, _focusobserver, _keyobserver, _mapper, _modelconversiondispatcher, _modelConverterBuilder, _document3, _position, _range, _documentfragment, _createelement, _model, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _editingcontroller2 = _interopRequireDefault(_editingcontroller);

	var _document2 = _interopRequireDefault(_document);

	var _mutationobserver2 = _interopRequireDefault(_mutationobserver);

	var _selectionobserver2 = _interopRequireDefault(_selectionobserver);

	var _focusobserver2 = _interopRequireDefault(_focusobserver);

	var _keyobserver2 = _interopRequireDefault(_keyobserver);

	var _mapper2 = _interopRequireDefault(_mapper);

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	var _document4 = _interopRequireDefault(_document3);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _createelement2 = _interopRequireDefault(_createelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EditingController', () => {
		describe('constructor', () => {
			let model, editing;

			beforeEach(() => {
				model = new _document4.default();
				editing = new _editingcontroller2.default(model);
			});

			it('should create controller with properties', () => {
				expect(editing).to.have.property('model').that.equals(model);
				expect(editing).to.have.property('view').that.is.instanceof(_document2.default);
				expect(editing).to.have.property('mapper').that.is.instanceof(_mapper2.default);
				expect(editing).to.have.property('modelToView').that.is.instanceof(_modelconversiondispatcher2.default);
			});

			it('should add observers', () => {
				expect(editing.view.getObserver(_mutationobserver2.default)).to.be.instanceof(_mutationobserver2.default);
				expect(editing.view.getObserver(_selectionobserver2.default)).to.be.instanceof(_selectionobserver2.default);
				expect(editing.view.getObserver(_focusobserver2.default)).to.be.instanceof(_focusobserver2.default);
				expect(editing.view.getObserver(_keyobserver2.default)).to.be.instanceof(_keyobserver2.default);
			});
		});

		describe('createRoot', () => {
			let model, modelRoot, editing;

			beforeEach(() => {
				model = new _document4.default();
				modelRoot = model.createRoot();
				model.createRoot('header');

				editing = new _editingcontroller2.default(model);
			});

			it('should create root', () => {
				const domRoot = (0, _createelement2.default)(document, 'div', null, (0, _createelement2.default)(document, 'p'));

				const viewRoot = editing.createRoot(domRoot);

				expect(viewRoot).to.equal(editing.view.getRoot());
				expect(domRoot).to.equal(editing.view.getDomRoot());

				expect(editing.view.domConverter.getCorrespondingDom(viewRoot)).to.equal(domRoot);
				expect(editing.view.renderer.markedChildren.has(viewRoot)).to.be.true;

				expect(editing.mapper.toModelElement(viewRoot)).to.equal(modelRoot);
				expect(editing.mapper.toViewElement(modelRoot)).to.equal(viewRoot);
			});

			it('should create root with given name', () => {
				const domRoot = (0, _createelement2.default)(document, 'div', null, (0, _createelement2.default)(document, 'p'));

				const viewRoot = editing.createRoot(domRoot, 'header');

				expect(viewRoot).to.equal(editing.view.getRoot('header'));
				expect(domRoot).to.equal(editing.view.getDomRoot('header'));

				expect(editing.view.domConverter.getCorrespondingDom(viewRoot)).to.equal(domRoot);
				expect(editing.view.renderer.markedChildren.has(viewRoot)).to.be.true;

				expect(editing.mapper.toModelElement(viewRoot)).to.equal(model.getRoot('header'));
				expect(editing.mapper.toViewElement(model.getRoot('header'))).to.equal(viewRoot);
			});

			it('should be possible to attach DOM element later', () => {
				const domRoot = (0, _createelement2.default)(document, 'div', null, (0, _createelement2.default)(document, 'p'));

				const viewRoot = editing.createRoot('div');

				expect(viewRoot).to.equal(editing.view.getRoot());
				expect(editing.view.getDomRoot()).to.be.undefined;

				editing.view.attachDomRoot(domRoot);

				expect(domRoot).to.equal(editing.view.getDomRoot());

				expect(editing.view.domConverter.getCorrespondingDom(viewRoot)).to.equal(domRoot);
				expect(editing.view.renderer.markedChildren.has(viewRoot)).to.be.true;

				expect(editing.mapper.toModelElement(viewRoot)).to.equal(modelRoot);
				expect(editing.mapper.toViewElement(modelRoot)).to.equal(viewRoot);
			});
		});

		describe('conversion', () => {
			let model, modelRoot, viewRoot, domRoot, editing;

			before(() => {
				model = new _document4.default();
				modelRoot = model.createRoot();

				editing = new _editingcontroller2.default(model);

				domRoot = document.getElementById('editor');
				viewRoot = editing.createRoot(domRoot);

				model.schema.registerItem('paragraph', '$block');
				(0, _modelConverterBuilder2.default)(editing.modelToView).fromElement('paragraph').toElement('p');
			});

			beforeEach(() => {
				// Note: The below code is highly overcomplicated due to #455.

				model.selection.removeAllRanges();
				modelRoot.removeChildren(0, modelRoot.getChildCount());

				viewRoot.removeChildren(0, viewRoot.getChildCount());

				const modelData = new _documentfragment2.default((0, _model.parse)('<paragraph>foo</paragraph>' + '<paragraph></paragraph>' + '<paragraph>bar</paragraph>')._children);

				model.enqueueChanges(() => {
					model.batch().insert(_position2.default.createAt(model.getRoot(), 0), modelData);
					model.selection.addRange(_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 1, modelRoot.getChild(0), 1));
				});
			});

			it('should convert insertion', () => {
				expect((0, _view.getData)(editing.view)).to.equal('<p>f{}oo</p><p></p><p>bar</p>');
			});

			it('should convert split', () => {
				expect((0, _view.getData)(editing.view)).to.equal('<p>f{}oo</p><p></p><p>bar</p>');

				model.enqueueChanges(() => {
					model.batch().split(model.selection.getFirstPosition());
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(1), 0, modelRoot.getChild(1), 0)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>f</p><p>{}oo</p><p></p><p>bar</p>');
			});

			it('should convert delete', () => {
				model.enqueueChanges(() => {
					model.batch().remove(_range2.default.createFromPositionAndShift(model.selection.getFirstPosition(), 1));
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(0), 1, modelRoot.getChild(0), 1)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>f{}o</p><p></p><p>bar</p>');
			});

			it('should convert selection from view to model', done => {
				editing.view.on('selectionChange', () => {
					setTimeout(() => {
						expect((0, _model.getData)(model)).to.equal('<paragraph>foo</paragraph>' + '<paragraph></paragraph>' + '<paragraph>b<selection>a</selection>r</paragraph>');
						done();
					});
				});

				editing.view.focusedEditable = viewRoot;

				const domSelection = document.getSelection();
				domSelection.removeAllRanges();
				const domBar = domRoot.childNodes[2].childNodes[0];
				const domRange = new Range();
				domRange.setStart(domBar, 1);
				domRange.setEnd(domBar, 2);
				domSelection.addRange(domRange);
			});

			it('should convert collapsed selection', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(2), 1, modelRoot.getChild(2), 1)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>foo</p><p></p><p>b{}ar</p>');
			});

			it('should convert not collapsed selection', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(2), 1, modelRoot.getChild(2), 2)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>foo</p><p></p><p>b{a}r</p>');
			});

			it('should clear previous selection', () => {
				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(2), 1, modelRoot.getChild(2), 1)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>foo</p><p></p><p>b{}ar</p>');

				model.enqueueChanges(() => {
					model.selection.setRanges([_range2.default.createFromParentsAndOffsets(modelRoot.getChild(2), 2, modelRoot.getChild(2), 2)]);
				});

				expect((0, _view.getData)(editing.view)).to.equal('<p>foo</p><p></p><p>ba{}r</p>');
			});
		});

		describe('destroy', () => {
			it('should remove listenters', () => {
				let model, editing;

				model = new _document4.default();
				model.createRoot();
				model.schema.registerItem('paragraph', '$block');

				editing = new _editingcontroller2.default(model);

				const spy = sinon.spy();

				editing.modelToView.on('insert:$element', spy);

				editing.destroy();

				model.enqueueChanges(() => {
					const modelData = (0, _model.parse)('<paragraph>foo</paragraph>').getChild(0);
					model.batch().insert(_position2.default.createAt(model.getRoot(), 0), modelData);
				});

				expect(spy.called).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
