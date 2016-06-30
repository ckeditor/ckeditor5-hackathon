define('tests', ['/ckeditor5/utils/spy.js'], function (_spy) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _spy2 = _interopRequireDefault(_spy);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('spy', () => {
			it('should not have `called` after creation', () => {
				let fn = (0, _spy2.default)();

				expect(fn.called).to.not.be.true;
			});

			it('should register calls', () => {
				let fn1 = (0, _spy2.default)();
				let fn2 = (0, _spy2.default)();

				fn1();

				expect(fn1.called).to.be.true;
				expect(fn2.called).to.not.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
