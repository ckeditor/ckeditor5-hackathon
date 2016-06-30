define('tests', ['/ckeditor5/utils/log.js'], function (_log) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* globals console */

	'use strict';

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let spy;

	beforeEach(() => {
		if (spy) {
			spy.restore();
		}
	});

	describe('warn()', () => {
		it('logs the message to the console using console.warn()', () => {
			let spy = sinon.stub(console, 'warn');
			let data = { bar: 1 };

			_log2.default.warn('foo', data);

			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, 'foo', data);

			_log2.default.warn('bar');
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, 'bar');
		});
	});

	describe('error()', () => {
		it('logs the message to the console using console.error()', () => {
			let spy = sinon.stub(console, 'error');
			let data = { bar: 1 };

			_log2.default.error('foo', data);

			sinon.assert.calledOnce(spy);
			sinon.assert.calledWith(spy, 'foo', data);

			_log2.default.error('bar');
			sinon.assert.calledTwice(spy);
			sinon.assert.calledWith(spy, 'bar');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
