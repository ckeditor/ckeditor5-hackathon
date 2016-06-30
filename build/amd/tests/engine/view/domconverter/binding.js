define('tests', ['/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/domconverter.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/filler.js', '/tests/engine/_utils/view.js', '/ckeditor5/utils/dom/createelement.js'], function (_element, _domconverter, _documentfragment, _filler, _view, _createelement) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, domconverter, browser-only */

	'use strict';

	var _element2 = _interopRequireDefault(_element);

	var _domconverter2 = _interopRequireDefault(_domconverter);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _createelement2 = _interopRequireDefault(_createelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DomConverter', () => {
		let converter;

		before(() => {
			converter = new _domconverter2.default();
		});

		describe('bindElements', () => {
			it('should bind elements', () => {
				const domElement = document.createElement('p');
				const viewElement = new _element2.default('p');

				converter.bindElements(domElement, viewElement);

				expect(converter.getCorrespondingView(domElement)).to.equal(viewElement);
				expect(converter.getCorrespondingDom(viewElement)).to.equal(domElement);
			});
		});

		describe('bindDocumentFragments', () => {
			it('should bind document fragments', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = new _documentfragment2.default();

				converter.bindDocumentFragments(domFragment, viewFragment);

				expect(converter.getCorrespondingView(domFragment)).to.equal(viewFragment);
				expect(converter.getCorrespondingDom(viewFragment)).to.equal(domFragment);
			});
		});

		describe('getCorrespondingView', () => {
			it('should return corresponding view element if element is passed', () => {
				const domElement = document.createElement('p');
				const viewElement = new _element2.default('p');

				converter.bindElements(domElement, viewElement);

				expect(converter.getCorrespondingView(domElement)).to.equal(viewElement);
			});

			it('should return corresponding view text if text is passed', () => {
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(0);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingView(domText)).to.equal(viewText);
			});

			it('should return corresponding view document fragment', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = converter.domToView(domFragment);

				converter.bindElements(domFragment, viewFragment);

				expect(converter.getCorrespondingView(domFragment)).to.equal(viewFragment);
			});

			it('should return null if falsy value was passed', () => {
				expect(converter.getCorrespondingView(null)).to.be.null;
				expect(converter.getCorrespondingView(undefined)).to.be.null;
			});
		});

		describe('getCorrespondingViewElement', () => {
			it('should return corresponding view element', () => {
				const domElement = document.createElement('p');
				const viewElement = new _element2.default('p');

				converter.bindElements(domElement, viewElement);

				expect(converter.getCorrespondingViewElement(domElement)).to.equal(viewElement);
			});
		});

		describe('getCorrespondingViewDocumentFragment', () => {
			it('should return corresponding view document fragment', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = converter.domToView(domFragment);

				converter.bindElements(domFragment, viewFragment);

				expect(converter.getCorrespondingViewDocumentFragment(domFragment)).to.equal(viewFragment);
			});
		});

		describe('getCorrespondingViewText', () => {
			it('should return corresponding view text based on sibling', () => {
				const domImg = document.createElement('img');
				const domText = document.createTextNode('foo');
				const domP = (0, _createelement2.default)(document, 'p', null, [domImg, domText]);

				const viewImg = new _element2.default('img');

				converter.bindElements(domImg, viewImg);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(1);

				expect(converter.getCorrespondingViewText(domText)).to.equal(viewText);
			});

			it('should return corresponding view text based on parent', () => {
				const domText = document.createTextNode('foo');
				const domP = (0, _createelement2.default)(document, 'p', null, domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(0);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingViewText(domText)).to.equal(viewText);
			});

			it('should return null if sibling is not bound', () => {
				const domImg = document.createElement('img');
				const domText = document.createTextNode('foo');
				const domP = (0, _createelement2.default)(document, 'p', null, [domImg, domText]);

				const viewP = converter.domToView(domP);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingViewText(domText)).to.be.null;
			});

			it('should return null if sibling is not element', () => {
				const domTextFoo = document.createTextNode('foo');
				const domTextBar = document.createTextNode('bar');
				const domP = (0, _createelement2.default)(document, 'p', null, [domTextFoo, domTextBar]);

				const viewP = converter.domToView(domP);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingViewText(domTextBar)).to.be.null;
			});

			it('should return null if parent is not bound', () => {
				const domText = document.createTextNode('foo');
				(0, _createelement2.default)(document, 'p', null, domText);

				expect(converter.getCorrespondingViewText(domText)).to.be.null;
			});

			it('should return null for inline filler', () => {
				const domFiller = document.createTextNode(_filler.INLINE_FILLER);
				const domP = (0, _createelement2.default)(document, 'p', null, domFiller);

				const viewP = converter.domToView(domP);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingViewText(domFiller)).to.be.null;
			});

			it('should return null if there is no text node sibling in view', () => {
				const domB = document.createElement('b');
				const domI = document.createElement('i');
				const domText = document.createTextNode('x');
				const domP = (0, _createelement2.default)(document, 'p', null, [domB, domText, domI]);

				const viewP = (0, _view.parse)('<p><b></b><i></i></p>');
				const viewB = viewP.getChild(0);
				const viewI = viewP.getChild(1);

				converter.bindElements(domP, viewP);
				converter.bindElements(domI, viewI);
				converter.bindElements(domB, viewB);

				expect(converter.getCorrespondingViewText(domText)).to.be.null;
			});

			it('should return null if there is no child text node in view', () => {
				const domText = document.createTextNode('x');
				const domP = (0, _createelement2.default)(document, 'p', null, domText);

				const viewP = (0, _view.parse)('<p></p>');

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingViewText(domText)).to.be.null;
			});
		});

		describe('getCorrespondingDom', () => {
			it('should return corresponding DOM element if element was passed', () => {
				const domElement = document.createElement('p');
				const viewElement = new _element2.default('p');

				converter.bindElements(domElement, viewElement);

				expect(converter.getCorrespondingDom(viewElement)).to.equal(domElement);
			});

			it('should return corresponding DOM text if text was passed', () => {
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(0);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingDom(viewText)).to.equal(domText);
			});

			it('should return corresponding DOM document fragment', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = new _documentfragment2.default();

				converter.bindElements(domFragment, viewFragment);

				expect(converter.getCorrespondingDom(viewFragment)).to.equal(domFragment);
			});

			it('should return null if wrong parameter is passed', () => {
				expect(converter.getCorrespondingDom(null)).to.be.null;
			});
		});

		describe('getCorrespondingDomElement', () => {
			it('should return corresponding DOM element', () => {
				const domElement = document.createElement('p');
				const viewElement = new _element2.default('p');

				converter.bindElements(domElement, viewElement);

				expect(converter.getCorrespondingDomElement(viewElement)).to.equal(domElement);
			});
		});

		describe('getCorrespondingDomDocumentFragment', () => {
			it('should return corresponding DOM document fragment', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = new _documentfragment2.default();

				converter.bindElements(domFragment, viewFragment);

				expect(converter.getCorrespondingDomDocumentFragment(viewFragment)).to.equal(domFragment);
			});
		});

		describe('getCorrespondingDomText', () => {
			it('should return corresponding DOM text based on sibling', () => {
				const domImg = document.createElement('img');
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domImg);
				domP.appendChild(domText);

				const viewImg = new _element2.default('img');

				converter.bindElements(domImg, viewImg);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(1);

				expect(converter.getCorrespondingDomText(viewText)).to.equal(domText);
			});

			it('should return corresponding DOM text based on parent', () => {
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(0);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingDomText(viewText)).to.equal(domText);
			});

			it('should return null if sibling is not bound', () => {
				const domImg = document.createElement('img');
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domImg);
				domP.appendChild(domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(1);

				converter.bindElements(domP, viewP);

				expect(converter.getCorrespondingDomText(viewText)).to.be.null;
			});

			it('should return null if parent is not bound', () => {
				const domText = document.createTextNode('foo');
				const domP = document.createElement('p');

				domP.appendChild(domText);

				const viewP = converter.domToView(domP);
				const viewText = viewP.getChild(0);

				expect(converter.getCorrespondingDomText(viewText)).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
