define('tests', ['/tests/ui/_utils/utils.js'], function (_utils) {
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

	describe('utils', () => {
		describe('createTestUIController', () => {
			it('returns a promise', () => {
				expect(_utils2.default.createTestUIController()).to.be.instanceof(Promise);
			});

			describe('controller instance', () => {
				it('comes with a view', () => {
					const promise = _utils2.default.createTestUIController();

					return promise.then(controller => {
						expect(controller.view.element).to.equal(document.body);
					});
				});

				it('creates collections and regions', () => {
					const promise = _utils2.default.createTestUIController({
						foo: el => el.firstChild,
						bar: el => el.lastChild
					});

					promise.then(controller => {
						expect(controller.collections.get('foo')).to.be.not.undefined;
						expect(controller.collections.get('bar')).to.be.not.undefined;

						expect(controller.view.regions.get('foo').element).to.equal(document.body.firstChild);
						expect(controller.view.regions.get('bar').element).to.equal(document.body.lastChild);
					});
				});

				it('is ready', () => {
					const promise = _utils2.default.createTestUIController({
						foo: el => el.firstChild,
						bar: el => el.lastChild
					});

					promise.then(controller => {
						expect(controller.ready).to.be.true;
					});
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
