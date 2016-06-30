define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/textproxy.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/treewalker.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/writer.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/conversion/mapper.js', '/ckeditor5/engine/conversion/modelconversiondispatcher.js', '/ckeditor5/engine/conversion/viewconversiondispatcher.js', '/ckeditor5/engine/conversion/model-to-view-converters.js', '/ckeditor5/engine/conversion/view-to-model-converters.js'], function (_document, _documentfragment, _element, _text, _textproxy, _range, _position, _treewalker, _element3, _containerelement, _attributeelement, _text3, _writer, _position3, _range3, _mapper, _modelconversiondispatcher, _viewconversiondispatcher, _modelToViewConverters, _viewToModelConverters) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _textproxy2 = _interopRequireDefault(_textproxy);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _element4 = _interopRequireDefault(_element3);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _text4 = _interopRequireDefault(_text3);

	var _writer2 = _interopRequireDefault(_writer);

	var _position4 = _interopRequireDefault(_position3);

	var _range4 = _interopRequireDefault(_range3);

	var _mapper2 = _interopRequireDefault(_mapper);

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	var _viewconversiondispatcher2 = _interopRequireDefault(_viewconversiondispatcher);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let modelDoc, modelRoot, viewRoot, mapper, writer, modelDispatcher, viewDispatcher;

	beforeEach(() => {
		modelDoc = new _document2.default();
		modelRoot = modelDoc.createRoot('root');
		viewRoot = new _containerelement2.default('div');

		mapper = new _mapper2.default();
		mapper.bindElements(modelRoot, viewRoot);

		writer = new _writer2.default();

		modelDispatcher = new _modelconversiondispatcher2.default({ mapper, writer });
		// Schema is mocked up because we don't care about it in those tests.
		viewDispatcher = new _viewconversiondispatcher2.default({ schema: { check: () => true } });

		modelDispatcher.on('insert:$text', (0, _modelToViewConverters.insertText)());
		modelDispatcher.on('move', (0, _modelToViewConverters.move)());
		modelDispatcher.on('remove', (0, _modelToViewConverters.remove)());
		viewDispatcher.on('text', (0, _viewToModelConverters.convertText)());
		viewDispatcher.on('documentFragment', (0, _viewToModelConverters.convertToModelFragment)());
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

	// Converter for custom `image` element that might have a `caption` element inside which changes
	// how the image is displayed in the view:
	//
	// Model:
	//
	// [image {src="foo.jpg" title="foo"}]
	//   └─ [caption]
	//       ├─ f
	//       ├─ o
	//       └─ o
	//
	// [image {src="bar.jpg" title="bar"}]
	//
	// View:
	//
	// <figure>
	//   ├─ <img src="foo.jpg" title="foo" />
	//   └─ <caption>
	//       └─ foo
	//
	// <img src="bar.jpg" title="bar" />
	describe('image with caption converters', () => {
		beforeEach(() => {
			const modelImageConverter = function (evt, data, consumable, conversionApi) {
				// First, consume the `image` element.
				consumable.consume(data.item, 'insert');

				// Just create normal image element for the view.
				// Maybe it will be "decorated" later.
				const viewImage = new _containerelement2.default('img');
				const insertPosition = conversionApi.mapper.toViewPosition(data.range.start);

				// Check if the `image` element has children.
				if (data.item.getChildCount() > 0) {
					const modelCaption = data.item.getChild(0);

					// `modelCaption` insertion change is consumed from consumable values.
					// It will not be converted by other converters, but it's children (probably some text) will be.
					// Through mapping, converters for text will know where to insert contents of `modelCaption`.
					if (consumable.consume(modelCaption, 'insert')) {
						const viewCaption = new _containerelement2.default('figcaption');

						const viewImageHolder = new _containerelement2.default('figure', null, [viewImage, viewCaption]);

						conversionApi.mapper.bindElements(modelCaption, viewCaption);
						conversionApi.mapper.bindElements(data.item, viewImageHolder);
						conversionApi.writer.insert(insertPosition, viewImageHolder);
					}
				} else {
					conversionApi.mapper.bindElements(data.item, viewImage);
					conversionApi.writer.insert(insertPosition, viewImage);
				}

				evt.stop();
			};

			const modelImageAttributesConverter = function (evt, data, consumable, conversionApi) {
				if (data.item.name != 'image') {
					return;
				}

				let viewElement = conversionApi.mapper.toViewElement(data.item);

				if (viewElement.name == 'figure') {
					viewElement = viewElement.getChild(0);
				}

				consumable.consume(data.item, (0, _modelToViewConverters.eventNameToConsumableType)(evt.name));

				if (!data.attributeNewValue) {
					viewElement.removeAttribute(data.attributeKey);
				} else {
					viewElement.setAttribute(data.attributeKey, data.attributeNewValue);
				}

				evt.stop();
			};

			const viewFigureConverter = function (evt, data, consumable, conversionApi) {
				if (consumable.consume(data.input, { name: true })) {
					const modelImage = conversionApi.convertItem(data.input.getChild(0), consumable);
					const modelCaption = conversionApi.convertItem(data.input.getChild(1), consumable);

					modelImage.appendChildren(modelCaption);

					data.output = modelImage;
				}
			};

			const viewImageConverter = function (evt, data, consumable) {
				if (consumable.consume(data.input, { name: true })) {
					const modelImage = new _element2.default('image');

					for (let attributeKey of data.input.getAttributeKeys()) {
						modelImage.setAttribute(attributeKey, data.input.getAttribute(attributeKey));
					}

					data.output = modelImage;
				}
			};

			const viewFigcaptionConverter = function (evt, data, consumable, conversionApi) {
				if (consumable.consume(data.input, { name: true })) {
					const modelCaption = new _element2.default('caption');
					const children = conversionApi.convertChildren(data.input, consumable);

					modelCaption.appendChildren(children);

					data.output = modelCaption;
				}
			};

			modelDispatcher.on('insert:image', modelImageConverter);
			modelDispatcher.on('addAttribute', modelImageAttributesConverter);
			modelDispatcher.on('changeAttribute', modelImageAttributesConverter);
			modelDispatcher.on('removeAttribute', modelImageAttributesConverter);
			viewDispatcher.on('element:figure', viewFigureConverter);
			viewDispatcher.on('element:img', viewImageConverter);
			viewDispatcher.on('element:figcaption', viewFigcaptionConverter);
		});

		it('should convert model images changes without caption to view', () => {
			let modelElement = new _element2.default('image', { src: 'bar.jpg', title: 'bar' });
			modelRoot.appendChildren(modelElement);
			modelDispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><img src="bar.jpg" title="bar"></img></div>');

			modelElement.setAttribute('src', 'new.jpg');
			modelElement.removeAttribute('title');
			modelDispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'src', 'bar.jpg', 'new.jpg');
			modelDispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'title', 'bar', null);

			expect(viewToString(viewRoot)).to.equal('<div><img src="new.jpg"></img></div>');
		});

		it('should convert model images changes with caption to view', () => {
			let modelElement = new _element2.default('image', { src: 'foo.jpg', title: 'foo' }, new _element2.default('caption', {}, 'foobar'));
			modelRoot.appendChildren(modelElement);
			modelDispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div><figure><img src="foo.jpg" title="foo"></img><figcaption>foobar</figcaption></figure></div>');

			modelElement.setAttribute('src', 'new.jpg');
			modelElement.removeAttribute('title');
			modelDispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'src', 'bar.jpg', 'new.jpg');
			modelDispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'title', 'bar', null);

			expect(viewToString(viewRoot)).to.equal('<div><figure><img src="new.jpg"></img><figcaption>foobar</figcaption></figure></div>');
		});

		it('should convert view image to model', () => {
			let viewElement = new _containerelement2.default('img', { src: 'bar.jpg', title: 'bar' });
			let modelElement = viewDispatcher.convert(viewElement);
			// Attaching to tree so tree walker works fine in `modelToString`.
			modelRoot.appendChildren(modelElement);

			expect(modelToString(modelElement)).to.equal('<image src="bar.jpg" title="bar"></image>');
		});

		it('should convert view figure to model', () => {
			let viewElement = new _containerelement2.default('figure', null, [new _containerelement2.default('img', { src: 'bar.jpg', title: 'bar' }), new _containerelement2.default('figcaption', null, new _text4.default('foobar'))]);
			let modelElement = viewDispatcher.convert(viewElement);
			// Attaching to tree so tree walker works fine in `modelToString`.
			modelRoot.appendChildren(modelElement);

			expect(modelToString(modelElement)).to.equal('<image src="bar.jpg" title="bar"><caption>foobar</caption></image>');
		});
	});

	// Converter overwrites default attribute converter for `linkHref` and `linkTitle` attribute is set on `quote` element.
	//
	// Model:
	//
	// [quote {linkHref='foo.html' linkTitle='Foo source'}]
	//   ├─ f
	//   ├─ o
	//   └─ o
	//
	// foo {linkHref='foo.html' linkTitle='Foo title'}
	//
	// View:
	//
	// <blockquote>
	//	 ├─ foo
	//	 └─ <a href="foo.html" title="Foo source">
	//	 	  └─ see source
	//
	// <a href="foo.html" title="Foo title">
	//	 └─ foo
	describe('custom attribute handling for given element', () => {
		beforeEach(() => {
			// NORMAL LINK MODEL TO VIEW CONVERTERS
			modelDispatcher.on('addAttribute:linkHref', (0, _modelToViewConverters.wrap)(value => new _attributeelement2.default('a', { href: value })), null, 99);
			modelDispatcher.on('addAttribute:linkTitle', (0, _modelToViewConverters.wrap)(value => new _attributeelement2.default('a', { title: value })), null, 99);

			const changeLinkAttribute = function (elementCreator) {
				return (evt, data, consumable, conversionApi) => {
					consumable.consume(data.item, (0, _modelToViewConverters.eventNameToConsumableType)(evt.name));

					const viewRange = conversionApi.mapper.toViewRange(data.range);
					const viewOldA = elementCreator(data.attributeOldValue);
					const viewNewA = elementCreator(data.attributeNewValue);

					conversionApi.writer.unwrap(viewRange, viewOldA, evt.priority);
					conversionApi.writer.wrap(viewRange, viewNewA, evt.priority);

					evt.stop();
				};
			};

			modelDispatcher.on('changeAttribute:linkHref', changeLinkAttribute(value => new _attributeelement2.default('a', { href: value })), null, 99);

			modelDispatcher.on('changeAttribute:linkTitle', changeLinkAttribute(value => new _attributeelement2.default('a', { title: value })), null, 99);

			modelDispatcher.on('removeAttribute:linkHref', (0, _modelToViewConverters.unwrap)(value => new _attributeelement2.default('a', { href: value })), null, 99);

			modelDispatcher.on('removeAttribute:linkTitle', (0, _modelToViewConverters.unwrap)(value => new _attributeelement2.default('a', { title: value })), null, 99);

			// NORMAL LINK VIEW TO MODEL CONVERTERS
			viewDispatcher.on('element:a', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { name: true, attribute: 'href' })) {
					if (!data.output) {
						data.output = conversionApi.convertChildren(data.input, consumable);
					}

					for (let child of data.output) {
						child.setAttribute('linkHref', data.input.getAttribute('href'));
					}
				}
			});

			viewDispatcher.on('element:a', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { attribute: 'title' })) {
					if (!data.output) {
						data.output = conversionApi.convertChildren(data.input, consumable);
					}

					for (let child of data.output) {
						child.setAttribute('linkTitle', data.input.getAttribute('title'));
					}
				}
			});

			// QUOTE MODEL TO VIEW CONVERTERS
			modelDispatcher.on('insert:quote', (evt, data, consumable, conversionApi) => {
				consumable.consume(data.item, 'insert');

				const viewPosition = conversionApi.mapper.toViewPosition(data.range.start);
				const viewElement = new _containerelement2.default('blockquote');

				conversionApi.mapper.bindElements(data.item, viewElement);
				conversionApi.writer.insert(viewPosition, viewElement);

				if (consumable.consume(data.item, 'addAttribute:linkHref')) {
					const viewA = new _attributeelement2.default('a', { href: data.item.getAttribute('linkHref') }, new _text4.default('see source'));

					if (consumable.consume(data.item, 'addAttribute:linkTitle')) {
						viewA.setAttribute('title', data.item.getAttribute('linkTitle'));
					}

					conversionApi.writer.insert(new _position4.default(viewElement, viewElement.getChildCount()), viewA);
				}

				evt.stop();
			});

			const modelChangeLinkAttrQuoteConverter = function (evt, data, consumable, conversionApi) {
				let viewKey = data.attributeKey.substr(4).toLowerCase();

				consumable.consume(data.item, (0, _modelToViewConverters.eventNameToConsumableType)(evt.name));

				const viewElement = conversionApi.mapper.toViewElement(data.item);
				const viewA = viewElement.getChild(viewElement.getChildCount() - 1);

				if (data.attributeNewValue !== null) {
					viewA.setAttribute(viewKey, data.attributeNewValue);
				} else {
					viewA.removeAttribute(viewKey);
				}

				evt.stop();
			};

			modelDispatcher.on('changeAttribute:linkHref:quote', modelChangeLinkAttrQuoteConverter);
			modelDispatcher.on('changeAttribute:linkTitle:quote', modelChangeLinkAttrQuoteConverter);

			modelDispatcher.on('removeAttribute:linkHref:quote', (evt, data, consumable, conversionApi) => {
				consumable.consume(data.item, (0, _modelToViewConverters.eventNameToConsumableType)(evt.name));

				const viewElement = conversionApi.mapper.toViewElement(data.item);
				const viewA = viewElement.getChild(viewElement.getChildCount() - 1);
				const aIndex = viewA.getIndex();

				conversionApi.writer.remove(_range4.default.createFromParentsAndOffsets(viewElement, aIndex, viewElement, aIndex + 1));

				evt.stop();
			});
			modelDispatcher.on('removeAttribute:linkTitle:quote', modelChangeLinkAttrQuoteConverter);

			// QUOTE VIEW TO MODEL CONVERTERS
			viewDispatcher.on('element:blockquote', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { name: true })) {
					data.output = new _element2.default('quote');

					const viewA = data.input.getChild(data.input.getChildCount() - 1);

					// Convert the special "a" first, before converting all children.
					if (viewA instanceof _element4.default && viewA.name == 'a' && consumable.consume(viewA, { name: true })) {
						if (consumable.consume(viewA, { attribute: 'href' })) {
							data.output.setAttribute('linkHref', viewA.getAttribute('href'));
						}

						if (consumable.consume(viewA, { attribute: 'title' })) {
							data.output.setAttribute('linkTitle', viewA.getAttribute('title'));
						}
					}

					const children = conversionApi.convertChildren(data.input, consumable);
					data.output.appendChildren(children);
				}
			});
		});

		it('should convert model text with linkHref and linkTitle to view', () => {
			const modelText = new _text2.default('foo', { linkHref: 'foo.html', linkTitle: 'Foo title' });
			modelRoot.appendChildren(modelText);

			let range = _range2.default.createFromElement(modelRoot);

			modelDispatcher.convertInsert(range);

			expect(viewToString(viewRoot)).to.equal('<div><a href="foo.html" title="Foo title">foo</a></div>');

			// Let's change link's attributes.
			for (let value of range) {
				value.item.setAttribute('linkHref', 'bar.html');
				value.item.setAttribute('linkTitle', 'Bar title');
			}
			modelDispatcher.convertAttribute('changeAttribute', range, 'linkHref', 'foo.html', 'bar.html');
			modelDispatcher.convertAttribute('changeAttribute', range, 'linkTitle', 'Foo title', 'Bar title');

			expect(viewToString(viewRoot)).to.equal('<div><a href="bar.html" title="Bar title">foo</a></div>');

			// Let's remove a letter from the link.
			const removed = modelRoot.removeChildren(0, 1);
			modelDoc.graveyard.appendChildren(removed);
			modelDispatcher.convertRemove(_position2.default.createFromParentAndOffset(modelRoot, 0), _range2.default.createFromElement(modelDoc.graveyard));

			expect(viewToString(viewRoot)).to.equal('<div><a href="bar.html" title="Bar title">oo</a></div>');

			range = _range2.default.createFromElement(modelRoot);

			// Let's remove just one attribute.
			for (let value of range) {
				value.item.removeAttribute('linkTitle');
			}
			modelDispatcher.convertAttribute('removeAttribute', range, 'linkTitle', 'Bar title', null);

			expect(viewToString(viewRoot)).to.equal('<div><a href="bar.html">oo</a></div>');

			// Let's remove the other attribute.
			for (let value of range) {
				value.item.removeAttribute('linkHref');
			}
			modelDispatcher.convertAttribute('removeAttribute', range, 'linkHref', 'bar.html', null);

			expect(viewToString(viewRoot)).to.equal('<div>oo</div>');
		});

		it('should convert a view element to model', () => {
			let viewElement = new _attributeelement2.default('a', { href: 'foo.html', title: 'Foo title' }, new _text4.default('foo'));

			let modelText = viewDispatcher.convert(viewElement)[0];

			expect(modelText).to.be.instanceof(_text2.default);
			expect(modelText.text).to.equal('foo');
			expect(modelText.getAttribute('linkHref')).to.equal('foo.html');
			expect(modelText.getAttribute('linkTitle')).to.equal('Foo title');
		});

		it('should convert quote model element with linkHref and linkTitle attribute to view', () => {
			let modelElement = new _element2.default('quote', { linkHref: 'foo.html', linkTitle: 'Foo source' }, 'foo');
			modelRoot.appendChildren(modelElement);
			modelDispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			let expected = '<div><blockquote>foo<a href="foo.html" title="Foo source">see source</a></blockquote></div>';
			expect(viewToString(viewRoot)).to.equal(expected);

			modelDispatcher.on('addAttribute:bold', (0, _modelToViewConverters.wrap)(new _attributeelement2.default('strong')));
			modelDispatcher.on('changeAttribute:bold', (0, _modelToViewConverters.wrap)(new _attributeelement2.default('strong')));
			modelDispatcher.on('removeAttribute:bold', (0, _modelToViewConverters.unwrap)(new _attributeelement2.default('strong')));

			modelElement.appendChildren(new _text2.default('bar', { bold: true }));
			modelDispatcher.convertInsert(_range2.default.createFromParentsAndOffsets(modelElement, 3, modelElement, 6));

			expected = '<div><blockquote>foo<strong>bar</strong><a href="foo.html" title="Foo source">see source</a></blockquote></div>';
			expect(viewToString(viewRoot)).to.equal(expected);

			modelElement.removeAttribute('linkTitle');
			modelElement.setAttribute('linkHref', 'bar.html');

			modelDispatcher.convertAttribute('removeAttribute', _range2.default.createOnElement(modelElement), 'linkTitle', 'Foo source', null);
			modelDispatcher.convertAttribute('changeAttribute', _range2.default.createOnElement(modelElement), 'linkHref', 'foo.html', 'bar.html');

			expected = '<div><blockquote>foo<strong>bar</strong><a href="bar.html">see source</a></blockquote></div>';
			expect(viewToString(viewRoot)).to.equal(expected);

			modelElement.removeAttribute('linkHref');
			modelDispatcher.convertAttribute('removeAttribute', _range2.default.createFromElement(modelRoot), 'linkHref', 'bar.html', null);

			expected = '<div><blockquote>foo<strong>bar</strong></blockquote></div>';
			expect(viewToString(viewRoot)).to.equal(expected);
		});

		it('should convert view blockquote with a element to model', () => {
			let viewElement = new _containerelement2.default('blockquote', null, [new _text4.default('foo'), new _attributeelement2.default('a', {
				href: 'foo.html',
				title: 'Foo source'
			}, new _text4.default('see source'))]);

			let modelElement = viewDispatcher.convert(viewElement);
			modelRoot.appendChildren(modelElement);

			expect(modelToString(modelElement)).to.equal('<quote linkHref="foo.html" linkTitle="Foo source">foo</quote>');
		});
	});

	// Default view converter for tables that will convert table structure into paragraphs if tables are not supported.
	// TRs are supposed to become paragraphs and TDs content should be separated using space.
	it('default table view to model converter', () => {
		viewDispatcher.on('element:a', (evt, data, consumable, conversionApi) => {
			if (consumable.consume(data.input, { name: true, attribute: 'href' })) {
				if (!data.output) {
					data.output = conversionApi.convertChildren(data.input, consumable);
				}

				for (let child of data.output) {
					child.setAttribute('linkHref', data.input.getAttribute('href'));
				}
			}
		});

		viewDispatcher.on('element:tr', (evt, data, consumable, conversionApi) => {
			if (consumable.consume(data.input, { name: true })) {
				data.output = new _element2.default('paragraph');
				const children = conversionApi.convertChildren(data.input, consumable);

				for (let i = 1; i < children.length; i++) {
					if (children[i] instanceof _text2.default && children[i - 1] instanceof _text2.default) {
						children[i - 1].text += ' ';
					}
				}

				data.output.appendChildren(children);
			}
		});

		viewDispatcher.on('element:table', (evt, data, consumable, conversionApi) => {
			if (consumable.consume(data.input, { name: true })) {
				data.output = conversionApi.convertChildren(data.input, consumable);
			}
		});

		viewDispatcher.on('element:td', (evt, data, consumable, conversionApi) => {
			if (consumable.consume(data.input, { name: true })) {
				data.output = conversionApi.convertChildren(data.input, consumable);
			}
		});

		let viewTable = new _containerelement2.default('table', null, [new _containerelement2.default('tr', null, [new _containerelement2.default('td', null, new _text4.default('foo')), new _containerelement2.default('td', null, new _attributeelement2.default('a', { href: 'bar.html' }, new _text4.default('bar')))]), new _containerelement2.default('tr', null, [new _containerelement2.default('td'), new _containerelement2.default('td', null, new _text4.default('abc'))])]);

		let model = viewDispatcher.convert(viewTable);
		let modelFragment = new _documentfragment2.default(model);

		expect(modelToString(modelFragment)).to.equal('<paragraph>foo <$text linkHref="bar.html">bar</$text></paragraph><paragraph>abc</paragraph>');
	});

	// Model converter that converts any non-converted elements and attributes into view elements and attributes.
	// View converter that converts any non-converted elements and attributes into model elements and attributes.
	describe('universal converter', () => {
		beforeEach(() => {
			// "Universal" converters
			modelDispatcher.on('insert', (0, _modelToViewConverters.insertElement)(data => new _containerelement2.default(data.item.name)), null, 99);
			modelDispatcher.on('addAttribute', (0, _modelToViewConverters.setAttribute)(), null, 99);
			modelDispatcher.on('changeAttribute', (0, _modelToViewConverters.setAttribute)(), null, 99);
			modelDispatcher.on('removeAttribute', (0, _modelToViewConverters.removeAttribute)(), null, 99);

			viewDispatcher.on('element', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { name: true })) {
					data.output = new _element2.default(data.input.name);

					for (let key of data.input.getAttributeKeys()) {
						if (consumable.consume(data.input, { attribute: key })) {
							data.output.setAttribute(key, data.input.getAttribute(key));
						}
					}

					data.output.appendChildren(conversionApi.convertChildren(data.input, consumable));
				}
			}, null, 99);

			// "Real" converters -- added with sooner priority. Should overwrite the "universal" converters.
			modelDispatcher.on('insert:image', (0, _modelToViewConverters.insertElement)(new _containerelement2.default('img')));
			modelDispatcher.on('addAttribute:bold', (0, _modelToViewConverters.wrap)(new _attributeelement2.default('strong')));
			modelDispatcher.on('changeAttribute:bold', (0, _modelToViewConverters.wrap)(new _attributeelement2.default('strong')));
			modelDispatcher.on('removeAttribute:bold', (0, _modelToViewConverters.unwrap)(new _attributeelement2.default('strong')));

			viewDispatcher.on('element:img', (evt, data, consumable) => {
				if (consumable.consume(data.input, { name: true })) {
					const modelImage = new _element2.default('image');

					for (let attributeKey of data.input.getAttributeKeys()) {
						modelImage.setAttribute(attributeKey, data.input.getAttribute(attributeKey));
					}

					data.output = modelImage;
				}
			});
			viewDispatcher.on('element:strong', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { name: true })) {
					if (!data.output) {
						data.output = conversionApi.convertChildren(data.input, consumable);
					}

					for (let child of data.output) {
						child.setAttribute('bold', true);
					}
				}
			});
		});

		it('should convert model to view', () => {
			let modelElement = new _element2.default('table', { cellpadding: 5, cellspacing: 5 }, [new _element2.default('tr', null, [new _element2.default('td', null, ['foo ', new _text2.default('abc', { bold: true }), ' bar']), new _element2.default('td', null, [new _element2.default('foo', { foo: 'bar' }, 'bar')])])]);

			modelRoot.appendChildren(modelElement);
			modelDispatcher.convertInsert(_range2.default.createFromElement(modelRoot));

			expect(viewToString(viewRoot)).to.equal('<div>' + '<table cellpadding="5" cellspacing="5">' + '<tr>' + '<td>foo <strong>abc</strong> bar</td>' + '<td><foo foo="bar">bar</foo></td>' + '</tr>' + '</table>' + '</div>');
		});

		it('should convert view to model', () => {
			let viewElement = new _containerelement2.default('table', { cellpadding: 5, cellspacing: 5 }, [new _containerelement2.default('tr', null, [new _containerelement2.default('td', null, [new _text4.default('foo '), new _attributeelement2.default('strong', null, new _text4.default('abc')), new _text4.default(' bar')]), new _containerelement2.default('td', null, new _containerelement2.default('foo', { foo: 'bar' }, new _text4.default('bar')))])]);

			let modelElement = viewDispatcher.convert(viewElement);
			modelRoot.appendChildren(modelElement);

			expect(modelToString(modelElement)).to.equal('<table cellpadding="5" cellspacing="5">' + '<tr>' + '<td>foo <$text bold="true">abc</$text> bar</td>' + '<td><foo foo="bar">bar</foo></td>' + '</tr>' + '</table>');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
