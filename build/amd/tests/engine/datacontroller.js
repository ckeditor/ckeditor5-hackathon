define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/datacontroller.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/ckeditor5/engine/conversion/view-converter-builder.js', '/ckeditor5/engine/conversion/model-converter-builder.js', '/tests/engine/_utils/model.js', '/ckeditor5/utils/count.js'], function (_document, _datacontroller, _htmldataprocessor, _viewConverterBuilder, _modelConverterBuilder, _model, _count) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _datacontroller2 = _interopRequireDefault(_datacontroller);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _viewConverterBuilder2 = _interopRequireDefault(_viewConverterBuilder);

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DataController', () => {
		let modelDocument, htmlDataProcessor, data, schema;

		beforeEach(() => {
			modelDocument = new _document2.default();
			modelDocument.createRoot('main');
			modelDocument.createRoot('title');

			htmlDataProcessor = new _htmldataprocessor2.default();

			data = new _datacontroller2.default(modelDocument, htmlDataProcessor);

			schema = modelDocument.schema;
		});

		describe('constructor', () => {
			it('works without data processor', () => {
				const data = new _datacontroller2.default(modelDocument);

				expect(data.processor).to.be.undefined;
			});
		});

		describe('parse', () => {
			it('should set text', () => {
				schema.allow({ name: '$text', inside: '$root' });
				const model = data.parse('<p>foo<b>bar</b></p>');

				expect((0, _model.stringify)(model)).to.equal('foobar');
			});

			it('should set paragraph', () => {
				schema.registerItem('paragraph', '$block');

				(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('p').toElement('paragraph');

				const model = data.parse('<p>foo<b>bar</b></p>');

				expect((0, _model.stringify)(model)).to.equal('<paragraph>foobar</paragraph>');
			});

			it('should set two paragraphs', () => {
				schema.registerItem('paragraph', '$block');

				(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('p').toElement('paragraph');

				const model = data.parse('<p>foo</p><p>bar</p>');

				expect((0, _model.stringify)(model)).to.equal('<paragraph>foo</paragraph><paragraph>bar</paragraph>');
			});

			it('should set paragraphs with bold', () => {
				schema.registerItem('paragraph', '$block');
				schema.allow({ name: '$text', attributes: ['bold'], inside: '$block' });

				(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('p').toElement('paragraph');
				(0, _viewConverterBuilder2.default)(data.viewToModel).fromElement('b').toAttribute('bold', true);

				const model = data.parse('<p>foo<b>bar</b></p>');

				expect((0, _model.stringify)(model)).to.equal('<paragraph>foo<$text bold=true>bar</$text></paragraph>');
			});
		});

		describe('set', () => {
			it('should set data to root', () => {
				schema.allow({ name: '$text', inside: '$root' });
				data.set('foo');

				expect((0, _model.getData)(modelDocument, { withoutSelection: true })).to.equal('foo');
			});

			it('should create a batch', () => {
				schema.allow({ name: '$text', inside: '$root' });
				data.set('foo');

				expect((0, _count2.default)(modelDocument.history.getDeltas())).to.equal(1);
			});

			it('should fire #changesDone', () => {
				const spy = sinon.spy();

				schema.allow({ name: '$text', inside: '$root' });
				modelDocument.on('changesDone', spy);

				data.set('foo');

				expect(spy.calledOnce).to.be.true;
			});

			it('should get root name as a parameter', () => {
				schema.allow({ name: '$text', inside: '$root' });
				data.set('foo', 'main');
				data.set('Bar', 'title');

				expect((0, _model.getData)(modelDocument, { withoutSelection: true, rootName: 'main' })).to.equal('foo');
				expect((0, _model.getData)(modelDocument, { withoutSelection: true, rootName: 'title' })).to.equal('Bar');

				expect((0, _count2.default)(modelDocument.history.getDeltas())).to.equal(2);
			});

			// This case was added when order of params was different and it really didn't work. Let's keep it
			// if anyone will ever try to change this.
			it('should allow setting empty data', () => {
				schema.allow({ name: '$text', inside: '$root' });

				data.set('foo', 'title');

				expect((0, _model.getData)(modelDocument, { withoutSelection: true, rootName: 'title' })).to.equal('foo');

				data.set('', 'title');

				expect((0, _model.getData)(modelDocument, { withoutSelection: true, rootName: 'title' })).to.equal('');
			});
		});

		describe('get', () => {
			it('should get paragraph with text', () => {
				(0, _model.setData)(modelDocument, '<paragraph>foo</paragraph>');

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');

				expect(data.get()).to.equal('<p>foo</p>');
			});

			it('should get empty paragraph', () => {
				(0, _model.setData)(modelDocument, '<paragraph></paragraph>');

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');

				expect(data.get()).to.equal('<p>&nbsp;</p>');
			});

			it('should get two paragraphs', () => {
				(0, _model.setData)(modelDocument, '<paragraph>foo</paragraph><paragraph>bar</paragraph>');

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');

				expect(data.get()).to.equal('<p>foo</p><p>bar</p>');
			});

			it('should get text directly in root', () => {
				(0, _model.setData)(modelDocument, 'foo');

				expect(data.get()).to.equal('foo');
			});

			it('should get paragraphs without bold', () => {
				(0, _model.setData)(modelDocument, '<paragraph>foo<$text bold=true>bar</$text></paragraph>');

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');

				expect(data.get()).to.equal('<p>foobar</p>');
			});

			it('should get paragraphs with bold', () => {
				(0, _model.setData)(modelDocument, '<paragraph>foo<$text bold=true>bar</$text></paragraph>');

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');
				(0, _modelConverterBuilder2.default)(data.modelToView).fromAttribute('bold').toElement('b');

				expect(data.get()).to.equal('<p>foo<b>bar</b></p>');
			});

			it('should get root name as a parameter', () => {
				(0, _model.setData)(modelDocument, '<paragraph>foo</paragraph>', { rootName: 'main' });
				(0, _model.setData)(modelDocument, 'Bar', { rootName: 'title' });

				(0, _modelConverterBuilder2.default)(data.modelToView).fromElement('paragraph').toElement('p');
				(0, _modelConverterBuilder2.default)(data.modelToView).fromAttribute('bold').toElement('b');

				expect(data.get()).to.equal('<p>foo</p>');
				expect(data.get('main')).to.equal('<p>foo</p>');
				expect(data.get('title')).to.equal('Bar');
			});
		});

		describe('destroy', () => {
			it('should be there for you', () => {
				// Should not throw.
				data.destroy();

				expect(data).to.respondTo('destroy');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
