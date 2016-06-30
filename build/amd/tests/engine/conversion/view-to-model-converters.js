define('tests', ['/ckeditor5/engine/conversion/viewconversiondispatcher.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/model/schema.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/conversion/view-to-model-converters.js'], function (_viewconversiondispatcher, _containerelement, _documentfragment, _text, _schema, _documentfragment3, _element, _text3, _viewToModelConverters) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _viewconversiondispatcher2 = _interopRequireDefault(_viewconversiondispatcher);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _text2 = _interopRequireDefault(_text);

	var _schema2 = _interopRequireDefault(_schema);

	var _documentfragment4 = _interopRequireDefault(_documentfragment3);

	var _element2 = _interopRequireDefault(_element);

	var _text4 = _interopRequireDefault(_text3);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let dispatcher, schema, objWithContext;

	beforeEach(() => {
		schema = new _schema2.default();
		schema.registerItem('paragraph', '$block');
		schema.allow({ name: '$text', inside: '$root' });
		objWithContext = { context: ['$root'] };
		dispatcher = new _viewconversiondispatcher2.default({ schema });
	});

	describe('convertText', () => {
		it('should return converter converting ViewText to ModelText', () => {
			const viewText = new _text2.default('foobar');

			dispatcher.on('text', (0, _viewToModelConverters.convertText)());

			const result = dispatcher.convert(viewText, objWithContext);

			expect(result).to.be.instanceof(_text4.default);
			expect(result.text).to.equal('foobar');
		});

		it('should not convert already consumed texts', () => {
			const viewText = new _text2.default('foofuckbafuckr');

			// Default converter for elements. Returns just converted children. Added with late priority.
			dispatcher.on('text', (0, _viewToModelConverters.convertText)(), dispatcher, 9999);
			// Added with sooner priority. Should make the above converter not fire.
			dispatcher.on('text', (evt, data, consumable) => {
				if (consumable.consume(data.input)) {
					data.output = new _text4.default(data.input.data.replace(/fuck/gi, '****'));
				}
			});

			const result = dispatcher.convert(viewText, objWithContext);

			expect(result).to.be.instanceof(_text4.default);
			expect(result.text).to.equal('foo****ba****r');
		});

		it('should not convert text if it is wrong with schema', () => {
			schema.disallow({ name: '$text', inside: '$root' });

			const viewText = new _text2.default('foobar');
			dispatcher.on('text', (0, _viewToModelConverters.convertText)());

			let result = dispatcher.convert(viewText, objWithContext);

			expect(result).to.be.null;

			result = dispatcher.convert(viewText, { context: ['$block'] });
			expect(result).to.be.instanceof(_text4.default);
			expect(result.text).to.equal('foobar');
		});
	});

	describe('convertToModelFragment', () => {
		it('should return converter converting whole ViewDocumentFragment to ModelDocumentFragment', () => {
			const viewFragment = new _documentfragment2.default([new _containerelement2.default('p', null, new _text2.default('foo')), new _text2.default('bar')]);

			// To get any meaningful results we have to actually convert something.
			dispatcher.on('text', (0, _viewToModelConverters.convertText)());
			// This way P element won't be converted per-se but will fire converting it's children.
			dispatcher.on('element', (0, _viewToModelConverters.convertToModelFragment)());
			dispatcher.on('documentFragment', (0, _viewToModelConverters.convertToModelFragment)());

			const result = dispatcher.convert(viewFragment, objWithContext);

			expect(result).to.be.instanceof(_documentfragment4.default);
			expect(result.getChildCount()).to.equal(6);
			expect(result.getChild(0).character).to.equal('f');
			expect(result.getChild(1).character).to.equal('o');
			expect(result.getChild(2).character).to.equal('o');
			expect(result.getChild(3).character).to.equal('b');
			expect(result.getChild(4).character).to.equal('a');
			expect(result.getChild(5).character).to.equal('r');
		});

		it('should not convert already consumed (converted) changes', () => {
			const viewP = new _containerelement2.default('p', null, new _text2.default('foo'));

			// To get any meaningful results we have to actually convert something.
			dispatcher.on('text', (0, _viewToModelConverters.convertText)());
			// Default converter for elements. Returns just converted children. Added with late priority.
			dispatcher.on('element', (0, _viewToModelConverters.convertToModelFragment)(), dispatcher, 9999);
			// Added with sooner priority. Should make the above converter not fire.
			dispatcher.on('element:p', (evt, data, consumable, conversionApi) => {
				if (consumable.consume(data.input, { name: true })) {
					data.output = new _element2.default('paragraph');

					data.context.push(data.output);
					data.output.appendChildren(conversionApi.convertChildren(data.input, consumable, data));
					data.context.pop();
				}
			});

			const result = dispatcher.convert(viewP, objWithContext);

			expect(result).to.be.instanceof(_element2.default);
			expect(result.name).to.equal('paragraph');
			expect(result.getChildCount()).to.equal(3);
			expect(result.getChild(0).character).to.equal('f');
			expect(result.getChild(1).character).to.equal('o');
			expect(result.getChild(2).character).to.equal('o');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
