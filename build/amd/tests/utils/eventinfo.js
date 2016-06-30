define('tests', ['/ckeditor5/utils/eventinfo.js'], function (_eventinfo) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _eventinfo2 = _interopRequireDefault(_eventinfo);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EventInfo', () => {
		it('should be created properly', () => {
			let event = new _eventinfo2.default(undefined, 'test');

			expect(event.source).to.equal(undefined);
			expect(event.name).to.equal('test');
			expect(event.stop.called).to.not.be.true;
			expect(event.off.called).to.not.be.true;
		});

		it('should have stop() and off() marked', () => {
			let event = new _eventinfo2.default(undefined, 'test');

			event.stop();
			event.off();

			expect(event.stop.called).to.be.true;
			expect(event.off.called).to.be.true;
		});

		it('should not mark "called" in future instances', () => {
			let event = new _eventinfo2.default(undefined, 'test');

			event.stop();
			event.off();

			event = new _eventinfo2.default('test');

			expect(event.stop.called).to.not.be.true;
			expect(event.off.called).to.not.be.true;
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
