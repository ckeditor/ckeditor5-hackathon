define('tests', ['/ckeditor5/engine/conversion/viewconversiondispatcher.js', '/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/attributeelement.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/text.js'], function (_viewconversiondispatcher, _containerelement, _attributeelement, _documentfragment, _text) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: conversion */

	'use strict';

	var _viewconversiondispatcher2 = _interopRequireDefault(_viewconversiondispatcher);

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _attributeelement2 = _interopRequireDefault(_attributeelement);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ViewConversionDispatcher', () => {
		describe('constructor', () => {
			it('should create ViewConversionDispatcher with passed api', () => {
				const apiObj = {};
				const dispatcher = new _viewconversiondispatcher2.default({ apiObj });

				expect(dispatcher.conversionApi.apiObj).to.equal(apiObj);
				expect(dispatcher.conversionApi).to.have.property('convertItem').that.is.instanceof(Function);
				expect(dispatcher.conversionApi).to.have.property('convertChildren').that.is.instanceof(Function);
			});
		});

		describe('convert', () => {
			let dispatcher;

			beforeEach(() => {
				dispatcher = new _viewconversiondispatcher2.default();
			});

			it('should fire viewCleanup event on converted view part', () => {
				sinon.spy(dispatcher, 'fire');

				const viewP = new _containerelement2.default('p');
				dispatcher.convert(viewP);

				expect(dispatcher.fire.calledWith('viewCleanup', viewP)).to.be.true;
			});

			it('should fire proper events', () => {
				const viewText = new _text2.default('foobar');
				const viewElement = new _containerelement2.default('p', null, viewText);
				const viewFragment = new _documentfragment2.default(viewElement);

				sinon.spy(dispatcher, 'fire');

				dispatcher.convert(viewText);
				dispatcher.convert(viewElement);
				dispatcher.convert(viewFragment);

				expect(dispatcher.fire.calledWith('text')).to.be.true;
				expect(dispatcher.fire.calledWith('element:p')).to.be.true;
				expect(dispatcher.fire.calledWith('documentFragment')).to.be.true;
			});

			it('should convert ViewText', () => {
				const viewText = new _text2.default('foobar');

				dispatcher.on('text', (evt, data, consumable, conversionApi) => {
					const result = {
						eventName: evt.name,
						input: data.input,
						// Check whether additional data has been passed.
						foo: data.foo
					};

					// Check whether consumable has appropriate value to consume.
					expect(consumable.consume(data.input)).to.be.true;

					// Check whether conversionApi of `dispatcher` has been passed.
					expect(conversionApi).to.equal(dispatcher.conversionApi);

					// Set conversion result to `output` property of `data`.
					// Later we will check if it was returned by `convert` method.
					data.output = result;
				});

				// Use `additionalData` parameter to check if it was passed to the event.
				const result = dispatcher.convert(viewText, { foo: 'bar' });

				// Check conversion result.
				expect(result).to.deep.equal({
					eventName: 'text',
					input: viewText,
					foo: 'bar'
				});
			});

			it('should convert ViewContainerElement', () => {
				const viewElement = new _containerelement2.default('p', { attrKey: 'attrValue' });

				dispatcher.on('element', (evt, data, consumable, conversionApi) => {
					const result = {
						eventName: evt.name,
						input: data.input,
						// Check whether additional data has been passed.
						foo: data.foo
					};

					// Check whether consumable has appropriate value to consume.
					expect(consumable.consume(data.input, { name: true })).to.be.true;
					expect(consumable.consume(data.input, { attribute: 'attrKey' })).to.be.true;

					// Check whether conversionApi of `dispatcher` has been passed.
					expect(conversionApi).to.equal(dispatcher.conversionApi);

					// Set conversion result to `output` property of `data`.
					// Later we will check if it was returned by `convert` method.
					data.output = result;
				});

				// Use `additionalData` parameter to check if it was passed to the event.
				const result = dispatcher.convert(viewElement, { foo: 'bar' });

				// Check conversion result.
				expect(result).to.deep.equal({
					eventName: 'element:p',
					input: viewElement,
					foo: 'bar'
				});
			});

			it('should convert ViewDocumentFragment', () => {
				const viewFragment = new _documentfragment2.default();

				dispatcher.on('documentFragment', (evt, data, consumable, conversionApi) => {
					const result = {
						eventName: evt.name,
						input: data.input,
						// Check whether additional data has been passed.
						foo: data.foo
					};

					// Check whether consumable has appropriate value to consume.
					expect(consumable.consume(data.input)).to.be.true;

					// Check whether conversionApi of `dispatcher` has been passed.
					expect(conversionApi).to.equal(dispatcher.conversionApi);

					// Set conversion result to `output` property of `data`.
					// Later we will check if it was returned by `convert` method.
					data.output = result;
				});

				// Use `additionalData` parameter to check if it was passed to the event.
				const result = dispatcher.convert(viewFragment, { foo: 'bar' });

				// Check conversion result.
				expect(result).to.deep.equal({
					eventName: 'documentFragment',
					input: viewFragment,
					foo: 'bar'
				});
			});
		});

		describe('conversionApi#convertItem', () => {
			it('should convert view elements and view text', () => {
				const dispatcher = new _viewconversiondispatcher2.default();
				const viewFragment = new _documentfragment2.default([new _containerelement2.default('p'), new _text2.default('foobar')]);

				dispatcher.on('text', (evt, data) => {
					data.output = { text: data.input.data };
				});

				dispatcher.on('element:p', (evt, data) => {
					data.output = { name: 'p' };
				});

				dispatcher.on('documentFragment', (evt, data, consumable, conversionApi) => {
					data.output = [];

					for (let child of data.input.getChildren()) {
						data.output.push(conversionApi.convertItem(child));
					}
				});

				const result = dispatcher.convert(viewFragment);

				expect(result).to.deep.equal([{ name: 'p' }, { text: 'foobar' }]);
			});
		});

		describe('conversionApi#convertChildren', () => {
			it('should fire proper events for all children of passed view part', () => {
				const dispatcher = new _viewconversiondispatcher2.default();
				const viewFragment = new _documentfragment2.default([new _containerelement2.default('p'), new _text2.default('foobar')]);

				dispatcher.on('text', (evt, data) => {
					data.output = { text: data.input.data };
				});

				dispatcher.on('element:p', (evt, data) => {
					data.output = { name: 'p' };
				});

				dispatcher.on('documentFragment', (evt, data, consumable, conversionApi) => {
					data.output = conversionApi.convertChildren(data.input);
				});

				const result = dispatcher.convert(viewFragment);

				expect(result).to.deep.equal([{ name: 'p' }, { text: 'foobar' }]);
			});

			it('should flatten structure of non-converted elements', () => {
				const dispatcher = new _viewconversiondispatcher2.default();

				dispatcher.on('text', (evt, data) => {
					data.output = data.input.data;
				});

				dispatcher.on('element', (evt, data, consumable, conversionApi) => {
					data.output = conversionApi.convertChildren(data.input, consumable);
				});

				const viewStructure = new _containerelement2.default('div', null, [new _containerelement2.default('p', null, [new _containerelement2.default('span', { class: 'nice' }, [new _attributeelement2.default('a', { href: 'foo.html' }, new _text2.default('foo')), new _text2.default(' bar '), new _attributeelement2.default('i', null, new _text2.default('xyz'))])]), new _containerelement2.default('p', null, [new _attributeelement2.default('strong', null, [new _text2.default('aaa '), new _attributeelement2.default('span', null, new _text2.default('bbb')), new _text2.default(' '), new _attributeelement2.default('a', { href: 'bar.html' }, new _text2.default('ccc'))])])]);

				expect(dispatcher.convert(viewStructure)).to.deep.equal(['foo', ' bar ', 'xyz', 'aaa ', 'bbb', ' ', 'ccc']);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
