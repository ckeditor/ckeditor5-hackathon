define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/observer.js', '/ckeditor5/engine/view/renderer.js', '/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/domconverter.js', '/ckeditor5/utils/count.js'], function (_document, _observer, _renderer, _writer, _domconverter, _count) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _observer2 = _interopRequireDefault(_observer);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _writer2 = _interopRequireDefault(_writer);

	var _domconverter2 = _interopRequireDefault(_domconverter);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Document', () => {
		let ObserverMock, ObserverMockGlobalCount, instantiated, enabled;

		beforeEach(() => {
			instantiated = 0;
			enabled = 0;

			ObserverMock = class extends _observer2.default {
				constructor(viewDocument) {
					super(viewDocument);

					this.enable = sinon.spy();
					this.disable = sinon.spy();
					this.observe = sinon.spy();
				}
			};

			ObserverMockGlobalCount = class extends _observer2.default {
				constructor(viewDocument) {
					super(viewDocument);
					instantiated++;

					this.observe = sinon.spy();
				}

				enable() {
					enabled++;
				}
			};
		});

		describe('constructor', () => {
			it('should create Document with all properties', () => {
				const viewDocument = new _document2.default();

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(0);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(0);
				expect((0, _count2.default)(viewDocument._observers)).to.equal(0);
				expect(viewDocument).to.have.property('renderer').that.is.instanceOf(_renderer2.default);
				expect(viewDocument).to.have.property('writer').that.is.instanceOf(_writer2.default);
				expect(viewDocument).to.have.property('domConverter').that.is.instanceOf(_domconverter2.default);
				expect(viewDocument).to.have.property('focusedEditable').that.is.null;
			});
		});

		describe('createRoot', () => {
			it('should create root', () => {
				const domP = document.createElement('p');
				const domDiv = document.createElement('div');
				domDiv.appendChild(domP);

				const viewDocument = new _document2.default();
				const ret = viewDocument.createRoot(domDiv);

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(1);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				const domRoot = viewDocument.getDomRoot();
				const viewRoot = viewDocument.getRoot();

				expect(ret).to.equal(viewRoot);

				expect(domRoot).to.equal(domDiv);
				expect(viewDocument.domConverter.getCorrespondingDom(viewRoot)).to.equal(domDiv);

				expect(viewRoot.name.toLowerCase()).to.equal('div');
				expect(viewDocument.renderer.markedChildren.has(viewRoot)).to.be.true;
			});

			it('should call observe on each observer', () => {
				const viewDocument = new _document2.default(document.createElement('div'));
				viewDocument.renderer.render = sinon.spy();

				const domDiv1 = document.createElement('div');
				domDiv1.setAttribute('id', 'editor');

				const domDiv2 = document.createElement('div');
				domDiv2.setAttribute('id', 'editor');

				const observerMock = viewDocument.addObserver(ObserverMock);
				const observerMockGlobalCount = viewDocument.addObserver(ObserverMockGlobalCount);

				viewDocument.createRoot(document.createElement('div'), 'root1');

				sinon.assert.calledOnce(observerMock.observe);
				sinon.assert.calledOnce(observerMockGlobalCount.observe);
			});

			it('should create "main" root by default', () => {
				const domDiv = document.createElement('div');

				const viewDocument = new _document2.default();
				const ret = viewDocument.createRoot(domDiv);

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(1);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				const domRoot = viewDocument.domRoots.get('main');
				const viewRoot = viewDocument.roots.get('main');

				expect(ret).to.equal(viewRoot);

				expect(domRoot).to.equal(domDiv);
			});

			it('should create root with given name', () => {
				const domDiv = document.createElement('div');

				const viewDocument = new _document2.default();
				const ret = viewDocument.createRoot(domDiv, 'header');

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(1);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				const domRoot = viewDocument.domRoots.get('header');
				const viewRoot = viewDocument.roots.get('header');

				expect(ret).to.equal(viewRoot);

				expect(domRoot).to.equal(domDiv);
			});

			it('should create root without attaching DOM element', () => {
				const viewDocument = new _document2.default();
				const ret = viewDocument.createRoot('div');

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(0);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);
				expect(ret).to.equal(viewDocument.getRoot());
			});
		});

		describe('attachDomRoot', () => {
			it('should create root without attach DOM element to the view element', () => {
				const domDiv = document.createElement('div');

				const viewDocument = new _document2.default();
				const viewRoot = viewDocument.createRoot('div');

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(0);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);
				expect(viewRoot).to.equal(viewDocument.getRoot());

				viewDocument.attachDomRoot(domDiv);

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(1);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				expect(viewDocument.getDomRoot()).to.equal(domDiv);
				expect(viewDocument.domConverter.getCorrespondingDom(viewRoot)).to.equal(domDiv);

				expect(viewDocument.renderer.markedChildren.has(viewRoot)).to.be.true;
			});

			it('should create root without attach DOM element to the view element with given name', () => {
				const domH1 = document.createElement('h1');

				const viewDocument = new _document2.default();
				viewDocument.createRoot('div');
				const viewH1 = viewDocument.createRoot('h1', 'header');

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(0);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(2);
				expect(viewH1).to.equal(viewDocument.getRoot('header'));

				viewDocument.attachDomRoot(domH1, 'header');

				expect((0, _count2.default)(viewDocument.domRoots)).to.equal(1);
				expect((0, _count2.default)(viewDocument.roots)).to.equal(2);

				expect(viewDocument.getDomRoot('header')).to.equal(domH1);
				expect(viewDocument.domConverter.getCorrespondingDom(viewH1)).to.equal(domH1);

				expect(viewDocument.renderer.markedChildren.has(viewH1)).to.be.true;
			});
		});

		describe('getRoot', () => {
			it('should return "main" root', () => {
				const viewDocument = new _document2.default();
				viewDocument.createRoot(document.createElement('div'));

				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				expect(viewDocument.getRoot()).to.equal(viewDocument.roots.get('main'));
			});

			it('should return named root', () => {
				const viewDocument = new _document2.default();
				viewDocument.createRoot(document.createElement('h1'), 'header');

				expect((0, _count2.default)(viewDocument.roots)).to.equal(1);

				expect(viewDocument.getRoot('header')).to.equal(viewDocument.roots.get('header'));
			});
		});

		describe('addObserver', () => {
			let viewDocument;

			beforeEach(() => {
				viewDocument = new _document2.default(document.createElement('div'));
				viewDocument.renderer.render = sinon.spy();
			});

			it('should be instantiated and enabled on adding', () => {
				const observerMock = viewDocument.addObserver(ObserverMock);

				expect(viewDocument._observers.size).to.equal(1);

				expect(observerMock).to.have.property('document', viewDocument);
				sinon.assert.calledOnce(observerMock.enable);
			});

			it('should return observer instance ever time addObserver is called', () => {
				const observerMock1 = viewDocument.addObserver(ObserverMock);
				const observerMock2 = viewDocument.addObserver(ObserverMock);

				expect(observerMock1).to.be.instanceof(ObserverMock);
				expect(observerMock2).to.be.instanceof(ObserverMock);
				expect(observerMock1).to.equals(observerMock2);
			});

			it('should instantiate one observer only once', () => {
				viewDocument.addObserver(ObserverMockGlobalCount);
				viewDocument.addObserver(ObserverMockGlobalCount);

				expect(viewDocument._observers.size).to.equal(1);
				expect(instantiated).to.equal(1);
				expect(enabled).to.equal(1);

				viewDocument.addObserver(ObserverMock);
				expect(viewDocument._observers.size).to.equal(2);
			});

			it('should instantiate child class of already registered observer', () => {
				class ObserverMock extends _observer2.default {
					enable() {}
				}
				class ChildObserverMock extends ObserverMock {
					enable() {}
				}

				viewDocument.addObserver(ObserverMock);
				viewDocument.addObserver(ChildObserverMock);

				expect(viewDocument._observers.size).to.equal(2);
			});

			it('should be disabled and re-enabled on render', () => {
				const observerMock = viewDocument.addObserver(ObserverMock);
				viewDocument.render();

				sinon.assert.calledOnce(observerMock.disable);
				sinon.assert.calledOnce(viewDocument.renderer.render);
				sinon.assert.calledTwice(observerMock.enable);
			});

			it('should call observe on each root', () => {
				viewDocument.createRoot(document.createElement('div'), 'root1');
				viewDocument.createRoot(document.createElement('div'), 'root2');

				const observerMock = viewDocument.addObserver(ObserverMock);

				sinon.assert.calledTwice(observerMock.observe);
			});
		});

		describe('getObserver', () => {
			it('should return observer it it is added', () => {
				const viewDocument = new _document2.default();

				const addedObserverMock = viewDocument.addObserver(ObserverMock);
				const getObserverMock = viewDocument.getObserver(ObserverMock);

				expect(getObserverMock).to.be.instanceof(ObserverMock);
				expect(getObserverMock).to.equal(addedObserverMock);
			});

			it('should return undefined if observer is not added', () => {
				const viewDocument = new _document2.default();
				const getObserverMock = viewDocument.getObserver(ObserverMock);

				expect(getObserverMock).to.be.undefined();
			});
		});

		describe('disableObservers', () => {
			it('should disable observers', () => {
				const viewDocument = new _document2.default();

				const addedObserverMock = viewDocument.addObserver(ObserverMock);

				expect(addedObserverMock.enable.calledOnce).to.be.true;
				expect(addedObserverMock.disable.called).to.be.false;

				viewDocument.disableObservers();

				expect(addedObserverMock.enable.calledOnce).to.be.true;
				expect(addedObserverMock.disable.calledOnce).to.be.true;
			});
		});

		describe('enableObservers', () => {
			it('should enable observers', () => {
				const viewDocument = new _document2.default();

				const addedObserverMock = viewDocument.addObserver(ObserverMock);

				viewDocument.disableObservers();

				expect(addedObserverMock.enable.calledOnce).to.be.true;
				expect(addedObserverMock.disable.calledOnce).to.be.true;

				viewDocument.enableObservers();

				expect(addedObserverMock.enable.calledTwice).to.be.true;
				expect(addedObserverMock.disable.calledOnce).to.be.true;
			});
		});

		describe('focusedEditable', () => {
			it('should change renderer.focusedEditable too', () => {
				const viewDocument = new _document2.default();
				const viewRoot = viewDocument.createRoot('div');

				expect(viewDocument.focusedEditable).to.equal(null);
				expect(viewDocument.renderer.focusedEditable).to.equal(null);

				viewDocument.focusedEditable = viewRoot;

				expect(viewDocument.focusedEditable).to.equal(viewRoot);
				expect(viewDocument.renderer.focusedEditable).to.equal(viewRoot);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
