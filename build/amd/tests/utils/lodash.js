define('tests', ['/ckeditor5/utils/lib/lodash/extend.js'], function (_extend) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _extend2 = _interopRequireDefault(_extend);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('extend()', () => {
			// Properties of the subsequent objects should override properties of the preceding objects. This is critical for
			// CKEditor so we keep this test to ensure that Lo-Dash (or whatever) implements it in the way we need it.
			it('should extend by several params in the correct order', () => {
				let target = {
					a: 0,
					b: 0
				};

				let ext1 = {
					b: 1,
					c: 1
				};

				let ext2 = {
					c: 2,
					d: 2
				};

				(0, _extend2.default)(target, ext1, ext2);

				expect(target).to.have.property('a').to.equal(0);
				expect(target).to.have.property('b').to.equal(1);
				expect(target).to.have.property('c').to.equal(2);
				expect(target).to.have.property('d').to.equal(2);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
