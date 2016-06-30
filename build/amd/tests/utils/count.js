define('tests', ['/ckeditor5/utils/count.js'], function (_count) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('count', () => {
			it('should returns number of editable items', () => {
				const totalNumber = (0, _count2.default)([1, 2, 3, 4, 5]);
				expect(totalNumber).to.equal(5);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
