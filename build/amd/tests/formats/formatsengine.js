define('tests', ['/ckeditor5/formats/formatsengine.js', '/ckeditor5/paragraph/paragraph.js', '/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/formats/formatscommand.js', '/tests/engine/_utils/model.js'], function (_formatsengine, _paragraph, _virtualtesteditor, _formatscommand, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _formatsengine2 = _interopRequireDefault(_formatsengine);

	var _paragraph2 = _interopRequireDefault(_paragraph);

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _formatscommand2 = _interopRequireDefault(_formatscommand);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('FormatsEngine', () => {
		let editor, document;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_formatsengine2.default]
			}).then(newEditor => {
				editor = newEditor;
				document = editor.document;
			});
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_formatsengine2.default)).to.be.instanceOf(_formatsengine2.default);
		});

		it('should load paragraph feature', () => {
			expect(editor.plugins.get(_paragraph2.default)).to.be.instanceOf(_paragraph2.default);
		});

		it('should set proper schema rules', () => {
			expect(document.schema.hasItem('heading1')).to.be.true;
			expect(document.schema.hasItem('heading2')).to.be.true;
			expect(document.schema.hasItem('heading3')).to.be.true;

			expect(document.schema.check({ name: 'heading1', inside: '$root' })).to.be.true;
			expect(document.schema.check({ name: '$inline', inside: 'heading1' })).to.be.true;

			expect(document.schema.check({ name: 'heading2', inside: '$root' })).to.be.true;
			expect(document.schema.check({ name: '$inline', inside: 'heading2' })).to.be.true;

			expect(document.schema.check({ name: 'heading3', inside: '$root' })).to.be.true;
			expect(document.schema.check({ name: '$inline', inside: 'heading3' })).to.be.true;
		});

		it('should register format command', () => {
			expect(editor.commands.has('format')).to.be.true;
			const command = editor.commands.get('format');

			expect(command).to.be.instanceOf(_formatscommand2.default);
		});

		it('should convert heading1', () => {
			editor.setData('<h2>foobar</h2>');

			expect((0, _model.getData)(document, { withoutSelection: true })).to.equal('<heading1>foobar</heading1>');
			expect(editor.getData()).to.equal('<h2>foobar</h2>');
		});

		it('should convert heading2', () => {
			editor.setData('<h3>foobar</h3>');

			expect((0, _model.getData)(document, { withoutSelection: true })).to.equal('<heading2>foobar</heading2>');
			expect(editor.getData()).to.equal('<h3>foobar</h3>');
		});

		it('should convert heading3', () => {
			editor.setData('<h4>foobar</h4>');

			expect((0, _model.getData)(document, { withoutSelection: true })).to.equal('<heading3>foobar</heading3>');
			expect(editor.getData()).to.equal('<h4>foobar</h4>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
