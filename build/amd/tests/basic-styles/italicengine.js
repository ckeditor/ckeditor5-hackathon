define('tests', ['/ckeditor5/basic-styles/italicengine.js', '/tests/ckeditor5/_utils/virtualtesteditor.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js', '/ckeditor5/command/attributecommand.js'], function (_italicengine, _virtualtesteditor, _model, _view, _attributecommand) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _italicengine2 = _interopRequireDefault(_italicengine);

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _attributecommand2 = _interopRequireDefault(_attributecommand);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ItalicEngine', () => {
		let editor, doc;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_italicengine2.default]
			}).then(newEditor => {
				editor = newEditor;

				doc = editor.document;

				doc.schema.allow({ name: '$text', inside: '$root' });
			});
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_italicengine2.default)).to.be.instanceOf(_italicengine2.default);
		});

		it('should set proper schema rules', () => {
			expect(doc.schema.check({ name: '$inline', attributes: ['italic'] })).to.be.true;
		});

		describe('command', () => {
			it('should register italic command', () => {
				expect(editor.commands.has('italic')).to.be.true;

				const command = editor.commands.get('italic');

				expect(command).to.be.instanceOf(_attributecommand2.default);
				expect(command).to.have.property('attributeKey', 'italic');
			});
		});

		describe('data pipeline conversions', () => {
			it('should convert <em> to italic attribute', () => {
				editor.setData('<em>foo</em>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text italic=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<em>foo</em>bar');
			});

			it('should convert <i> to italic attribute', () => {
				editor.setData('<i>foo</i>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text italic=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<em>foo</em>bar');
			});

			it('should convert font-weight:italic to italic attribute', () => {
				editor.setData('<span style="font-style: italic;">foo</span>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text italic=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<em>foo</em>bar');
			});
		});

		describe('editing pipeline conversion', () => {
			it('should convert paragraph', () => {
				// Workaround for setting model data: https://github.com/ckeditor/ckeditor5-engine/issues/455
				editor.setData('<em>foo</em>bar');

				expect((0, _view.getData)(editor.editing.view, { withoutSelection: true })).to.equal('<em>foo</em>bar');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
