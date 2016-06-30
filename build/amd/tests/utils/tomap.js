define('tests', ['/ckeditor5/utils/tomap.js', '/ckeditor5/utils/count.js'], function (_tomap, _count) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _tomap2 = _interopRequireDefault(_tomap);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('toMap', () => {
			it('should create map from object', () => {
				const map = (0, _tomap2.default)({ foo: 1, bar: 2 });

				expect((0, _count2.default)(map)).to.equal(2);
				expect(map.get('foo')).to.equal(1);
				expect(map.get('bar')).to.equal(2);
			});

			it('should create map from iterator', () => {
				const map = (0, _tomap2.default)([['foo', 1], ['bar', 2]]);

				expect((0, _count2.default)(map)).to.equal(2);
				expect(map.get('foo')).to.equal(1);
				expect(map.get('bar')).to.equal(2);
			});

			it('should create map from another map', () => {
				const data = new Map([['foo', 1], ['bar', 2]]);

				const map = (0, _tomap2.default)(data);

				expect((0, _count2.default)(map)).to.equal(2);
				expect(map.get('foo')).to.equal(1);
				expect(map.get('bar')).to.equal(2);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
