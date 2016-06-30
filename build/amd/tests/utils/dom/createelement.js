define('tests', ['/ckeditor5/utils/dom/createelement.js'], function (_createelement) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: dom, browser-only */

	'use strict';

	var _createelement2 = _interopRequireDefault(_createelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('createElement', () => {
		it('should create element', () => {
			const p = (0, _createelement2.default)(document, 'p');

			expect(p.tagName.toLowerCase()).to.equal('p');
			expect(p.childNodes.length).to.equal(0);
		});

		it('should create element with attribute', () => {
			const p = (0, _createelement2.default)(document, 'p', { class: 'foo' });

			expect(p.tagName.toLowerCase()).to.equal('p');
			expect(p.childNodes.length).to.equal(0);
			expect(p.getAttribute('class')).to.equal('foo');
		});

		it('should create element with child text node', () => {
			const p = (0, _createelement2.default)(document, 'p', null, 'foo');

			expect(p.tagName.toLowerCase()).to.equal('p');
			expect(p.childNodes.length).to.equal(1);
			expect(p.childNodes[0].data).to.equal('foo');
		});

		it('should create ', () => {
			const p = (0, _createelement2.default)(document, 'p', null, ['foo', (0, _createelement2.default)(document, 'img')]);

			expect(p.tagName.toLowerCase()).to.equal('p');
			expect(p.childNodes.length).to.equal(2);
			expect(p.childNodes[0].data).to.equal('foo');
			expect(p.childNodes[1].tagName.toLowerCase()).to.equal('img');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
