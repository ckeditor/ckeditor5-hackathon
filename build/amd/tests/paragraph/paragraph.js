define('tests', ['/ckeditor5/paragraph/paragraph.js', '/tests/ckeditor5/_utils/virtualtesteditor.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js'], function (_paragraph, _virtualtesteditor, _model, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _paragraph2 = _interopRequireDefault(_paragraph);

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Paragraph feature', () => {
		let editor, doc;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_paragraph2.default]
			}).then(newEditor => {
				editor = newEditor;
				doc = editor.document;
			});
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_paragraph2.default)).to.be.instanceOf(_paragraph2.default);
		});

		it('should set proper schema rules', () => {
			expect(doc.schema.hasItem('paragraph')).to.be.true;
			expect(doc.schema.check({ name: 'paragraph', inside: '$root' })).to.be.true;
			expect(doc.schema.check({ name: '$inline', inside: 'paragraph' })).to.be.true;
		});

		describe('data pipeline conversions', () => {
			it('should convert paragraph', () => {
				editor.setData('<p>foobar</p>');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<paragraph>foobar</paragraph>');
				expect(editor.getData()).to.equal('<p>foobar</p>');
			});

			it('should convert paragraph only', () => {
				editor.setData('<p>foo<b>baz</b>bar</p>');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<paragraph>foobazbar</paragraph>');
				expect(editor.getData()).to.equal('<p>foobazbar</p>');
			});

			it('should convert multiple paragraphs', () => {
				editor.setData('<p>foo</p><p>baz</p>');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<paragraph>foo</paragraph><paragraph>baz</paragraph>');
				expect(editor.getData()).to.equal('<p>foo</p><p>baz</p>');
			});
		});

		describe('editing pipeline conversion', () => {
			it('should convert paragraph', () => {
				// Workaround for setting model data: https://github.com/ckeditor/ckeditor5-engine/issues/455
				editor.setData('<p>foo</p><p>bar</p>');

				expect((0, _view.getData)(editor.editing.view, { withoutSelection: true })).to.equal('<p>foo</p><p>bar</p>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
