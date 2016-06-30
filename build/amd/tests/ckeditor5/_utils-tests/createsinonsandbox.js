define('tests', ['/tests/ckeditor5/_utils/utils.js'], function (_utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const obj = {
		method() {}
	};
	const origMethod = obj.method;
	let spy;

	_utils2.default.createSinonSandbox();

	describe('testUtils.createSinonSandbox()', () => {
		it('creates a sandbox', () => {
			expect(_utils2.default.sinon).to.be.an('object');
			expect(_utils2.default.sinon).to.have.property('spy');
		});

		// This test is needed for the following one.
		it('really works', () => {
			spy = _utils2.default.sinon.spy(obj, 'method');

			expect(obj).to.have.property('method', spy);
		});

		it('restores spies after each test', () => {
			obj.method();

			sinon.assert.notCalled(spy);
			expect(obj).to.have.property('method', origMethod);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
