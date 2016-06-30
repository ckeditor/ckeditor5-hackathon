define('tests', ['/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/domconverter.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/filler.js', '/tests/engine/_utils/view.js', '/ckeditor5/utils/dom/createelement.js'], function (_text, _element, _domconverter, _documentfragment, _filler, _view, _createelement) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, domconverter, browser-only */

	'use strict';

	var _text2 = _interopRequireDefault(_text);

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

		describe('viewToDom', () => {
			it('should create tree of DOM elements from view elements', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				const viewP = new _element2.default('p');

				viewP.setAttribute('class', 'foo');

				viewP.appendChildren(viewImg);
				viewP.appendChildren(viewText);

				const domImg = document.createElement('img');

				converter.bindElements(domImg, viewImg);

				const domP = converter.viewToDom(viewP, document);

				expect(domP).to.be.an.instanceof(HTMLElement);
				expect(domP.tagName).to.equal('P');

				expect(domP.getAttribute('class')).to.equal('foo');
				expect(domP.attributes.length).to.equal(1);

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName).to.equal('IMG');
				expect(domP.childNodes[1].data).to.equal('foo');

				expect(converter.getCorrespondingView(domP)).not.to.equal(viewP);
				expect(converter.getCorrespondingView(domP.childNodes[0])).to.equal(viewImg);
			});

			it('should create tree of DOM elements from view elements and bind elements', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				const viewP = new _element2.default('p');

				viewP.setAttribute('class', 'foo');

				viewP.appendChildren(viewImg);
				viewP.appendChildren(viewText);

				const domP = converter.viewToDom(viewP, document, { bind: true });

				expect(domP).to.be.an.instanceof(HTMLElement);
				expect(domP.tagName).to.equal('P');

				expect(domP.getAttribute('class')).to.equal('foo');
				expect(domP.attributes.length).to.equal(1);

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName).to.equal('IMG');
				expect(domP.childNodes[1].data).to.equal('foo');

				expect(converter.getCorrespondingView(domP)).to.equal(viewP);
				expect(converter.getCorrespondingView(domP.childNodes[0])).to.equal(viewP.getChild(0));
			});

			it('should create tree of DOM elements from view element without children', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				const viewP = new _element2.default('p');

				viewP.setAttribute('class', 'foo');

				viewP.appendChildren(viewImg);
				viewP.appendChildren(viewText);

				const domImg = document.createElement('img');

				converter.bindElements(domImg, viewImg);

				const domP = converter.viewToDom(viewP, document, { withChildren: false });

				expect(domP).to.be.an.instanceof(HTMLElement);
				expect(domP.tagName).to.equal('P');

				expect(domP.getAttribute('class')).to.equal('foo');
				expect(domP.attributes.length).to.equal(1);

				expect(domP.childNodes.length).to.equal(0);
				expect(converter.getCorrespondingView(domP)).not.to.equal(viewP);
			});

			it('should create DOM document fragment from view document fragment and bind elements', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				const viewFragment = new _documentfragment2.default();

				viewFragment.appendChildren(viewImg);
				viewFragment.appendChildren(viewText);

				const domFragment = converter.viewToDom(viewFragment, document, { bind: true });

				expect(domFragment).to.be.an.instanceof(DocumentFragment);
				expect(domFragment.childNodes.length).to.equal(2);
				expect(domFragment.childNodes[0].tagName).to.equal('IMG');
				expect(domFragment.childNodes[1].data).to.equal('foo');

				expect(converter.getCorrespondingView(domFragment)).to.equal(viewFragment);
				expect(converter.getCorrespondingView(domFragment.childNodes[0])).to.equal(viewFragment.getChild(0));
			});

			it('should create DOM document fragment from view document without children', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				const viewFragment = new _documentfragment2.default();

				viewFragment.appendChildren(viewImg);
				viewFragment.appendChildren(viewText);

				const domImg = document.createElement('img');

				converter.bindElements(domImg, viewImg);

				const domFragment = converter.viewToDom(viewFragment, document, { withChildren: false });

				expect(domFragment).to.be.an.instanceof(DocumentFragment);

				expect(domFragment.childNodes.length).to.equal(0);
				expect(converter.getCorrespondingView(domFragment)).not.to.equal(viewFragment);
			});

			it('should return already bind document fragment', () => {
				const domFragment = document.createDocumentFragment();
				const viewFragment = new _documentfragment2.default();

				converter.bindDocumentFragments(domFragment, viewFragment);

				const domFragment2 = converter.viewToDom(viewFragment);

				expect(domFragment2).to.equal(domFragment);
			});
		});

		describe('viewChildrenToDom', () => {
			it('should convert children', () => {
				const viewP = (0, _view.parse)('<container:p>foo<attribute:b>bar</attribute:b></container:p>');

				const domChildren = Array.from(converter.viewChildrenToDom(viewP, document));

				expect(domChildren.length).to.equal(2);
				expect(domChildren[0].data).to.equal('foo');
				expect(domChildren[1].tagName.toLowerCase()).to.equal('b');
				expect(domChildren[1].childNodes.length).to.equal(1);
			});

			it('should add filler', () => {
				const viewP = (0, _view.parse)('<container:p></container:p>');

				const domChildren = Array.from(converter.viewChildrenToDom(viewP, document));

				expect(domChildren.length).to.equal(1);
				expect((0, _filler.isBlockFiller)(domChildren[0], converter.blockFiller)).to.be.true;
			});

			it('should add filler according to fillerPositionOffset', () => {
				const viewP = (0, _view.parse)('<container:p>foo</container:p>');
				viewP.getFillerOffset = () => 0;

				const domChildren = Array.from(converter.viewChildrenToDom(viewP, document));

				expect(domChildren.length).to.equal(2);
				expect((0, _filler.isBlockFiller)(domChildren[0], converter.blockFiller)).to.be.true;
				expect(domChildren[1].data).to.equal('foo');
			});

			it('should pass options', () => {
				const viewP = (0, _view.parse)('<container:p>foo<attribute:b>bar</attribute:b></container:p>');

				const domChildren = Array.from(converter.viewChildrenToDom(viewP, document, { withChildren: false }));

				expect(domChildren.length).to.equal(2);
				expect(domChildren[0].data).to.equal('foo');
				expect(domChildren[1].tagName.toLowerCase()).to.equal('b');
				expect(domChildren[1].childNodes.length).to.equal(0);
			});
		});

		describe('viewPositionToDom', () => {
			it('should convert the position in the text', () => {
				const domFoo = document.createTextNode('foo');
				const domP = (0, _createelement2.default)(document, 'p', null, domFoo);
				const { view: viewP, selection } = (0, _view.parse)('<container:p>fo{}o</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(2);
				expect(domPosition.parent).to.equal(domFoo);
			});

			it('should convert the position in the empty element', () => {
				const domP = (0, _createelement2.default)(document, 'p');
				const { view: viewP, selection } = (0, _view.parse)('<container:p>[]</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(0);
				expect(domPosition.parent).to.equal(domP);
			});

			it('should convert the position in the non-empty element', () => {
				const domB = (0, _createelement2.default)(document, 'b', null, 'foo');
				const domP = (0, _createelement2.default)(document, 'p', null, domB);
				const { view: viewP, selection } = (0, _view.parse)('<container:p><attribute:b>foo</attribute:b>[]</container:p>');

				converter.bindElements(domP, viewP);
				converter.bindElements(domB, viewP.getChild(0));

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(1);
				expect(domPosition.parent).to.equal(domP);
			});

			it('should convert the position after text', () => {
				const domP = (0, _createelement2.default)(document, 'p', null, 'foo');
				const { view: viewP, selection } = (0, _view.parse)('<container:p>foo[]</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(1);
				expect(domPosition.parent).to.equal(domP);
			});

			it('should convert the position before text', () => {
				const domP = (0, _createelement2.default)(document, 'p', null, 'foo');
				const { view: viewP, selection } = (0, _view.parse)('<container:p>[]foo</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(0);
				expect(domPosition.parent).to.equal(domP);
			});

			it('should update offset if DOM text node starts with inline filler', () => {
				const domFoo = document.createTextNode(_filler.INLINE_FILLER + 'foo');
				const domP = (0, _createelement2.default)(document, 'p', null, domFoo);
				const { view: viewP, selection } = (0, _view.parse)('<container:p>fo{}o</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(_filler.INLINE_FILLER_LENGTH + 2);
				expect(domPosition.parent).to.equal(domFoo);
			});

			it('should move the position to the text node if the position is where inline filler is', () => {
				const domFiller = document.createTextNode(_filler.INLINE_FILLER);
				const domP = (0, _createelement2.default)(document, 'p', null, domFiller);
				const { view: viewP, selection } = (0, _view.parse)('<container:p>[]</container:p>');

				converter.bindElements(domP, viewP);

				const viewPosition = selection.getFirstPosition();
				const domPosition = converter.viewPositionToDom(viewPosition);

				expect(domPosition.offset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domPosition.parent).to.equal(domFiller);
			});
		});

		describe('viewRangeToDom', () => {
			it('should convert view range to DOM range', () => {
				const domFoo = document.createTextNode('foo');
				const domP = (0, _createelement2.default)(document, 'p', null, domFoo);
				const { view: viewP, selection } = (0, _view.parse)('<container:p>fo{o]</container:p>');

				converter.bindElements(domP, viewP);

				const viewRange = selection.getFirstRange();
				const domRange = converter.viewRangeToDom(viewRange);

				expect(domRange).to.be.instanceof(Range);
				expect(domRange.startContainer).to.equal(domFoo);
				expect(domRange.startOffset).to.equal(2);
				expect(domRange.endContainer).to.equal(domP);
				expect(domRange.endOffset).to.equal(1);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
