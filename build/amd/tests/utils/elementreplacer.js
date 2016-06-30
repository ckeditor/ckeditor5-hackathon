define('tests', ['/ckeditor5/utils/elementreplacer.js'], function (_elementreplacer) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: browser-only */

	'use strict';

	var _elementreplacer2 = _interopRequireDefault(_elementreplacer);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ElementReplacer', () => {
		let replacer;
		let container, el1, el2, elNew1;

		beforeEach(() => {
			replacer = new _elementreplacer2.default();
			container = document.createElement('div');
			container.innerHTML = '<p>a</p><p>b</p>';

			el1 = container.firstChild;
			el2 = container.lastChild;

			elNew1 = document.createElement('h1');
		});

		describe('replace', () => {
			it('hides the given element', () => {
				replacer.replace(el1);

				expect(el1.style.display).to.equal('none');
			});

			it('replaces one element with another', () => {
				replacer.replace(el1, elNew1);

				expect(el1.style.display).to.equal('none');
				expect(elNew1.previousSibling).to.equal(el1);
			});
		});

		describe('restore', () => {
			it('reverts all changes', () => {
				replacer.replace(el1, elNew1);
				replacer.replace(el2);

				replacer.restore();

				expect(el1.style.display).to.equal('');
				expect(el2.style.display).to.equal('');
				expect(elNew1.parentNode).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
