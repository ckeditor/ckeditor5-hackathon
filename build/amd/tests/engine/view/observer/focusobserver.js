define('tests', ['/ckeditor5/engine/view/observer/focusobserver.js', '/ckeditor5/engine/view/document.js'], function (_focusobserver, _document) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _focusobserver2 = _interopRequireDefault(_focusobserver);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('FocusObserver', () => {
		let viewDocument, observer;

		beforeEach(() => {
			viewDocument = new _document2.default();
			observer = viewDocument.addObserver(_focusobserver2.default);
		});

		it('should define domEventType', () => {
			expect(observer.domEventType).to.deep.equal(['focus', 'blur']);
		});

		describe('onDomEvent', () => {
			it('should fire focus with the right event data', () => {
				const spy = sinon.spy();

				viewDocument.on('focus', spy);

				observer.onDomEvent({ type: 'focus', target: document.body });

				expect(spy.calledOnce).to.be.true;

				const data = spy.args[0][1];
				expect(data.domTarget).to.equal(document.body);
			});

			it('should fire blur with the right event data', () => {
				const spy = sinon.spy();

				viewDocument.on('blur', spy);

				observer.onDomEvent({ type: 'blur', target: document.body });

				expect(spy.calledOnce).to.be.true;

				const data = spy.args[0][1];
				expect(data.domTarget).to.equal(document.body);
			});
		});

		describe('handle focusedEditable property of the document', () => {
			let domMain, domHeader, viewMain, viewHeader;

			beforeEach(() => {
				domMain = document.createElement('div');
				domHeader = document.createElement('h1');

				viewMain = viewDocument.createRoot(domMain);
				viewHeader = viewDocument.createRoot(domHeader, 'header');
			});

			it('should set focusedEditable on focus', () => {
				observer.onDomEvent({ type: 'focus', target: domMain });

				expect(viewDocument.focusedEditable).to.equal(viewMain);
			});

			it('should change focusedEditable on focus', () => {
				observer.onDomEvent({ type: 'focus', target: domMain });

				expect(viewDocument.focusedEditable).to.equal(viewMain);

				observer.onDomEvent({ type: 'focus', target: domHeader });

				expect(viewDocument.focusedEditable).to.equal(viewHeader);
			});

			it('should set focusedEditable to null on blur', () => {
				observer.onDomEvent({ type: 'focus', target: domMain });

				expect(viewDocument.focusedEditable).to.equal(viewMain);

				observer.onDomEvent({ type: 'blur', target: domMain });

				expect(viewDocument.focusedEditable).to.be.null;
			});

			it('should not touch focusedEditable on blur if it is already changed', () => {
				observer.onDomEvent({ type: 'focus', target: domMain });

				expect(viewDocument.focusedEditable).to.equal(viewMain);

				observer.onDomEvent({ type: 'focus', target: domHeader });
				observer.onDomEvent({ type: 'blur', target: domMain });

				expect(viewDocument.focusedEditable).to.equal(viewHeader);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
