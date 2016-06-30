define('tests', ['/tests/ckeditor5/_utils/utils.js', '/tests/utils/_utils/utils.js', '/ckeditor5/utils/observablemixin.js', '/ckeditor5/utils/emittermixin.js'], function (_utils, _utils3, _observablemixin, _emittermixin) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _utils4 = _interopRequireDefault(_utils3);

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('utilsTestUtils.createObserver()', () => {
		let observable, observable2, observer;

		beforeEach(() => {
			observer = _utils4.default.createObserver();

			observable = Object.create(_observablemixin2.default);
			observable.set({ foo: 0, bar: 0 });

			observable2 = Object.create(_observablemixin2.default);
			observable2.set({ foo: 0, bar: 0 });
		});

		it('should create an observer', () => {
			function Emitter() {}
			Emitter.prototype = _emittermixin2.default;

			expect(observer).to.be.instanceof(Emitter);
			expect(observer.observe).is.a('function');
			expect(observer.stopListening).is.a('function');
		});

		describe('Observer', () => {
			/* global console:false  */

			it('logs changes in the observable', () => {
				const spy = _utils2.default.sinon.stub(console, 'log');

				observer.observe('Some observable', observable);
				observer.observe('Some observable 2', observable2);

				observable.foo = 1;
				expect(spy.callCount).to.equal(1);

				observable.foo = 2;
				observable2.bar = 3;
				expect(spy.callCount).to.equal(3);
			});

			it('logs changes to specified properties', () => {
				const spy = _utils2.default.sinon.stub(console, 'log');

				observer.observe('Some observable', observable, ['foo']);

				observable.foo = 1;
				expect(spy.callCount).to.equal(1);

				observable.bar = 1;
				expect(spy.callCount).to.equal(1);
			});

			it('stops listening when asked to do so', () => {
				const spy = _utils2.default.sinon.stub(console, 'log');

				observer.observe('Some observable', observable);

				observable.foo = 1;
				expect(spy.callCount).to.equal(1);

				observer.stopListening();

				observable.foo = 2;
				expect(spy.callCount).to.equal(1);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
