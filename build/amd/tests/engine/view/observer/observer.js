define('tests', ['/ckeditor5/engine/view/observer/observer.js'], function (_observer) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _observer2 = _interopRequireDefault(_observer);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Observer', () => {
		describe('constructor', () => {
			it('should create Observer with properties', () => {
				const viewDocument = {};
				const observer = new _observer2.default(viewDocument);

				expect(observer).to.be.an.instanceof(_observer2.default);
				expect(observer).to.have.property('document').that.equals(viewDocument);
				expect(observer).to.have.property('isEnabled').that.is.false;
			});
		});

		describe('enable', () => {
			it('should set isEnabled to true', () => {
				const observer = new _observer2.default({});

				expect(observer.isEnabled).to.be.false;

				observer.enable();

				expect(observer.isEnabled).to.be.true;
			});
		});

		describe('disable', () => {
			it('should set isEnabled to false', () => {
				const observer = new _observer2.default({});

				observer.enable();

				expect(observer.isEnabled).to.be.true;

				observer.disable();

				expect(observer.isEnabled).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
