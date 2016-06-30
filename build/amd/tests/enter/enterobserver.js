define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/enter/enterobserver.js', '/ckeditor5/engine/view/observer/domeventdata.js', '/ckeditor5/utils/keyboard.js'], function (_document, _enterobserver, _domeventdata, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _enterobserver2 = _interopRequireDefault(_enterobserver);

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EnterObserver', () => {
		let viewDocument, observer;

		beforeEach(() => {
			viewDocument = new _document2.default();
			observer = viewDocument.addObserver(_enterobserver2.default);
		});

		// See #10.
		it('can be initialized', () => {
			expect(() => {
				viewDocument.createRoot(document.createElement('div'));
			}).to.not.throw();
		});

		describe('enter event', () => {
			it('is fired on keydown', () => {
				const spy = sinon.spy();

				viewDocument.on('enter', spy);

				viewDocument.fire('keydown', new _domeventdata2.default(viewDocument, getDomEvent(), {
					keyCode: (0, _keyboard.getCode)('enter')
				}));

				expect(spy.calledOnce).to.be.true;
			});

			it('is not fired on keydown when keyCode does not match enter', () => {
				const spy = sinon.spy();

				viewDocument.on('enter', spy);

				viewDocument.fire('keydown', new _domeventdata2.default(viewDocument, getDomEvent(), {
					keyCode: 1
				}));

				expect(spy.calledOnce).to.be.false;
			});
		});

		function getDomEvent() {
			return {
				preventDefault: sinon.spy()
			};
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
