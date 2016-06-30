define('tests', ['/ckeditor5/engine/conversion/model-converter-builder.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/conversion/modelconversiondispatcher.js', '/ckeditor5/engine/conversion/model-to-view-converters.js', '/ckeditor5/engine/conversion/model-selection-to-view-converters.js'], function (_modelConverterBuilder, _document, _element, _text, _range, _position, _document3, _element3, _containerelement, _attributeelement, _text3, _mapper, _modelconversiondispatcher, _modelToViewConverters, _modelSelectionToViewConverters) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _modelConverterBuilder2 = _interopRequireDefault(_modelConverterBuilder);

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _document4 = _interopRequireDefault(_document3);

	var _element4 = _interopRequireDefault(_element3);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text4 = _interopRequireDefault(_text3);

	var _mapper2 = _interopRequireDefault(_mapper);

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	describe('Model converter builder', () => {
		let dispatcher, mapper;
		let modelDoc, modelRoot;
		let viewDoc, viewRoot, writer, viewSelection;

		beforeEach(() => {
			modelDoc = new _document2.default();
			modelRoot = modelDoc.createRoot('root', 'root');

			viewDoc = new _document4.default();
			viewRoot = viewDoc.createRoot('div');
			writer = viewDoc.writer;
			viewSelection = viewDoc.selection;

			mapper = new _mapper2.default();
			mapper.bindElements(modelRoot, viewRoot);

			dispatcher = new _modelconversiondispatcher2.default({ writer, mapper, viewSelection });

			dispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
			dispatcher.on('move', (0, _modelToViewConverters.move)());
			dispatcher.on('remove', (0, _modelToViewConverters.remove)());
		});

		describe('model element to view element conversion', () => {
			it('using passed view element name', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('paragraph').toElement('p');

				let modelElement = new _element2.default('paragraph', null, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
			});

			it('using passed view element', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('image').toElement(new _containerelement2.default('img'));

				let modelElement = new _element2.default('image');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><img></img></div>');
			});

			it('using passed creator function', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('header').toElement(data => new _containerelement2.default('h' + data.item.getAttribute('level')));

				let modelElement = new _element2.default('header', { level: 2 }, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><h2>foobar</h2></div>');
			});
		});

		describe('model attribute to view element conversion', () => {
			beforeEach(() => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('paragraph').toElement('p');
			});

			it('using passed view element name', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('bold').toElement('strong');

				let modelElement = new _text2.default('foo', { bold: true });
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><strong>foo</strong></div>');

				for (let value of _range2.default.createFromElement(modelRoot)) {
					value.item.removeAttribute('bold');
				}

				dispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelRoot), 'bold', true, null);

				expect(viewToString(viewRoot)).to.equal('<div>foo</div>');
			});

			it('using passed view element', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('bold').toElement(new _attributeelement2.default('strong'));

				let modelElement = new _text2.default('foo', { bold: true });
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><strong>foo</strong></div>');

				for (let value of _range2.default.createFromElement(modelRoot)) {
					value.item.removeAttribute('bold');
				}

				dispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelRoot), 'bold', true, null);

				expect(viewToString(viewRoot)).to.equal('<div>foo</div>');
			});

			it('using passed creator function', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('italic').toElement(value => new _attributeelement2.default(value));

				let modelElement = new _text2.default('foo', { italic: 'em' });
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><em>foo</em></div>');

				for (let value of _range2.default.createFromElement(modelRoot)) {
					value.item.setAttribute('italic', 'i');
				}

				dispatcher.convertAttribute('changeAttribute', _range2.default.createFromElement(modelRoot), 'italic', 'em', 'i');

				expect(viewToString(viewRoot)).to.equal('<div><i>foo</i></div>');

				for (let value of _range2.default.createFromElement(modelRoot)) {
					value.item.removeAttribute();
				}

				dispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelRoot), 'italic', 'i', null);

				expect(viewToString(viewRoot)).to.equal('<div>foo</div>');
			});

			it('selection conversion', () => {
				// This test requires collapsed range selection converter (breaking attributes)  and clearing "artifacts".
				dispatcher.on('selection', (0, _modelSelectionToViewConverters.clearAttributes)());
				dispatcher.on('selection', (0, _modelSelectionToViewConverters.convertCollapsedSelection)());

				// Model converter builder should add selection converter.
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('italic').toElement(value => new _attributeelement2.default(value));

				modelRoot.appendChildren(new _text2.default('foo', { italic: 'em' }));

				// Set collapsed selection after "f".
				const position = new _position2.default(modelRoot, [1]);
				modelDoc.selection.setRanges([new _range2.default(position, position)]);
				modelDoc.selection._updateAttributes();

				// Convert stuff.
				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));
				dispatcher.convertSelection(modelDoc.selection);

				// Check if view structure is ok.
				expect(viewToString(viewRoot)).to.equal('<div><em>foo</em></div>');

				// Check if view selection is collapsed after "f" letter.
				let ranges = Array.from(viewSelection.getRanges());
				expect(ranges.length).to.equal(1);
				expect(ranges[0].start.isEqual(ranges[0].end)).to.be.true;
				expect(ranges[0].start.parent).to.be.instanceof(_text4.default); // "foo".
				expect(ranges[0].start.offset).to.equal(1);

				// Change selection attribute, convert it.
				modelDoc.selection.setAttribute('italic', 'i');
				dispatcher.convertSelection(modelDoc.selection);

				// Check if view structure has changed.
				expect(viewToString(viewRoot)).to.equal('<div><em>f</em><i></i><em>oo</em></div>');

				// Check if view selection is inside new <em> element.
				ranges = Array.from(viewSelection.getRanges());
				expect(ranges.length).to.equal(1);
				expect(ranges[0].start.isEqual(ranges[0].end)).to.be.true;
				expect(ranges[0].start.parent.name).to.equal('i');
				expect(ranges[0].start.offset).to.equal(0);

				// Some more tests checking how selection attributes changes are converted:
				modelDoc.selection.removeAttribute('italic');
				dispatcher.convertSelection(modelDoc.selection);

				expect(viewToString(viewRoot)).to.equal('<div><em>f</em><em>oo</em></div>');
				ranges = Array.from(viewSelection.getRanges());
				expect(ranges[0].start.parent.name).to.equal('div');
				expect(ranges[0].start.offset).to.equal(1);

				modelDoc.selection.setAttribute('italic', 'em');
				dispatcher.convertSelection(modelDoc.selection);

				expect(viewToString(viewRoot)).to.equal('<div><em>foo</em></div>');
				ranges = Array.from(viewSelection.getRanges());
				expect(ranges.length).to.equal(1);
				expect(ranges[0].start.isEqual(ranges[0].end)).to.be.true;
				expect(ranges[0].start.parent).to.be.instanceof(_text4.default); // "foo".
				expect(ranges[0].start.offset).to.equal(1);
			});
		});

		describe('model attribute to view attribute conversion', () => {
			beforeEach(() => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('paragraph').toElement('p');
			});

			it('using default 1-to-1 conversion', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('class').toAttribute();

				let modelElement = new _element2.default('paragraph', { class: 'myClass' }, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><p class="myClass">foobar</p></div>');

				modelElement.setAttribute('class', 'newClass');
				dispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'class', 'myClass', 'newClass');

				expect(viewToString(viewRoot)).to.equal('<div><p class="newClass">foobar</p></div>');

				modelElement.removeAttribute('class');
				dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'class', 'newClass', null);

				expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
			});

			it('using passed attribute key', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('theme').toAttribute('class');

				let modelElement = new _element2.default('paragraph', { theme: 'abc' }, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><p class="abc">foobar</p></div>');

				modelElement.setAttribute('theme', 'xyz');
				dispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'theme', 'abc', 'xyz');

				expect(viewToString(viewRoot)).to.equal('<div><p class="xyz">foobar</p></div>');

				modelElement.removeAttribute('theme');
				dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'theme', 'xyz', null);

				expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
			});

			it('using passed attribute key and value', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('highlighted').toAttribute('style', 'background:yellow');

				let modelElement = new _element2.default('paragraph', { 'highlighted': true }, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><p style="background:yellow;">foobar</p></div>');

				modelElement.removeAttribute('highlighted');
				dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'highlighted', true, null);

				expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
			});

			it('using passed attribute creator function', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromAttribute('theme').toAttribute(value => ({ key: 'class', value: value + '-theme' }));

				let modelElement = new _element2.default('paragraph', { theme: 'nice' }, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><p class="nice-theme">foobar</p></div>');

				modelElement.setAttribute('theme', 'good');
				dispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'theme', 'nice', 'good');

				expect(viewToString(viewRoot)).to.equal('<div><p class="good-theme">foobar</p></div>');

				modelElement.removeAttribute('theme');
				dispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'theme', 'good', null);

				expect(viewToString(viewRoot)).to.equal('<div><p>foobar</p></div>');
			});
		});

		describe('withPriority', () => {
			it('should change default converters priority', () => {
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('custom').toElement('custom');
				(0, _modelConverterBuilder2.default)(dispatcher).fromElement('custom').withPriority(0).toElement('other');

				let modelElement = new _element2.default('custom', null, 'foobar');
				modelRoot.appendChildren(modelElement);

				dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

				expect(viewToString(viewRoot)).to.equal('<div><other>foobar</other></div>');
			});
		});

		it('should do nothing on model element to view attribute conversion', () => {
			(0, _modelConverterBuilder2.default)(dispatcher).fromElement('div').toElement('div');
			// Should do nothing:
			(0, _modelConverterBuilder2.default)(dispatcher).fromElement('paragraph').toAttribute('paragraph', true);
			// If above would do something this one would not be fired:
			(0, _modelConverterBuilder2.default)(dispatcher).fromElement('paragraph').toElement('p');

			let modelElement = new _element2.default('div', null, new _element2.default('paragraph', null, 'foobar'));
			modelRoot.appendChildren(modelElement);

			dispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><div><p>foobar</p></div></div>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
