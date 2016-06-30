define('tests', ['/ckeditor5/utils/mapsequal.js'], function (_mapsequal) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _mapsequal2 = _interopRequireDefault(_mapsequal);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('mapsEqual', () => {
			let mapA, mapB;

			beforeEach(() => {
				mapA = new Map();
				mapB = new Map();
			});

			it('should return true if maps have exactly same entries (order of adding does not matter)', () => {
				mapA.set('foo', 'bar');
				mapA.set('abc', 'xyz');

				mapB.set('abc', 'xyz');
				mapB.set('foo', 'bar');

				expect((0, _mapsequal2.default)(mapA, mapB)).to.be.true;
			});

			it('should return false if maps size is not the same', () => {
				mapA.set('foo', 'bar');
				mapA.set('abc', 'xyz');

				mapB.set('abc', 'xyz');

				expect((0, _mapsequal2.default)(mapA, mapB)).to.be.false;
			});

			it('should return false if maps entries are not exactly the same', () => {
				mapA.set('foo', 'bar');
				mapA.set('abc', 'xyz');

				mapB.set('foo', 'bar');
				mapB.set('xyz', 'abc');

				expect((0, _mapsequal2.default)(mapA, mapB)).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
