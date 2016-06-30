define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/template.js', '/ckeditor5/utils/ckeditorerror.js'], function (_utils, _template, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui */
	/* global HTMLElement */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _template2 = _interopRequireDefault(_template);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	let el, text;

	describe('Template', () => {
		describe('constructor', () => {
			it('accepts the definition', () => {
				const def = {
					tag: 'p'
				};

				expect(new _template2.default(def).definition).to.equal(def);
			});
		});

		describe('render', () => {
			it('throws when wrong template definition', () => {
				expect(() => {
					new _template2.default({}).render();
				}).to.throw(_ckeditorerror2.default, /ui-template-wrong-syntax/);

				expect(() => {
					new _template2.default({
						tag: 'p',
						text: 'foo'
					}).render();
				}).to.throw(_ckeditorerror2.default, /ui-template-wrong-syntax/);
			});

			it('creates a HTMLElement', () => {
				const el = new _template2.default({
					tag: 'p'
				}).render();

				expect(el).to.be.instanceof(HTMLElement);
				expect(el.parentNode).to.be.null;
				expect(el.outerHTML).to.be.equal('<p></p>');
				expect(el.namespaceURI).to.be.equal('http://www.w3.org/1999/xhtml');
			});

			it('creates an element in a custom namespace', () => {
				const el = new _template2.default({
					tag: 'p',
					ns: 'foo'
				}).render();

				expect(el.namespaceURI).to.be.equal('foo');
			});

			it('renders HTMLElement attributes', () => {
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						'class': ['a', 'b'],
						x: 'bar'
					},
					children: ['foo']
				}).render();

				expect(el).to.be.instanceof(HTMLElement);
				expect(el.parentNode).to.be.null;
				expect(el.outerHTML).to.be.equal('<p class="a b" x="bar">foo</p>');
				expect(el.attributes.getNamedItem('class').namespaceURI).to.be.null;
			});

			it('renders HTMLElement attributes – empty', () => {
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						class: '',
						x: ['', '']
					},
					children: ['foo']
				}).render();

				expect(el.outerHTML).to.be.equal('<p class="" x="">foo</p>');
			});

			it('renders HTMLElement attributes – falsy values', () => {
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						class: false,
						x: ['', null]
					},
					children: ['foo']
				}).render();

				expect(el.outerHTML).to.be.equal('<p class="false" x="null">foo</p>');
			});

			it('renders HTMLElement attributes in a custom namespace', () => {
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						'class': {
							ns: 'foo',
							value: ['a', 'b']
						},
						x: {
							ns: 'abc',
							value: 'bar'
						}
					},
					children: ['foo']
				}).render();

				expect(el.outerHTML).to.be.equal('<p class="a b" x="bar">foo</p>');
				expect(el.attributes.getNamedItem('class').namespaceURI).to.equal('foo');
				expect(el.attributes.getNamedItem('x').namespaceURI).to.equal('abc');
			});

			it('creates HTMLElement children', () => {
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						a: 'A'
					},
					children: [{
						tag: 'b',
						children: ['B']
					}, {
						tag: 'i',
						children: ['C', {
							tag: 'b',
							children: ['D']
						}]
					}]
				}).render();

				expect(el.outerHTML).to.be.equal('<p a="A"><b>B</b><i>C<b>D</b></i></p>');
			});

			it('creates a Text node', () => {
				const node = new _template2.default({ text: 'foo' }).render();

				expect(node.nodeType).to.be.equal(3);
				expect(node.textContent).to.be.equal('foo');
			});

			it('creates a child Text Node (different syntaxes)', () => {
				const el = new _template2.default({
					tag: 'p',
					children: ['foo', { text: 'bar' }]
				}).render();

				expect(el.outerHTML).to.be.equal('<p>foobar</p>');
			});

			it('creates multiple child Text Nodes', () => {
				const el = new _template2.default({
					tag: 'p',
					children: ['a', 'b', { text: 'c' }, 'd']
				}).render();

				expect(el.childNodes).to.have.length(4);
				expect(el.outerHTML).to.be.equal('<p>abcd</p>');
			});

			it('activates listener attachers – root', () => {
				const spy1 = _utils2.default.sinon.spy();
				const spy2 = _utils2.default.sinon.spy();
				const spy3 = _utils2.default.sinon.spy();

				const el = new _template2.default({
					tag: 'p',
					on: {
						_listenerAttachers: {
							foo: spy1,
							baz: [spy2, spy3]
						}
					}
				}).render();

				sinon.assert.calledWithExactly(spy1, el, 'foo', null);
				sinon.assert.calledWithExactly(spy2, el, 'baz', null);
				sinon.assert.calledWithExactly(spy3, el, 'baz', null);
			});

			it('activates listener attachers – children', () => {
				const spy = _utils2.default.sinon.spy();
				const el = new _template2.default({
					tag: 'p',
					children: [{
						tag: 'span',
						on: {
							_listenerAttachers: {
								bar: spy
							}
						}
					}]
				}).render();

				sinon.assert.calledWithExactly(spy, el.firstChild, 'bar', null);
			});

			it('activates listener attachers – DOM selectors', () => {
				const spy1 = _utils2.default.sinon.spy();
				const spy2 = _utils2.default.sinon.spy();
				const spy3 = _utils2.default.sinon.spy();
				const spy4 = _utils2.default.sinon.spy();

				const el = new _template2.default({
					tag: 'p',
					children: [{
						tag: 'span',
						attributes: {
							'id': 'x'
						}
					}, {
						tag: 'span',
						attributes: {
							'class': 'y'
						},
						on: {
							_listenerAttachers: {
								'bar@p': spy2
							}
						}
					}],
					on: {
						_listenerAttachers: {
							'foo@span': spy1,
							'baz@.y': [spy3, spy4]
						}
					}
				}).render();

				sinon.assert.calledWithExactly(spy1, el, 'foo', 'span');
				sinon.assert.calledWithExactly(spy2, el.lastChild, 'bar', 'p');
				sinon.assert.calledWithExactly(spy3, el, 'baz', '.y');
				sinon.assert.calledWithExactly(spy4, el, 'baz', '.y');
			});

			it('activates model bindings – attributes', () => {
				const spy1 = _utils2.default.sinon.spy();
				const spy2 = _utils2.default.sinon.spy();

				const el = new _template2.default({
					tag: 'p',
					attributes: {
						'class': {}
					},
					children: [{
						tag: 'span',
						attributes: {
							id: {}
						},
						_modelBinders: {
							attributes: {
								id: spy2
							}
						}
					}],
					_modelBinders: {
						attributes: {
							class: spy1
						}
					}
				}).render();

				sinon.assert.calledWithExactly(spy1, el, sinon.match.object);
				sinon.assert.calledWithExactly(spy2, el.firstChild, sinon.match.object);
			});

			it('activates model bindings – Text Node', () => {
				const spy1 = _utils2.default.sinon.spy();
				const spy2 = _utils2.default.sinon.spy();

				const el = new _template2.default({
					tag: 'p',
					children: [{
						text: {},
						_modelBinders: {
							text: spy1
						}
					}, {
						tag: 'span',
						children: [{
							text: {},
							_modelBinders: {
								text: spy2
							}
						}]
					}]
				}).render();

				sinon.assert.calledWithExactly(spy1, el.firstChild, sinon.match.object);
				sinon.assert.calledWithExactly(spy2, el.lastChild.firstChild, sinon.match.object);
			});

			it('uses DOM updater – attributes', () => {
				const spy = _utils2.default.sinon.spy();
				const el = new _template2.default({
					tag: 'p',
					attributes: {
						'class': {}
					},
					_modelBinders: {
						attributes: {
							class: spy
						}
					}
				}).render();

				// Check whether DOM updater is correct.
				spy.firstCall.args[1].set('x');
				expect(el.outerHTML).to.be.equal('<p class="x"></p>');

				spy.firstCall.args[1].remove();
				expect(el.outerHTML).to.be.equal('<p></p>');
			});

			it('uses DOM updater – text', () => {
				const spy = _utils2.default.sinon.spy();
				const el = new _template2.default({
					tag: 'p',
					children: [{
						text: {},
						_modelBinders: {
							text: spy
						}
					}]
				}).render();

				// Check whether DOM updater is correct.
				spy.firstCall.args[1].set('x');
				expect(el.outerHTML).to.be.equal('<p>x</p>');

				spy.firstCall.args[1].remove();
				expect(el.outerHTML).to.be.equal('<p></p>');
			});
		});

		describe('apply', () => {
			beforeEach(() => {
				el = document.createElement('div');
				text = document.createTextNode('');
			});

			it('throws when wrong template definition', () => {
				expect(() => {
					new _template2.default({
						tag: 'p',
						text: 'foo'
					}).apply(el);
				}).to.throw(_ckeditorerror2.default, /ui-template-wrong-syntax/);
			});

			it('throws when no HTMLElement passed', () => {
				expect(() => {
					new _template2.default({
						tag: 'p'
					}).apply();
				}).to.throw(_ckeditorerror2.default, /ui-template-wrong-node/);
			});

			it('accepts empty template definition', () => {
				new _template2.default({}).apply(el);
				new _template2.default({}).apply(text);

				expect(el.outerHTML).to.be.equal('<div></div>');
				expect(text.textContent).to.be.equal('');
			});

			it('applies textContent to a Text Node', () => {
				new _template2.default({
					text: 'abc'
				}).apply(text);

				expect(text.textContent).to.be.equal('abc');
			});

			it('applies attributes to an HTMLElement', () => {
				new _template2.default({
					tag: 'div',
					attributes: {
						'class': ['a', 'b'],
						x: 'bar'
					}
				}).apply(el);

				expect(el.outerHTML).to.be.equal('<div class="a b" x="bar"></div>');
			});

			it('applies doesn\'t apply new child to an HTMLElement – Text Node', () => {
				new _template2.default({
					tag: 'div',
					children: ['foo']
				}).apply(el);

				expect(el.outerHTML).to.be.equal('<div></div>');
			});

			it('applies doesn\'t apply new child to an HTMLElement – HTMLElement', () => {
				new _template2.default({
					tag: 'div',
					children: [{
						tag: 'span'
					}]
				}).apply(el);

				expect(el.outerHTML).to.be.equal('<div></div>');
			});

			it('applies new textContent to an existing Text Node of an HTMLElement', () => {
				el.textContent = 'bar';

				new _template2.default({
					tag: 'div',
					children: ['foo']
				}).apply(el);

				expect(el.outerHTML).to.be.equal('<div>foo</div>');
			});

			it('applies attributes and TextContent to a DOM tree', () => {
				el.textContent = 'abc';
				el.appendChild(document.createElement('span'));

				new _template2.default({
					tag: 'div',
					attributes: {
						'class': 'parent'
					},
					children: ['Children: ', {
						tag: 'span',
						attributes: {
							class: 'child'
						}
					}]
				}).apply(el);

				expect(el.outerHTML).to.be.equal('<div class="parent">Children: <span class="child"></span></div>');
			});

			it('activates listener attachers – root', () => {
				const spy = _utils2.default.sinon.spy();

				new _template2.default({
					tag: 'div',
					on: {
						_listenerAttachers: {
							click: spy
						}
					}
				}).apply(el);

				sinon.assert.calledWithExactly(spy, el, 'click', null);
			});

			it('activates listener attachers – children', () => {
				const spy = _utils2.default.sinon.spy();
				el.appendChild(document.createElement('span'));

				new _template2.default({
					tag: 'div',
					children: [{
						tag: 'span',
						on: {
							_listenerAttachers: {
								click: spy
							}
						}
					}]
				}).apply(el);

				sinon.assert.calledWithExactly(spy, el.firstChild, 'click', null);
			});

			it('activates model bindings – root', () => {
				const spy = _utils2.default.sinon.spy();

				new _template2.default({
					tag: 'div',
					attributes: {
						class: {}
					},
					_modelBinders: {
						attributes: {
							class: spy
						}
					}
				}).apply(el);

				sinon.assert.calledWithExactly(spy, el, sinon.match.object);
			});

			it('activates model bindings – children', () => {
				const spy = _utils2.default.sinon.spy();
				el.appendChild(document.createElement('span'));

				new _template2.default({
					tag: 'div',
					children: [{
						tag: 'span',
						attributes: {
							class: {}
						},
						_modelBinders: {
							attributes: {
								class: spy
							}
						}
					}]
				}).apply(el);

				sinon.assert.calledWithExactly(spy, el.firstChild, sinon.match.object);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
