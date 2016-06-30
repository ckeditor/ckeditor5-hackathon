define('tests', ['/ckeditor5/utils/uid.js'], function (_uid) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _uid2 = _interopRequireDefault(_uid);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('uid', () => {
			it('should return different ids', () => {
				let id1 = (0, _uid2.default)();
				let id2 = (0, _uid2.default)();
				let id3 = (0, _uid2.default)();

				expect(id1).to.be.a('number');
				expect(id2).to.be.a('number').to.not.equal(id1).to.not.equal(id3);
				expect(id3).to.be.a('number').to.not.equal(id1).to.not.equal(id2);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
