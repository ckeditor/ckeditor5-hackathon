define('tests', ['/ckeditor5/utils/isiterable.js'], function (_isiterable) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _isiterable2 = _interopRequireDefault(_isiterable);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('utils', () => {
		describe('isIterable', () => {
			it('should be true for string', () => {
				let string = 'foo';

				expect((0, _isiterable2.default)(string)).to.be.true;
			});

			it('should be true for arrays', () => {
				let array = [1, 2, 3];

				expect((0, _isiterable2.default)(array)).to.be.true;
			});

			it('should be true for iterable classes', () => {
				class IterableClass {
					constructor() {
						this.array = [1, 2, 3];
					}

					[Symbol.iterator]() {
						return this.array[Symbol.iterator]();
					}
				}

				let instance = new IterableClass();

				expect((0, _isiterable2.default)(instance)).to.be.true;
			});

			it('should be false for not iterable objects', () => {
				let notIterable = { foo: 'bar' };

				expect((0, _isiterable2.default)(notIterable)).to.be.false;
			});

			it('should be false for undefined', () => {
				expect((0, _isiterable2.default)()).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
