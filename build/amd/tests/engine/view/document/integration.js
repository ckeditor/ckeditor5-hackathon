define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/filler.js', '/ckeditor5/utils/dom/createelement.js'], function (_document, _element, _filler, _createelement) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _createelement2 = _interopRequireDefault(_createelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Document integration', () => {
		it('should remove content of the DOM', () => {
			const domDiv = (0, _createelement2.default)(document, 'div', { id: 'editor' }, [(0, _createelement2.default)(document, 'p'), (0, _createelement2.default)(document, 'p')]);

			const viewDocument = new _document2.default();
			viewDocument.createRoot(domDiv);
			viewDocument.render();

			expect(domDiv.childNodes.length).to.equal(1);
			expect((0, _filler.isBlockFiller)(domDiv.childNodes[0], _filler.BR_FILLER)).to.be.true;
		});

		it('should render changes in the Document', () => {
			const domDiv = document.createElement('div');

			const viewDocument = new _document2.default();
			viewDocument.createRoot(domDiv);

			viewDocument.getRoot().appendChildren(new _element2.default('p'));
			viewDocument.render();

			expect(domDiv.childNodes.length).to.equal(1);
			expect(domDiv.childNodes[0].tagName).to.equal('P');
		});

		it('should render attribute changes', () => {
			const domRoot = document.createElement('div');

			const viewDocument = new _document2.default();
			const viewRoot = viewDocument.createRoot(domRoot);

			const viewP = new _element2.default('p', { class: 'foo' });
			viewRoot.appendChildren(viewP);
			viewDocument.render();

			expect(domRoot.childNodes.length).to.equal(1);
			expect(domRoot.childNodes[0].getAttribute('class')).to.equal('foo');

			viewP.setAttribute('class', 'bar');
			viewDocument.render();

			expect(domRoot.childNodes.length).to.equal(1);
			expect(domRoot.childNodes[0].getAttribute('class')).to.equal('bar');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
