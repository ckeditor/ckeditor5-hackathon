define('tests', ['/tests/ckeditor5/_utils/modeltesteditor.js', '/ckeditor5/delete/deletecommand.js', '/tests/engine/_utils/model.js'], function (_modeltesteditor, _deletecommand, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _modeltesteditor2 = _interopRequireDefault(_modeltesteditor);

	var _deletecommand2 = _interopRequireDefault(_deletecommand);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DeleteCommand', () => {
		let editor, doc;

		beforeEach(() => {
			return _modeltesteditor2.default.create().then(newEditor => {
				editor = newEditor;
				doc = editor.document;

				const command = new _deletecommand2.default(editor, 'BACKWARD');
				editor.commands.set('delete', command);

				doc.schema.registerItem('p', '$block');
			});
		});

		it('has direction', () => {
			const command = new _deletecommand2.default(editor, 'FORWARD');

			expect(command).to.have.property('direction', 'FORWARD');
		});

		describe('execute', () => {
			it('uses enqueueChanges', () => {
				const spy = sinon.spy(doc, 'enqueueChanges');

				(0, _model.setData)(doc, '<p>foo<selection />bar</p>');

				editor.execute('delete');

				expect(spy.calledOnce).to.be.true;
			});

			it('deletes previous character when selection is collapsed', () => {
				(0, _model.setData)(doc, '<p>foo<selection />bar</p>');

				editor.execute('delete');

				expect((0, _model.getData)(doc, { selection: true })).to.equal('<p>fo<selection />bar</p>');
			});

			it('deletes selection contents', () => {
				(0, _model.setData)(doc, '<p>fo<selection>ob</selection>ar</p>');

				editor.execute('delete');

				expect((0, _model.getData)(doc, { selection: true })).to.equal('<p>fo<selection />ar</p>');
			});

			it('merges elements', () => {
				(0, _model.setData)(doc, '<p>foo</p><p><selection />bar</p>');

				editor.execute('delete');

				expect((0, _model.getData)(doc, { selection: true })).to.equal('<p>foo<selection />bar</p>');
			});

			it('does not try to delete when selection is at the boundary', () => {
				const spy = sinon.spy();

				doc.composer.on('deleteContents', spy);
				(0, _model.setData)(doc, '<p><selection />foo</p>');

				editor.execute('delete');

				expect((0, _model.getData)(doc, { selection: true })).to.equal('<p><selection />foo</p>');
				expect(spy.callCount).to.equal(0);
			});

			it('passes options to modifySelection', () => {
				const spy = sinon.spy();

				doc.composer.on('modifySelection', spy);
				(0, _model.setData)(doc, '<p>foo<selection />bar</p>');

				editor.commands.get('delete').direction = 'FORWARD';

				editor.execute('delete', { unit: 'WORD' });

				expect(spy.callCount).to.equal(1);

				const modifyOpts = spy.args[0][1].options;
				expect(modifyOpts).to.have.property('direction', 'FORWARD');
				expect(modifyOpts).to.have.property('unit', 'WORD');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
