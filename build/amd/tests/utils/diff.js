define('tests', ['/ckeditor5/utils/diff.js'], function (_diff) {
	/**
  * @license Copyright (c) 2003-20'INSERT'6, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _diff2 = _interopRequireDefault(_diff);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('diff', () => {
		it('should diff strings', () => {
			expect((0, _diff2.default)('aba', 'acca')).to.deep.equals(['EQUAL', 'INSERT', 'INSERT', 'DELETE', 'EQUAL']);
		});

		it('should diff arrays', () => {
			expect((0, _diff2.default)(Array.from('aba'), Array.from('acca'))).to.deep.equals(['EQUAL', 'INSERT', 'INSERT', 'DELETE', 'EQUAL']);
		});

		it('should reverse result if the second string is shorter', () => {
			expect((0, _diff2.default)('acca', 'aba')).to.deep.equals(['EQUAL', 'DELETE', 'DELETE', 'INSERT', 'EQUAL']);
		});

		it('should diff if strings are same', () => {
			expect((0, _diff2.default)('abc', 'abc')).to.deep.equals(['EQUAL', 'EQUAL', 'EQUAL']);
		});

		it('should diff if one string is empty', () => {
			expect((0, _diff2.default)('', 'abc')).to.deep.equals(['INSERT', 'INSERT', 'INSERT']);
		});

		it('should use custom comparator', () => {
			expect((0, _diff2.default)('aBc', 'abc')).to.deep.equals(['EQUAL', 'INSERT', 'DELETE', 'EQUAL']);
			expect((0, _diff2.default)('aBc', 'abc', (a, b) => a.toLowerCase() == b.toLowerCase())).to.deep.equals(['EQUAL', 'EQUAL', 'EQUAL']);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
