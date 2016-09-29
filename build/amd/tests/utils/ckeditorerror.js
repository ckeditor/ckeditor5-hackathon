define('tests', ['/ckeditor5/utils/ckeditorerror.js'], function (_ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('CKEditorError', () => {
		it('inherits from Error', () => {
			let error = new _ckeditorerror2.default('foo');

			expect(error).to.be.an.instanceOf(Error);
			expect(error).to.be.an.instanceOf(_ckeditorerror2.default);
		});

		it('sets the name', () => {
			let error = new _ckeditorerror2.default('foo');

			expect(error).to.have.property('name', 'CKEditorError');
		});

		it('sets the message', () => {
			let error = new _ckeditorerror2.default('foo');

			expect(error).to.have.property('message', 'foo');
			expect(error.data).to.be.undefined;
		});

		it('sets the message and data', () => {
			let data = { bar: 1 };
			let error = new _ckeditorerror2.default('foo', data);

			expect(error).to.have.property('message', 'foo {"bar":1}');
			expect(error).to.have.property('data', data);
		});

		it('appends stringified data to the message', () => {
			class Foo {
				constructor() {
					this.x = 1;
				}
			}

			let data = {
				bar: 'a',
				bom: new Foo(),
				bim: 10
			};
			let error = new _ckeditorerror2.default('foo', data);

			expect(error).to.have.property('message', 'foo {"bar":"a","bom":{"x":1},"bim":10}');
			expect(error).to.have.property('data', data);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
