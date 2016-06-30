define('tests', ['/ckeditor5/utils/dom/indexof.js'], function (_indexof) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: dom, browser-only */

	'use strict';

	var _indexof2 = _interopRequireDefault(_indexof);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('indexOf', () => {
		it('should return 0 if element has no parent', () => {
			const p = document.createElement('p');

			expect((0, _indexof2.default)(p)).to.equal(0);
		});

		it('should return index of the node in parent', () => {
			const div = document.createElement('div');
			const p0 = document.createElement('p');
			const p1 = document.createElement('p');
			const p2 = document.createElement('p');

			div.appendChild(p0);
			div.appendChild(p1);
			div.appendChild(p2);

			expect((0, _indexof2.default)(p0)).to.equal(0);
			expect((0, _indexof2.default)(p1)).to.equal(1);
			expect((0, _indexof2.default)(p2)).to.equal(2);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
