define('tests', ['/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/keyobserver.js', '/ckeditor5/engine/view/filler.js', '/ckeditor5/utils/keyboard.js', '/tests/engine/_utils/view.js'], function (_range, _document, _keyobserver, _filler, _keyboard, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _range2 = _interopRequireDefault(_range);

	var _document2 = _interopRequireDefault(_document);

	var _keyobserver2 = _interopRequireDefault(_keyobserver);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Document', () => {
		let viewDocument;

		beforeEach(() => {
			viewDocument = new _document2.default();

			viewDocument.addObserver(_keyobserver2.default);

			const viewRoot = viewDocument.createRoot(document.getElementById('editor'));

			document.getSelection().removeAllRanges();

			viewDocument.focusedEditable = viewRoot;
		});

		describe('jump over inline filler hack', () => {
			it('should jump over inline filler when left arrow is pressed after inline filler', () => {
				(0, _view.setData)(viewDocument, '<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');
				viewDocument.render();

				viewDocument.fire('keydown', { keyCode: _keyboard.keyCodes.arrowleft, domTarget: viewDocument.domRoots.get('main') });

				const domRange = document.getSelection().getRangeAt(0);
				expect((0, _filler.isInlineFiller)(domRange.startContainer)).to.be.true;
				expect(domRange.startOffset).to.equal(0);
				expect(domRange.collapsed).to.be.true;
			});

			it('should do nothing when another key is pressed', () => {
				(0, _view.setData)(viewDocument, '<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');
				viewDocument.render();

				viewDocument.fire('keydown', { keyCode: _keyboard.keyCodes.arrowright, domTarget: viewDocument.domRoots.get('main') });

				const domRange = document.getSelection().getRangeAt(0);
				expect((0, _filler.isInlineFiller)(domRange.startContainer)).to.be.true;
				expect(domRange.startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domRange.collapsed).to.be.true;
			});

			it('should do nothing if range is not collapsed', () => {
				(0, _view.setData)(viewDocument, '<container:p>foo<attribute:b>{x}</attribute:b>bar</container:p>');
				viewDocument.render();

				viewDocument.fire('keydown', { keyCode: _keyboard.keyCodes.arrowleft, domTarget: viewDocument.domRoots.get('main') });

				const domRange = document.getSelection().getRangeAt(0);
				expect(domRange.startContainer.data).to.equal('x');
				expect(domRange.startOffset).to.equal(0);
				expect(domRange.endContainer.data).to.equal('x');
				expect(domRange.endOffset).to.equal(1);
			});

			it('should do nothing if node does not start with filler', () => {
				(0, _view.setData)(viewDocument, '<container:p>foo<attribute:b>{}x</attribute:b>bar</container:p>');
				viewDocument.render();

				viewDocument.fire('keydown', { keyCode: _keyboard.keyCodes.arrowleft, domTarget: viewDocument.domRoots.get('main') });

				const domRange = document.getSelection().getRangeAt(0);
				expect(domRange.startContainer.data).to.equal('x');
				expect(domRange.startOffset).to.equal(0);
				expect(domRange.collapsed).to.be.true;
			});

			it('should do nothing if caret is not directly before filler', () => {
				(0, _view.setData)(viewDocument, '<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');
				viewDocument.render();

				// '<container:p>foo<attribute:b>x{}</attribute:b>bar</container:p>'
				const viewB = viewDocument.selection.getFirstPosition().parent;
				const viewTextX = (0, _view.parse)('x');
				viewB.appendChildren(viewTextX);
				viewDocument.selection.removeAllRanges();
				viewDocument.selection.addRange(_range2.default.createFromParentsAndOffsets(viewTextX, 1, viewTextX, 1));
				viewDocument.render();

				viewDocument.fire('keydown', { keyCode: _keyboard.keyCodes.arrowleft, domTarget: viewDocument.domRoots.get('main') });

				const domRange = document.getSelection().getRangeAt(0);
				expect((0, _filler.startsWithFiller)(domRange.startContainer)).to.be.true;
				expect(domRange.startOffset).to.equal(_filler.INLINE_FILLER_LENGTH + 1);
				expect(domRange.collapsed).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
