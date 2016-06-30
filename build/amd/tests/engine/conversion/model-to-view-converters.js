define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/conversion/modelconversiondispatcher.js', '/ckeditor5/engine/conversion/model-to-view-converters.js'], function (_document, _element, _text, _range, _position, _element3, _containerelement, _attributeelement, _text3, _writer, _mapper, _modelconversiondispatcher, _modelToViewConverters) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _element4 = _interopRequireDefault(_element3);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text4 = _interopRequireDefault(_text3);

	var _writer2 = _interopRequireDefault(_writer);

	var _mapper2 = _interopRequireDefault(_mapper);

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let dispatcher, modelDoc, modelRoot, mapper, viewRoot, writer;

	beforeEach(() => {
		modelDoc = new _document2.default();
		modelRoot = modelDoc.createRoot('root');
		viewRoot = new _containerelement2.default('div');

		mapper = new _mapper2.default();
		mapper.bindElements(modelRoot, viewRoot);

		writer = new _writer2.default();

		dispatcher = new _modelconversiondispatcher2.default({ mapper, writer });
	});

	function viewAttributesToString(item) {
		let result = '';

		for (let key of item.getAttributeKeys()) {
			let value = item.getAttribute(key);

			if (value) {
				result += ' ' + key + '="' + value + '"';
			}
		}

		return result;
	}

	function viewToString(item) {
		let result = '';

		if (item instanceof _text4.default) {
			result = item.data;
		} else {
			// ViewElement or ViewDocumentFragment.
			for (let child of item.getChildren()) {
				result += viewToString(child);
			}

			if (item instanceof _element4.default) {
				result = '<' + item.name + viewAttributesToString(item) + '>' + result + '</' + item.name + '>';
			}
		}

		return result;
	}

	describe('insertText', () => {
		it('should convert text insertion in model to view text', () => {
			modelRoot.appendChildren('foobar');
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div>foobar</div>');
		});
	});

	describe('insertElement', () => {
		it('should convert element insertion in model to and map positions for future converting', () => {
			const modelElement = new _element2.default('paragraph', null, 'foobar');
			const viewElement = new _containerelement2.default('p');

			modelRoot.appendChildren(modelElement);
			dispatcher.on('insert:paragraph', (0, _modelToViewConverters.insertElement)(viewElement));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
		});

		it('should take view element function generator as a parameter', () => {
			const elementGenerator = (data, consumable) => {
				if (consumable.consume(data.item, 'addAttribute:nice')) {
					return new _containerelement2.default('div');
				} else {
					return new _containerelement2.default('p');
				}
			};
			const niceP = new _element2.default('myParagraph', { nice: true }, 'foo');
			const badP = new _element2.default('myParagraph', null, 'bar');

			modelRoot.appendChildren([niceP, badP]);

			dispatcher.on('insert:myParagraph', (0, _modelToViewConverters.insertElement)(elementGenerator));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><div>foo</div><p>bar</p></div>');
		});
	});

	describe('setAttribute/removeAttribute', () => {
		it('should convert attribute insert/change/remove on a model node', () => {
			const modelElement = new _element2.default('paragraph', { class: 'foo' }, 'foobar');
			const viewElement = new _containerelement2.default('p');

			modelRoot.appendChildren(modelElement);
			dispatcher.on('insert:paragraph', (0, _modelToViewConverters.insertElement)(viewElement));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('addAttribute:class', (0, _modelToViewConverters.setAttribute)());
			dispatcher.on('changeAttribute:class', (0, _modelToViewConverters.setAttribute)());
			dispatcher.on('removeAttribute:class', (0, _modelToViewConverters.removeAttribute)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><p class="foo">foobar</p></div>');

			modelElement.setAttribute('class', 'bar');
			dispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'class', 'foo', 'bar');

			expect(viewToString(viewRoot)).to.equal('<div><p class="bar">foobar</p></div>');

			modelElement.removeAttribute('class');
			dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'class', 'bar', null);

			expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
		});

		it('should convert insert/change/remove with attribute generating function as a parameter', () => {
			const modelParagraph = new _element2.default('paragraph', { theme: 'nice' }, 'foobar');
			const modelDiv = new _element2.default('div', { theme: 'nice' });

			const themeConverter = (value, key, data) => {
				if (data.item instanceof _element2.default && data.item.getChildCount() > 0) {
					value += ' ' + 'fix-content';
				}

				return { key: 'class', value };
			};

			modelRoot.appendChildren([modelParagraph, modelDiv]);
			dispatcher.on('insert:paragraph', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('p')));
			dispatcher.on('insert:div', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('div')));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('addAttribute:theme', (0, _modelToViewConverters.setAttribute)(themeConverter));
			dispatcher.on('changeAttribute:theme', (0, _modelToViewConverters.setAttribute)(themeConverter));
			dispatcher.on('removeAttribute:theme', (0, _modelToViewConverters.removeAttribute)(themeConverter));

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><p class="nice fix-content">foobar</p><div class="nice"></div></div>');

			modelParagraph.setAttribute('theme', 'awesome');
			dispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelParagraph), 'theme', 'nice', 'awesome');

			expect(viewToString(viewRoot)).to.equal('<div><p class="awesome fix-content">foobar</p><div class="nice"></div></div>');

			modelParagraph.removeAttribute('theme');
			dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelParagraph), 'theme', 'awesome', null);

			expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p><div class="nice"></div></div>');
		});
	});

	describe('wrap/unwrap', () => {
		it('should convert insert/change/remove of attribute in model into wrapping element in a view', () => {
			const modelElement = new _element2.default('paragraph', null, new _text2.default('foobar', { bold: true }));
			const viewP = new _containerelement2.default('p');
			const viewB = new _attributeelement2.default('b');

			modelRoot.appendChildren(modelElement);
			dispatcher.on('insert:paragraph', (0, _modelToViewConverters.insertElement)(viewP));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('addAttribute:bold', (0, _modelToViewConverters.wrap)(viewB));
			dispatcher.on('removeAttribute:bold', (0, _modelToViewConverters.unwrap)(viewB));

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><p><b>foobar</b></p></div>');

			for (let value of _range2.default.createFromElement(modelElement)) {
				value.item.removeAttribute('bold');
			}

			dispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelElement), 'bold', true, null);

			expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
		});

		it('should convert insert/remove of attribute in model with wrapping element generating function as a parameter', () => {
			const modelElement = new _element2.default('paragraph', null, new _text2.default('foobar', { style: 'bold' }));
			const viewP = new _containerelement2.default('p');

			const elementGenerator = value => {
				if (value == 'bold') {
					return new _attributeelement2.default('b');
				}
			};

			modelRoot.appendChildren(modelElement);
			dispatcher.on('insert:paragraph', (0, _modelToViewConverters.insertElement)(viewP));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('addAttribute:style', (0, _modelToViewConverters.wrap)(elementGenerator));
			dispatcher.on('removeAttribute:style', (0, _modelToViewConverters.unwrap)(elementGenerator));

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><p><b>foobar</b></p></div>');

			for (let value of _range2.default.createFromElement(modelElement)) {
				value.item.removeAttribute('style');
			}

			dispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelElement), 'style', 'bold', null);

			expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
		});
	});

	describe('move', () => {
		it('should move items in view accordingly to changes in model', () => {
			const modelDivA = new _element2.default('div', null, ['foo', new _element2.default('image')]);
			const modelDivB = new _element2.default('div', null, ['xxyy']);

			modelRoot.appendChildren([modelDivA, modelDivB]);
			dispatcher.on('insert:div', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('div')));
			dispatcher.on('insert:image', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('img')));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('move', (0, _modelToViewConverters.move)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			const removedNodes = modelDivA.removeChildren(2, 2);
			modelDivB.insertChildren(2, removedNodes);

			dispatcher.convertMove(_position2.default.createFromParentAndOffset(modelDivA, 2), _range2.default.createFromParentsAndOffsets(modelDivB, 2, modelDivB, 4));

			expect(viewToString(viewRoot)).to.equal('<div><div>fo</div><div>xxo<img></img>yy</div></div>');
		});
	});

	describe('remove', () => {
		it('should remove items from view accordingly to changes in model', () => {
			const modelDiv = new _element2.default('div', null, ['foo', new _element2.default('image')]);

			modelRoot.appendChildren(modelDiv);
			dispatcher.on('insert:div', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('div')));
			dispatcher.on('insert:image', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('img')));
			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('remove', (0, _modelToViewConverters.remove)());

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			const removedNodes = modelDiv.removeChildren(2, 2);
			modelDoc.graveyard.insertChildren(2, removedNodes);

			dispatcher.convertRemove(_position2.default.createFromParentAndOffset(modelDiv, 2), _range2.default.createFromParentsAndOffsets(modelDoc.graveyard, 0, modelDoc.graveyard, 2));

			expect(viewToString(viewRoot)).to.equal('<div><div>fo</div></div>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
