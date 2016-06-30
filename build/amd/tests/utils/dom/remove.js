define('tests', ['/ckeditor5/utils/dom/remove.js'], function (_remove) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: dom, browser-only */

	'use strict';

	var _remove2 = _interopRequireDefault(_remove);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('remove', () => {
		it('should remove element form parent', () => {
			const div = document.createElement('div');
			const p0 = document.createElement('p');
			const p1 = document.createElement('p');
			const p2 = document.createElement('p');

			div.appendChild(p0);
			div.appendChild(p1);
			div.appendChild(p2);

			(0, _remove2.default)(p1);

			expect(p1.parentNode).to.be.null;
			expect(div.childNodes.length).to.equal(2);
		});

		it('should do nothing if element has no parent', () => {
			const div = document.createElement('div');

			(0, _remove2.default)(div);

			expect(div.parentNode).to.be.null;
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
