define('tests', ['/ckeditor5/utils/comparearrays.js'], function (_comparearrays) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _comparearrays2 = _interopRequireDefault(_comparearrays);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('compareArrays', () => {
			it('should return SAME flag, when arrays are same', () => {
				let a = ['abc', 0, 3];
				let b = ['abc', 0, 3];

				let result = (0, _comparearrays2.default)(a, b);

				expect(result).to.equal('SAME');
			});

			it('should return PREFIX flag, when all n elements of first array are same as n first elements of the second array', () => {
				let a = ['abc', 0];
				let b = ['abc', 0, 3];

				let result = (0, _comparearrays2.default)(a, b);

				expect(result).to.equal('PREFIX');
			});

			it('should return EXTENSION flag, when n first elements of first array are same as all elements of the second array', () => {
				let a = ['abc', 0, 3];
				let b = ['abc', 0];

				let result = (0, _comparearrays2.default)(a, b);

				expect(result).to.equal('EXTENSION');
			});

			it('should return index on which arrays differ, when arrays are not the same', () => {
				let a = ['abc', 0, 3];
				let b = ['abc', 1, 3];

				let result = (0, _comparearrays2.default)(a, b);

				expect(result).to.equal(1);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
