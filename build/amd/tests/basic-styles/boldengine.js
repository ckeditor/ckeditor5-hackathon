define('tests', ['/ckeditor5/basic-styles/boldengine.js', '/tests/ckeditor5/_utils/virtualtesteditor.js', '/tests/engine/_utils/model.js', '/tests/engine/_utils/view.js', '/ckeditor5/command/attributecommand.js'], function (_boldengine, _virtualtesteditor, _model, _view, _attributecommand) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _boldengine2 = _interopRequireDefault(_boldengine);

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _attributecommand2 = _interopRequireDefault(_attributecommand);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('BoldEngine', () => {
		let editor, doc;

		beforeEach(() => {
			return _virtualtesteditor2.default.create({
				features: [_boldengine2.default]
			}).then(newEditor => {
				editor = newEditor;

				doc = editor.document;

				doc.schema.allow({ name: '$text', inside: '$root' });
			});
		});

		it('should be loaded', () => {
			expect(editor.plugins.get(_boldengine2.default)).to.be.instanceOf(_boldengine2.default);
		});

		it('should set proper schema rules', () => {
			expect(doc.schema.check({ name: '$inline', attributes: ['bold'] })).to.be.true;
		});

		describe('command', () => {
			it('should register bold command', () => {
				expect(editor.commands.has('bold')).to.be.true;

				const command = editor.commands.get('bold');

				expect(command).to.be.instanceOf(_attributecommand2.default);
				expect(command).to.have.property('attributeKey', 'bold');
			});
		});

		describe('data pipeline conversions', () => {
			it('should convert <strong> to bold attribute', () => {
				editor.setData('<strong>foo</strong>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text bold=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<strong>foo</strong>bar');
			});

			it('should convert <b> to bold attribute', () => {
				editor.setData('<b>foo</b>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text bold=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<strong>foo</strong>bar');
			});

			it('should convert font-weight:bold to bold attribute', () => {
				editor.setData('<span style="font-weight: bold;">foo</span>bar');

				expect((0, _model.getData)(doc, { withoutSelection: true })).to.equal('<$text bold=true>foo</$text>bar');
				expect(editor.getData()).to.equal('<strong>foo</strong>bar');
			});
		});

		describe('editing pipeline conversion', () => {
			it('should convert paragraph', () => {
				// Workaround for setting model data: https://github.com/ckeditor/ckeditor5-engine/issues/455
				editor.setData('<strong>foo</strong>bar');

				expect((0, _view.getData)(editor.editing.view, { withoutSelection: true })).to.equal('<strong>foo</strong>bar');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
