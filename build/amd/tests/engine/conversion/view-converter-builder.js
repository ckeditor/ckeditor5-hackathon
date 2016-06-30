define('tests', ['/ckeditor5/engine/conversion/view-converter-builder.js', '/ckeditor5/engine/model/schema.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/textproxy.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/treewalker.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/matcher.js', '/ckeditor5/engine/conversion/viewconversiondispatcher.js', '/ckeditor5/engine/conversion/view-to-model-converters.js'], function (_viewConverterBuilder, _schema, _document, _element, _textproxy, _range, _treewalker, _documentfragment, _containerelement, _attributeelement, _text, _matcher, _viewconversiondispatcher, _viewToModelConverters) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _viewConverterBuilder2 = _interopRequireDefault(_viewConverterBuilder);

	var _schema2 = _interopRequireDefault(_schema);

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _textproxy2 = _interopRequireDefault(_textproxy);

	var _range2 = _interopRequireDefault(_range);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text2 = _interopRequireDefault(_text);

	var _matcher2 = _interopRequireDefault(_matcher);

	var _viewconversiondispatcher2 = _interopRequireDefault(_viewconversiondispatcher);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function modelAttributesToString(item) {
		let result = '';

		for (let attr of item.getAttributes()) {
			result += ' ' + attr[0] + '="' + attr[1] + '"';
		}

		return result;
	}

	function modelToString(item) {
		let result = '';

		if (item instanceof _textproxy2.default) {
			let attributes = modelAttributesToString(item);

			result = attributes ? '<$text' + attributes + '>' + item.text + '</$text>' : item.text;
		} else {
			let walker = new _treewalker2.default({ boundaries: _range2.default.createFromElement(item), shallow: true });

			for (let value of walker) {
				result += modelToString(value.item);
			}

			if (item instanceof _element2.default) {
				let attributes = modelAttributesToString(item);

				result = '<' + item.name + attributes + '>' + result + '</' + item.name + '>';
			}
		}

		return result;
	}

	const textAttributes = [undefined, 'linkHref', 'linkTitle', 'bold', 'italic', 'style'];
	const pAttributes = [undefined, 'class', 'important', 'theme', 'decorated', 'size'];

	describe('View converter builder', () => {
		let dispatcher, modelDoc, modelRoot, schema, objWithContext;

		beforeEach(() => {
			// `additionalData` parameter for `.convert` calls.
			objWithContext = { context: ['$root'] };

			schema = new _schema2.default();

			schema.registerItem('paragraph', '$block');
			schema.registerItem('div', '$block');
			schema.registerItem('customP', 'paragraph');
			schema.registerItem('image', '$inline');
			schema.registerItem('span', '$inline');
			schema.registerItem('MEGATRON', '$inline'); // Yes, folks, we are building MEGATRON.
			schema.registerItem('abcd', '$inline');
			schema.allow({ name: '$inline', attributes: textAttributes, inside: '$root' });
			schema.allow({ name: 'image', attributes: ['src'], inside: '$root' });
			schema.allow({ name: 'image', attributes: ['src'], inside: '$block' });
			schema.allow({ name: '$text', attributes: textAttributes, inside: '$block' });
			schema.allow({ name: '$text', attributes: textAttributes, inside: '$root' });
			schema.allow({ name: 'paragraph', attributes: pAttributes, inside: '$root' });
			schema.allow({ name: 'span', attributes: ['transformer'], inside: '$root' });
			schema.allow({ name: 'div', attributes: ['class'], inside: '$root' });

			dispatcher = new _viewconversiondispatcher2.default({ schema });
			dispatcher.on('text', (0, _viewToModelConverters.convertText)());

			modelDoc = new _document2.default();
			modelRoot = modelDoc.createRoot('root', '$root');
		});

		it('should convert from view element to model element', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			const result = dispatcher.convert(new _containerelement2.default('p', null, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);

			expect(modelToString(result)).to.equal('<paragraph>foo</paragraph>');
		});

		it('should convert from view element to model element using creator function', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('img').toElement(viewElement => new _element2.default('image', { src: viewElement.getAttribute('src') }));

			const result = dispatcher.convert(new _containerelement2.default('img', { src: 'foo.jpg' }), objWithContext);
			modelRoot.appendChildren(result);

			expect(modelToString(result)).to.equal('<image src="foo.jpg"></image>');
		});

		it('should convert from view element to model attribute', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('strong').toAttribute('bold', true);

			const result = dispatcher.convert(new _attributeelement2.default('strong', null, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);

			// Have to check root because result is a ModelText.
			expect(modelToString(modelRoot)).to.equal('<$root><$text bold="true">foo</$text></$root>');
		});

		it('should convert from view element to model attributes using creator function', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('a').toAttribute(viewElement => ({ key: 'linkHref', value: viewElement.getAttribute('href') }));

			const result = dispatcher.convert(new _attributeelement2.default('a', { href: 'foo.html' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);

			// Have to check root because result is a ModelText.
			expect(modelToString(modelRoot)).to.equal('<$root><$text linkHref="foo.html">foo</$text></$root>');
		});

		it('should convert from view attribute to model attribute', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class').toAttribute(viewElement => ({ key: 'class', value: viewElement.getAttribute('class') }));

			const result = dispatcher.convert(new _containerelement2.default('p', { class: 'myClass' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);

			expect(modelToString(result)).to.equal('<paragraph class="myClass">foo</paragraph>');
		});

		it('should convert from view attribute and key to model attribute', () => {
			dispatcher.on('documentFragment', (0, _viewToModelConverters.convertToModelFragment)());

			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');
			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class', 'important').toAttribute('important', true);
			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class', 'theme-nice').toAttribute('theme', 'nice');

			const viewStructure = new _documentfragment2.default([new _containerelement2.default('p', { class: 'important' }, new _text2.default('foo')), new _containerelement2.default('p', { class: 'important theme-nice' }, new _text2.default('bar'))]);

			const result = dispatcher.convert(viewStructure, objWithContext);

			expect(modelToString(result)).to.equal('<paragraph important="true">foo</paragraph><paragraph important="true" theme="nice">bar</paragraph>');
		});

		it('should convert from multiple view entities to model attribute', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('strong').fromElement('b').fromAttribute('class', 'bold').fromAttribute('style', { 'font-weight': 'bold' }).toAttribute('bold', true);

			const viewElement = new _containerelement2.default('p', null, [new _attributeelement2.default('strong', null, new _text2.default('aaa')), new _attributeelement2.default('b', null, new _text2.default('bbb')), new _containerelement2.default('span', { class: 'bold' }, new _text2.default('ccc')), new _containerelement2.default('span', { style: 'font-weight:bold; font-size:20px' }, new _text2.default('ddd'))]);

			const result = dispatcher.convert(viewElement, objWithContext);
			modelRoot.appendChildren(result);

			expect(modelToString(result)).to.equal('<paragraph><$text bold="true">aaabbbcccddd</$text></paragraph>');
		});

		it('should convert from pattern to model element', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).from({ name: 'span', class: 'megatron', attribute: { head: 'megatron', body: 'megatron', legs: 'megatron' } }).toElement('MEGATRON');

			// Adding callbacks later so they are called later. MEGATRON callback is more important.
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('span').toElement('span');
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			let result;

			// Not quite megatron.
			result = dispatcher.convert(new _containerelement2.default('span', { class: 'megatron' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<span>foo</span>');

			// Almost a megatron. Missing a head.
			result = dispatcher.convert(new _containerelement2.default('span', { class: 'megatron', body: 'megatron', legs: 'megatron' }, new _text2.default('foo')), objWithContext);

			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<span>foo</span>');

			// This would be a megatron but is a paragraph.
			result = dispatcher.convert(new _containerelement2.default('p', { class: 'megatron', body: 'megatron', legs: 'megatron', head: 'megatron' }, new _text2.default('foo')), objWithContext);

			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<paragraph>foo</paragraph>');

			// At last we have a megatron!
			result = dispatcher.convert(new _containerelement2.default('span', { class: 'megatron', body: 'megatron', legs: 'megatron', head: 'megatron' }, new _text2.default('foo')), objWithContext);

			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<MEGATRON>foo</MEGATRON>');
		});

		it('should convert from pattern to model attribute', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('span').toElement('span');

			// This time without name so default span converter will convert children.
			(0, _viewConverterBuilder2.default)(dispatcher).from({ class: 'megatron', attribute: { head: 'megatron', body: 'megatron', legs: 'megatron' } }).toAttribute('transformer', 'megatron');

			let viewElement = new _containerelement2.default('span', { class: 'megatron', body: 'megatron', legs: 'megatron', head: 'megatron' }, new _text2.default('foo'));

			let result = dispatcher.convert(viewElement, objWithContext);

			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<span transformer="megatron">foo</span>');
		});

		it('should set different priorities for `toElement` and `toAttribute` conversion', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class').toAttribute(viewElement => ({ key: 'class', value: viewElement.getAttribute('class') }));
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			let result = dispatcher.convert(new _containerelement2.default('p', { class: 'myClass' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);

			// Element converter was fired first even though attribute converter was added first.
			expect(modelToString(result)).to.equal('<paragraph class="myClass">foo</paragraph>');
		});

		it('should overwrite default priorities for converters', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');
			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class').toAttribute(viewElement => ({ key: 'class', value: viewElement.getAttribute('class') }));

			let result;

			result = dispatcher.convert(new _containerelement2.default('p', { class: 'myClass' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<paragraph class="myClass">foo</paragraph>');

			(0, _viewConverterBuilder2.default)(dispatcher).from({ name: 'p', class: 'myClass' }).withPriority(-1) // Default for `toElement` is 0.
			.toElement('customP');

			result = dispatcher.convert(new _containerelement2.default('p', { class: 'myClass' }, new _text2.default('foo')), objWithContext);
			modelRoot.appendChildren(result);
			expect(modelToString(result)).to.equal('<customP>foo</customP>');
		});

		it('should overwrite default consumed values', () => {
			// Converter (1).
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			// Converter (2).
			(0, _viewConverterBuilder2.default)(dispatcher).from({ name: 'p', class: 'decorated' }).consuming({ class: 'decorated' }).toAttribute('decorated', true);

			// Converter (3).
			(0, _viewConverterBuilder2.default)(dispatcher).fromAttribute('class', 'small').consuming({ class: 'small' }).toAttribute('size', 'small');

			const viewElement = new _containerelement2.default('p', { class: 'decorated small' }, new _text2.default('foo'));

			const result = dispatcher.convert(viewElement, objWithContext);
			modelRoot.appendChildren(result);

			// P element and it's children got converted by the converter (1) and the converter (1) got fired
			// because P name was not consumed in converter (2). Converter (3) could consume class="small" because
			// only class="decorated" was consumed in converter (2).
			expect(modelToString(result)).to.equal('<paragraph decorated="true" size="small">foo</paragraph>');
		});

		it('should convert from matcher instance to model', () => {
			// Universal class converter, synonymous to .fromAttribute( 'class' ).
			(0, _viewConverterBuilder2.default)(dispatcher).from(new _matcher2.default({ class: /.*/ })).toAttribute(viewElement => ({ key: 'class', value: viewElement.getAttribute('class') }));

			// Universal element converter.
			(0, _viewConverterBuilder2.default)(dispatcher).from(new _matcher2.default({ name: /.*/ })).toElement(viewElement => new _element2.default(viewElement.name));

			let viewStructure = new _containerelement2.default('div', { class: 'myClass' }, [new _containerelement2.default('abcd', null, new _text2.default('foo'))]);

			let result = dispatcher.convert(viewStructure, objWithContext);
			modelRoot.appendChildren(result);

			expect(modelToString(result)).to.equal('<div class="myClass"><abcd>foo</abcd></div>');
		});

		it('should filter out structure that is wrong with schema', () => {
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('strong').toAttribute('bold', true);
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('div').toElement('div');
			(0, _viewConverterBuilder2.default)(dispatcher).fromElement('p').toElement('paragraph');

			schema.disallow({ name: '$text', attributes: 'bold', inside: 'paragraph' });
			schema.disallow({ name: 'div', inside: '$root' });

			dispatcher.on('element', (0, _viewToModelConverters.convertToModelFragment)());

			let viewElement = new _containerelement2.default('div', null, new _containerelement2.default('p', null, new _attributeelement2.default('strong', null, new _text2.default('foo'))));

			let result = dispatcher.convert(viewElement, objWithContext);

			expect(modelToString(result)).to.equal('<paragraph>foo</paragraph>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
