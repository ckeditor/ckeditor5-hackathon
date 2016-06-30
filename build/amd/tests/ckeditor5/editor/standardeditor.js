define('tests', ['/ckeditor5/editor/standardeditor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/tests/engine/_utils/model.js', '/ckeditor5/engine/editingcontroller.js', '/ckeditor5/keystrokehandler.js', '/ckeditor5/feature.js'], function (_standardeditor, _htmldataprocessor, _model, _editingcontroller, _keystrokehandler, _feature) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editor, browser-only */

	'use strict';

	var _standardeditor2 = _interopRequireDefault(_standardeditor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _editingcontroller2 = _interopRequireDefault(_editingcontroller);

	var _keystrokehandler2 = _interopRequireDefault(_keystrokehandler);

	var _feature2 = _interopRequireDefault(_feature);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('StandardEditor', () => {
		let editorElement;

		beforeEach(() => {
			editorElement = document.createElement('div');
			document.body.appendChild(editorElement);
		});

		describe('constructor', () => {
			it('sets all properties', () => {
				const editor = new _standardeditor2.default(editorElement, { foo: 1 });

				expect(editor).to.have.property('element', editorElement);
				expect(editor.editing).to.be.instanceof(_editingcontroller2.default);
				expect(editor.keystrokes).to.be.instanceof(_keystrokehandler2.default);
			});

			it('sets config', () => {
				const editor = new _standardeditor2.default(editorElement, { foo: 1 });

				expect(editor.config.get('foo')).to.equal(1);
			});
		});

		describe('create', () => {
			it('initializes editor with plugins and config', () => {
				class FeatureFoo extends _feature2.default {}

				return _standardeditor2.default.create(editorElement, {
					foo: 1,
					features: [FeatureFoo]
				}).then(editor => {
					expect(editor).to.be.instanceof(_standardeditor2.default);

					expect(editor.config.get('foo')).to.equal(1);
					expect(editor).to.have.property('element', editorElement);

					expect(editor.plugins.get(FeatureFoo)).to.be.instanceof(FeatureFoo);
				});
			});
		});

		describe('setData', () => {
			let editor;

			beforeEach(() => {
				return _standardeditor2.default.create(editorElement).then(newEditor => {
					editor = newEditor;

					editor.data.processor = new _htmldataprocessor2.default();

					editor.document.schema.allow({ name: '$text', inside: '$root' });
				});
			});

			it('should set data of the first root', () => {
				editor.document.createRoot();
				editor.document.createRoot('secondRoot');

				editor.editing.createRoot('div');
				editor.editing.createRoot('div', 'secondRoot');

				editor.setData('foo');

				expect((0, _model.getData)(editor.document, { rootName: 'main', withoutSelection: true })).to.equal('foo');
			});
		});

		describe('getData', () => {
			let editor;

			beforeEach(() => {
				return _standardeditor2.default.create(editorElement).then(newEditor => {
					editor = newEditor;

					editor.data.processor = new _htmldataprocessor2.default();

					editor.document.schema.allow({ name: '$text', inside: '$root' });
				});
			});

			it('should set data of the first root', () => {
				editor.document.createRoot();
				editor.document.createRoot('secondRoot');

				(0, _model.setData)(editor.document, 'foo');

				expect(editor.getData()).to.equal('foo');
			});
		});

		describe('updateEditorElement', () => {
			it('sets data to editor element', () => {
				const editor = new _standardeditor2.default(editorElement);

				editor.data.get = () => '<p>foo</p>';

				editor.updateEditorElement();

				expect(editorElement.innerHTML).to.equal('<p>foo</p>');
			});
		});

		describe('loadDataFromEditorElement', () => {
			it('sets data to editor element', () => {
				const editor = new _standardeditor2.default(editorElement);

				sinon.stub(editor.data, 'set');
				editorElement.innerHTML = '<p>foo</p>';

				editor.loadDataFromEditorElement();

				expect(editor.data.set.calledWithExactly('<p>foo</p>')).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
