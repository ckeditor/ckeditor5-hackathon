define('tests', ['/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/selection.js', '/ckeditor5/engine/view/domconverter.js', '/ckeditor5/engine/view/renderer.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/_utils/view.js', '/ckeditor5/engine/view/filler.js', '/ckeditor5/utils/dom/createelement.js'], function (_element, _text, _range, _selection, _domconverter, _renderer, _ckeditorerror, _view, _filler, _createelement) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _selection2 = _interopRequireDefault(_selection);

	var _domconverter2 = _interopRequireDefault(_domconverter);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _createelement2 = _interopRequireDefault(_createelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Renderer', () => {
		let selection, domConverter, renderer;

		before(() => {
			selection = new _selection2.default();
			domConverter = new _domconverter2.default();
			renderer = new _renderer2.default(domConverter, selection);
		});

		describe('markToSync', () => {
			let viewRoot;

			beforeEach(() => {
				viewRoot = new _element2.default('p');

				const domRoot = document.createElement('p');
				domConverter.bindElements(domRoot, viewRoot);
				viewRoot.appendChildren(new _text2.default('foo'));

				renderer.markedTexts.clear();
				renderer.markedAttributes.clear();
				renderer.markedChildren.clear();
			});

			it('should mark attributes which need update', () => {
				viewRoot.setAttribute('class', 'foo');

				renderer.markToSync('attributes', viewRoot);

				expect(renderer.markedAttributes.has(viewRoot)).to.be.true;
			});

			it('should mark children which need update', () => {
				viewRoot.appendChildren(new _text2.default('foo'));

				renderer.markToSync('children', viewRoot);

				expect(renderer.markedChildren.has(viewRoot)).to.be.true;
			});

			it('should not mark children if element has no corresponding node', () => {
				// Overwrite viewRoot with node without coresponding DOM node.
				viewRoot = new _element2.default('p');

				viewRoot.appendChildren(new _text2.default('foo'));

				renderer.markToSync('children', viewRoot);

				expect(renderer.markedTexts.has(viewRoot)).to.be.false;
			});

			it('should mark text which need update', () => {
				const viewText = new _text2.default('foo');
				viewRoot.appendChildren(viewText);
				viewText.data = 'bar';

				renderer.markToSync('text', viewText);

				expect(renderer.markedTexts.has(viewText)).to.be.true;
			});

			it('should not mark text if parent has no corresponding node', () => {
				const viewText = new _text2.default('foo');
				// Overwrite viewRoot with node without coresponding DOM node.
				viewRoot = new _element2.default('p');

				viewRoot.appendChildren(viewText);
				viewText.data = 'bar';

				renderer.markToSync('text', viewText);

				expect(renderer.markedTexts.has(viewText)).to.be.false;
			});

			it('should throw if the type is unknown', () => {
				expect(() => {
					renderer.markToSync('UNKNOWN', viewRoot);
				}).to.throw(_ckeditorerror2.default, /^renderer-unknown-type/);
			});
		});

		describe('render', () => {
			let viewRoot, domRoot;

			beforeEach(() => {
				viewRoot = new _element2.default('div');
				domRoot = document.createElement('div');
				document.body.appendChild(domRoot);

				domConverter.bindElements(domRoot, viewRoot);

				renderer.markedTexts.clear();
				renderer.markedAttributes.clear();
				renderer.markedChildren.clear();

				renderer.focusedEditable = viewRoot;

				selection.removeAllRanges();
			});

			it('should update attributes', () => {
				viewRoot.setAttribute('class', 'foo');

				renderer.markToSync('attributes', viewRoot);
				renderer.render();

				expect(domRoot.getAttribute('class')).to.equal('foo');

				expect(renderer.markedAttributes.size).to.equal(0);
			});

			it('should remove attributes', () => {
				viewRoot.setAttribute('class', 'foo');
				domRoot.setAttribute('id', 'bar');
				domRoot.setAttribute('class', 'bar');

				renderer.markToSync('attributes', viewRoot);
				renderer.render();

				expect(domRoot.getAttribute('class')).to.equal('foo');
				expect(domRoot.getAttribute('id')).to.be.not.ok;

				expect(renderer.markedAttributes.size).to.equal(0);
			});

			it('should add children', () => {
				viewRoot.appendChildren(new _text2.default('foo'));

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].data).to.equal('foo');

				expect(renderer.markedChildren.size).to.equal(0);
			});

			it('should remove children', () => {
				viewRoot.appendChildren(new _text2.default('foo'));

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].data).to.equal('foo');

				viewRoot.removeChildren(0, 1);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(0);

				expect(renderer.markedChildren.size).to.equal(0);
			});

			it('should update text', () => {
				const viewText = new _text2.default('foo');
				viewRoot.appendChildren(viewText);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].data).to.equal('foo');

				viewText.data = 'bar';

				renderer.markToSync('text', viewText);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].data).to.equal('bar');

				expect(renderer.markedTexts.size).to.equal(0);
			});

			it('should not update text parent child list changed', () => {
				const viewImg = new _element2.default('img');
				const viewText = new _text2.default('foo');
				viewRoot.appendChildren([viewImg, viewText]);

				renderer.markToSync('children', viewRoot);
				renderer.markToSync('text', viewText);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(2);
				expect(domRoot.childNodes[0].tagName).to.equal('IMG');
				expect(domRoot.childNodes[1].data).to.equal('foo');
			});

			it('should not change text if it is the same during text rendering', () => {
				const viewText = new _text2.default('foo');
				viewRoot.appendChildren(viewText);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				// This should not be changed during the render.
				const domText = domRoot.childNodes[0];

				renderer.markToSync('text', viewText);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0]).to.equal(domText);
			});

			it('should not change text if it is the same during children rendering', () => {
				const viewText = new _text2.default('foo');
				viewRoot.appendChildren(viewText);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				// This should not be changed during the render.
				const domText = domRoot.childNodes[0];

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0]).to.equal(domText);
			});

			it('should not change element if it is the same', () => {
				const viewImg = new _element2.default('img');
				viewRoot.appendChildren(viewImg);

				// This should not be changed during the render.
				const domImg = document.createElement('img');
				domRoot.appendChild(domImg);

				domConverter.bindElements(domImg, viewImg);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0]).to.equal(domImg);
			});

			it('should change element if it is different', () => {
				const viewImg = new _element2.default('img');
				viewRoot.appendChildren(viewImg);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const viewP = new _element2.default('p');
				viewRoot.removeChildren(0, 1);
				viewRoot.appendChildren(viewP);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].tagName).to.equal('P');
			});

			it('should not care about filler if there is no DOM', () => {
				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');

				const viewRoot = new _element2.default('p');
				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.focusedEditable = viewRoot;

				renderer.markToSync('children', viewRoot);
				renderer.render();

				// Expect no error on render.
				expect(viewRoot).to.be.ok;
			});

			it('should add and remove inline filler in case <p>foo<b>[]</b>bar</p>', () => {
				const domSelection = document.getSelection();

				// Step 1: <p>foo<b>"FILLER{}"</b></p>
				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				expect(domRoot.childNodes.length).to.equal(1);
				expect(domRoot.childNodes[0].tagName.toLowerCase()).to.equal('p');

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(3);
				expect(domP.childNodes[0].data).to.equal('foo');
				expect(domP.childNodes[2].data).to.equal('bar');
				expect(domP.childNodes[1].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].childNodes.length).to.equal(1);
				expect(domP.childNodes[1].childNodes[0].data).to.equal(_filler.INLINE_FILLER);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[1].childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 2: No mutation on second render
				renderer.markToSync('children', viewRoot);
				renderer.markToSync('children', viewP);

				renderAndExpectNoChanges(renderer, domRoot);

				// Step 3: <p>foo{}<b></b></p>
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewP.getChild(0), 3, viewP.getChild(0), 3));

				renderer.render();

				expect(domP.childNodes.length).to.equal(3);
				expect(domP.childNodes[0].data).to.equal('foo');
				expect(domP.childNodes[2].data).to.equal('bar');
				expect(domP.childNodes[1].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].childNodes.length).to.equal(0);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(3);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 4: No mutation on second render
				renderer.markToSync('children', viewRoot);
				renderer.markToSync('children', viewP);

				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should add and remove inline filler in case <p>[]<b>foo</b></p>', () => {
				const domSelection = document.getSelection();

				// Step 1: <p>"FILLER{}"<b>foo</b></p>
				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>[]<attribute:b>foo</attribute:b></container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].data).to.equal(_filler.INLINE_FILLER);
				expect(domP.childNodes[1].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].childNodes.length).to.equal(1);
				expect(domP.childNodes[1].childNodes[0].data).to.equal('foo');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 2: No mutation on second render
				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);

				// Step 3: <p><b>{}foo</b></p>
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewP.getChild(0).getChild(0), 0, viewP.getChild(0).getChild(0), 0));

				renderer.render();

				expect(domP.childNodes.length).to.equal(1);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[0].childNodes.length).to.equal(1);
				expect(domP.childNodes[0].childNodes[0].data).to.equal('foo');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0].childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(0);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 4: No mutation on second render
				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should add and remove inline filler in case <p><b>foo</b>[]</p>', () => {
				const domSelection = document.getSelection();

				// Step 1: <p>"FILLER{}"<b>foo</b></p>
				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p><attribute:b>foo</attribute:b>[]</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[0].childNodes.length).to.equal(1);
				expect(domP.childNodes[0].childNodes[0].data).to.equal('foo');
				expect(domP.childNodes[1].data).to.equal(_filler.INLINE_FILLER);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[1]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 2: No mutation on second render
				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);

				// Step 3: <p><b>foo{}</b></p>
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewP.getChild(0).getChild(0), 3, viewP.getChild(0).getChild(0), 3));

				renderer.render();

				expect(domP.childNodes.length).to.equal(1);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[0].childNodes.length).to.equal(1);
				expect(domP.childNodes[0].childNodes[0].data).to.equal('foo');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0].childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(3);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Step 4: No mutation on second render
				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should add and remove inline filler in case <p><b>foo</b>[]<b>bar</b></p>', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p><attribute:b>foo</attribute:b>[]<attribute:b>bar</attribute:b></container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(3);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[0].childNodes.length).to.equal(1);
				expect(domP.childNodes[0].childNodes[0].data).to.equal('foo');
				expect(domP.childNodes[1].data).to.equal(_filler.INLINE_FILLER);
				expect(domP.childNodes[2].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[2].childNodes.length).to.equal(1);
				expect(domP.childNodes[2].childNodes[0].data).to.equal('bar');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[1]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;
			});

			it('should handle typing in empty block, do nothing if changes are already applied', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>[]</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(1);
				expect((0, _filler.isBlockFiller)(domP.childNodes[0], _filler.BR_FILLER)).to.be.true;

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(0);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Remove filler and add text node to both DOM and View <p>x{}</p>
				domP.removeChild(domP.childNodes[0]);
				domP.appendChild(document.createTextNode('x'));

				domSelection.removeAllRanges();
				const domRange = new Range();
				domRange.setStart(domP.childNodes[0], 1);
				domRange.collapse(true);
				domSelection.addRange(domRange);

				const viewText = new _text2.default('x');
				viewP.appendChildren(viewText);
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewText, 1, viewText, 1));

				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should handle typing in empty block, render if needed', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>[]</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(1);
				expect((0, _filler.isBlockFiller)(domP.childNodes[0], _filler.BR_FILLER)).to.be.true;

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(0);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Add text node only in View <p>x{}</p>
				const viewText = new _text2.default('x');
				viewP.appendChildren(viewText);
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewText, 1, viewText, 1));

				renderer.markToSync('children', viewP);
				renderer.render();

				expect(domP.childNodes.length).to.equal(1);
				expect(domP.childNodes[0].data).to.equal('x');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(1);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;
			});

			it('should handle removing last character', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>x{}</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(1);
				expect(domP.childNodes[0].data).to.equal('x');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(1);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Remove text and add filler to both DOM and View <p>{}</p>
				domP.removeChild(domP.childNodes[0]);
				domP.appendChild((0, _filler.BR_FILLER)(document));

				domSelection.removeAllRanges();
				const domRange = new Range();
				domRange.setStart(domP.childNodes[0], 0);
				domRange.collapse(true);
				domSelection.addRange(domRange);

				viewP.removeChildren(0);

				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewP, 0, viewP, 0));

				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should handle typing in empty attribute, do nothing if changes are already applied', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p><attribute:b>[]</attribute:b>foo</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].data).to.equal('foo');

				const domB = domP.childNodes[0];
				const viewB = viewP.getChild(0);

				expect(domB.childNodes.length).to.equal(1);
				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domB.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Add text node to both DOM and View <p><b>x</b>foo</p>
				domB.childNodes[0].data += 'x';

				domSelection.removeAllRanges();
				const domRange = new Range();
				domRange.setStart(domB.childNodes[0], _filler.INLINE_FILLER_LENGTH + 1);
				domRange.collapse(true);
				domSelection.addRange(domRange);

				const viewText = new _text2.default('x');
				viewB.appendChildren(viewText);
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewText, 1, viewText, 1));

				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should handle typing in empty attribute as a children change, render if needed', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p><attribute:b>[]</attribute:b>foo</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].data).to.equal('foo');

				const domB = domP.childNodes[0];
				const viewB = viewP.getChild(0);

				expect(domB.childNodes.length).to.equal(1);
				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domB.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Add text node only to View <p><b>x</b>foo</p>
				const viewText = new _text2.default('x');
				viewB.appendChildren(viewText);
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewText, 1, viewText, 1));

				renderer.markToSync('children', viewB);
				renderer.render();

				expect(domB.childNodes.length).to.equal(1);
				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER + 'x');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domB.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH + 1);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;
			});

			it('should handle typing in empty attribute as a text change, render if needed', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p><attribute:b>[]</attribute:b>foo</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].data).to.equal('foo');

				const domB = domP.childNodes[0];
				const viewB = viewP.getChild(0);

				expect(domB.childNodes.length).to.equal(1);
				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER);

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domB.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;

				// Add text node only to View <p><b>x</b>foo</p>
				const viewText = new _text2.default('x');
				viewB.appendChildren(viewText);
				selection.removeAllRanges();
				selection.addRange(_range2.default.createFromParentsAndOffsets(viewText, 1, viewText, 1));

				renderer.markToSync('text', viewText);
				renderer.render();

				expect(domB.childNodes.length).to.equal(1);
				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER + 'x');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domB.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(_filler.INLINE_FILLER_LENGTH + 1);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;
			});

			it('should handle not collapsed range', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>fo{o<attribute:b>b}ar</attribute:b></container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(2);
				expect(domP.childNodes[0].data).to.equal('foo');
				expect(domP.childNodes[1].tagName.toLowerCase()).to.equal('b');
				expect(domP.childNodes[1].childNodes.length).to.equal(1);
				expect(domP.childNodes[1].childNodes[0].data).to.equal('bar');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP.childNodes[0]);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(2);
				expect(domSelection.getRangeAt(0).endContainer).to.equal(domP.childNodes[1].childNodes[0]);
				expect(domSelection.getRangeAt(0).endOffset).to.equal(1);

				renderer.markToSync('children', viewP);
				renderAndExpectNoChanges(renderer, domRoot);
			});

			it('should not change selection if there is no focusedEditable', () => {
				const domDiv = (0, _createelement2.default)(document, 'div', null, 'not editable');
				document.body.appendChild(domDiv);

				const domSelection = document.getSelection();

				domSelection.removeAllRanges();
				const domRange = new Range();
				domRange.setStart(domDiv, 0);
				domRange.collapse(true);
				domSelection.addRange(domRange);

				renderer.focusedEditable = null;

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>fo{o}</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.render();

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domDiv);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(0);
				expect(domSelection.getRangeAt(0).collapsed).to.equal(true);
			});

			it('should not add ranges if different editable is focused', () => {
				const domHeader = document.createElement('h1');
				const viewHeader = new _element2.default('h1');
				document.body.appendChild(domHeader);

				domConverter.bindElements(domHeader, viewHeader);

				renderer.focusedEditable = viewHeader;

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>fo{o}</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.render();

				const domSelection = document.getSelection();
				expect(domSelection.rangeCount).to.equal(0);
			});

			it('should not add inline filler after text node', () => {
				const domSelection = document.getSelection();

				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>foo[]</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domP = domRoot.childNodes[0];

				expect(domP.childNodes.length).to.equal(1);
				expect(domP.childNodes[0].data).to.equal('foo');

				expect(domSelection.rangeCount).to.equal(1);
				expect(domSelection.getRangeAt(0).startContainer).to.equal(domP);
				expect(domSelection.getRangeAt(0).startOffset).to.equal(1);
				expect(domSelection.getRangeAt(0).collapsed).to.be.true;
			});

			it('should throw if there is no filler in expected position', () => {
				const { view: viewP, selection: newSelection } = (0, _view.parse)('<container:p>foo<attribute:b>[]</attribute:b>bar</container:p>');

				viewRoot.appendChildren(viewP);
				selection.setTo(newSelection);

				renderer.markToSync('children', viewRoot);
				renderer.render();

				const domB = domRoot.childNodes[0].childNodes[1];
				const viewB = viewP.getChild(1);

				expect(domB.childNodes[0].data).to.equal(_filler.INLINE_FILLER);

				// Remove filler.
				domB.childNodes[0].data = '';

				selection.removeAllRanges();
				renderer.markToSync('children', viewB);

				expect(() => {
					renderer.render();
				}).to.throw();
			});
		});
	});

	function renderAndExpectNoChanges(renderer, domRoot) {
		const config = {
			childList: true,
			characterData: true,
			characterDataOldValue: true,
			subtree: true
		};

		const mutationObserver = new window.MutationObserver(() => {
			throw 'There should be not mutations';
		});
		mutationObserver.observe(domRoot, config);

		renderer.render();

		const records = mutationObserver.takeRecords();
		mutationObserver.disconnect();
		expect(records.length).to.equal(0);
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
