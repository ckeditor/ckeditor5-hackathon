define('tests', ['/ckeditor5/utils/nth.js'], function (_nth) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _nth2 = _interopRequireDefault(_nth);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('nth', () => {
			it('should return 0th item', () => {
				expect((0, _nth2.default)(0, getIterator())).to.equal(11);
			});

			it('should return the last item', () => {
				expect((0, _nth2.default)(2, getIterator())).to.equal(33);
			});

			it('should return null if out of range (bottom)', () => {
				expect((0, _nth2.default)(-1, getIterator())).to.be.null;
			});

			it('should return null if out of range (top)', () => {
				expect((0, _nth2.default)(3, getIterator())).to.be.null;
			});

			it('should return null if iterator is empty', () => {
				expect((0, _nth2.default)(0, [])).to.be.null;
			});

			function* getIterator() {
				yield 11;
				yield 22;
				yield 33;
			}
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
