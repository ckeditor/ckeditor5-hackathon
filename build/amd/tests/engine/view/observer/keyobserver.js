define('tests', ['/ckeditor5/engine/view/observer/keyobserver.js', '/ckeditor5/engine/view/document.js', '/ckeditor5/utils/keyboard.js'], function (_keyobserver, _document, _keyboard) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _keyobserver2 = _interopRequireDefault(_keyobserver);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('KeyObserver', () => {
		let viewDocument, observer;

		beforeEach(() => {
			viewDocument = new _document2.default();
			observer = viewDocument.addObserver(_keyobserver2.default);
		});

		it('should define domEventType', () => {
			expect(observer.domEventType).to.equal('keydown');
		});

		describe('onDomEvent', () => {
			it('should fire keydown with the target and key info', () => {
				const spy = sinon.spy();

				viewDocument.on('keydown', spy);

				observer.onDomEvent({ target: document.body, keyCode: 111, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false });

				expect(spy.calledOnce).to.be.true;

				const data = spy.args[0][1];
				expect(data).to.have.property('domTarget', document.body);
				expect(data).to.have.property('keyCode', 111);
				expect(data).to.have.property('altKey', false);
				expect(data).to.have.property('ctrlKey', false);
				expect(data).to.have.property('shiftKey', false);
				expect(data).to.have.property('keystroke', (0, _keyboard.getCode)(data));

				// Just to be sure.
				expect((0, _keyboard.getCode)(data)).to.equal(111);
			});

			it('should fire keydown with proper key modifiers info', () => {
				const spy = sinon.spy();

				viewDocument.on('keydown', spy);

				observer.onDomEvent({ target: document.body, keyCode: 111, altKey: true, ctrlKey: true, metaKey: false, shiftKey: true });

				const data = spy.args[0][1];
				expect(data).to.have.property('keyCode', 111);
				expect(data).to.have.property('altKey', true);
				expect(data).to.have.property('ctrlKey', true);
				expect(data).to.have.property('shiftKey', true);
				expect(data).to.have.property('keystroke', (0, _keyboard.getCode)(data));

				// Just to be sure.
				expect((0, _keyboard.getCode)(data)).to.be.greaterThan(111);
			});

			it('should fire keydown ctrlKey set to true one meta (cmd) was pressed', () => {
				const spy = sinon.spy();

				viewDocument.on('keydown', spy);

				observer.onDomEvent({ target: document.body, keyCode: 111, metaKey: true });

				const data = spy.args[0][1];
				expect(data).to.have.property('ctrlKey', true);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
