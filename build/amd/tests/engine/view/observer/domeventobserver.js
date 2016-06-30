define('tests', ['/ckeditor5/engine/view/observer/domeventobserver.js', '/ckeditor5/engine/view/observer/observer.js', '/ckeditor5/engine/view/document.js'], function (_domeventobserver, _observer, _document) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _domeventobserver2 = _interopRequireDefault(_domeventobserver);

	var _observer2 = _interopRequireDefault(_observer);

	var _document2 = _interopRequireDefault(_document);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class ClickObserver extends _domeventobserver2.default {
		constructor(document) {
			super(document);

			this.domEventType = 'click';
		}

		onDomEvent(domEvt) {
			this.fire('click', domEvt, { foo: 1, bar: 2 });
		}
	}

	class MultiObserver extends _domeventobserver2.default {
		constructor(document) {
			super(document);

			this.domEventType = ['evt1', 'evt2'];
		}

		onDomEvent(domEvt) {
			this.fire(domEvt.type, domEvt);
		}
	}

	describe('DomEventObserver', () => {
		let viewDocument;

		beforeEach(() => {
			viewDocument = new _document2.default();
		});

		describe('constructor', () => {
			it('should create Observer with properties', () => {
				const observer = new _domeventobserver2.default(viewDocument);

				expect(observer).to.be.an.instanceof(_observer2.default);
			});
		});

		it('should add event listener', () => {
			const domElement = document.createElement('p');
			const domEvent = new MouseEvent('click');
			const evtSpy = sinon.spy();

			viewDocument.createRoot(domElement, 'root');
			viewDocument.addObserver(ClickObserver);
			viewDocument.on('click', evtSpy);

			domElement.dispatchEvent(domEvent);

			expect(evtSpy.calledOnce).to.be.true;

			const data = evtSpy.args[0][1];

			expect(data).to.have.property('foo', 1);
			expect(data).to.have.property('bar', 2);
			expect(data).to.have.property('domEvent', domEvent);
		});

		it('should add multiple event listeners', () => {
			const domElement = document.createElement('p');
			const domEvent1 = new MouseEvent('evt1');
			const domEvent2 = new MouseEvent('evt2');
			const evtSpy1 = sinon.spy();
			const evtSpy2 = sinon.spy();

			viewDocument.createRoot(domElement, 'root');
			viewDocument.addObserver(MultiObserver);
			viewDocument.on('evt1', evtSpy1);
			viewDocument.on('evt2', evtSpy2);

			domElement.dispatchEvent(domEvent1);
			expect(evtSpy1.calledOnce).to.be.true;

			domElement.dispatchEvent(domEvent2);
			expect(evtSpy2.calledOnce).to.be.true;
		});

		it('should not fire event if observer is disabled', () => {
			const domElement = document.createElement('p');
			const domEvent = new MouseEvent('click');
			const evtSpy = sinon.spy();

			viewDocument.createRoot(domElement, 'root');
			const testObserver = viewDocument.addObserver(ClickObserver);
			viewDocument.on('click', evtSpy);

			testObserver.disable();

			domElement.dispatchEvent(domEvent);

			expect(evtSpy.called).to.be.false;
		});

		it('should fire event if observer is disabled and re-enabled', () => {
			const domElement = document.createElement('p');
			const domEvent = new MouseEvent('click');
			const viewDocument = new _document2.default();
			const evtSpy = sinon.spy();

			viewDocument.createRoot(domElement, 'root');
			const testObserver = viewDocument.addObserver(ClickObserver);
			viewDocument.on('click', evtSpy);

			testObserver.disable();

			domElement.dispatchEvent(domEvent);

			expect(evtSpy.called).to.be.false;

			testObserver.enable();

			domElement.dispatchEvent(domEvent);

			expect(evtSpy.calledOnce).to.be.true;
		});

		describe('fire', () => {
			it('should do nothing if observer is disabled', () => {
				const testObserver = new ClickObserver(viewDocument);
				const fireSpy = sinon.spy(viewDocument, 'fire');

				testObserver.disable();

				testObserver.fire('click', {});

				expect(fireSpy.called).to.be.false;

				testObserver.enable();

				testObserver.fire('click', {});

				expect(fireSpy.calledOnce).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
