define('tests', ['/ckeditor5/engine/model/node.js', '/ckeditor5/engine/model/nodelist.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/documentfragment.js', '/tests/engine/model/_utils/utils.js'], function (_node, _nodelist, _element, _documentfragment, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _node2 = _interopRequireDefault(_node);

	var _nodelist2 = _interopRequireDefault(_nodelist);

	var _element2 = _interopRequireDefault(_element);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Element', () => {
		describe('constructor', () => {
			it('should create element without attributes', () => {
				let element = new _element2.default('elem');
				let parent = new _element2.default('parent', [], [element]);

				expect(element).to.be.an.instanceof(_node2.default);
				expect(element).to.have.property('name').that.equals('elem');
				expect(element).to.have.property('parent').that.equals(parent);
				expect(element._attrs.size).to.equal(0);
			});

			it('should create element with attributes', () => {
				let attr = { foo: 'bar' };

				let element = new _element2.default('elem', [attr]);
				let parent = new _element2.default('parent', [], [element]);

				expect(element).to.be.an.instanceof(_node2.default);
				expect(element).to.have.property('name').that.equals('elem');
				expect(element).to.have.property('parent').that.equals(parent);
				expect(element._attrs.size).to.equal(1);
				expect(element.getAttribute(attr.key)).to.equal(attr.value);
			});

			it('should create element with children', () => {
				let element = new _element2.default('elem', [], 'foo');

				expect(element).to.have.property('name').that.equals('elem');
				expect(element.getChildCount()).to.equal(3);
				expect(element.getChild(0)).to.have.property('character').that.equals('f');
				expect(element.getChild(1)).to.have.property('character').that.equals('o');
				expect(element.getChild(2)).to.have.property('character').that.equals('o');
			});
		});

		describe('insertChildren', () => {
			it('should add children to the element', () => {
				let element = new _element2.default('elem', [], ['xy']);
				element.insertChildren(1, 'foo');

				expect(element).to.have.property('name').that.equals('elem');
				expect(element.getChildCount()).to.equal(5);
				expect(element.getChild(0)).to.have.property('character').that.equals('x');
				expect(element.getChild(1)).to.have.property('character').that.equals('f');
				expect(element.getChild(2)).to.have.property('character').that.equals('o');
				expect(element.getChild(3)).to.have.property('character').that.equals('o');
				expect(element.getChild(4)).to.have.property('character').that.equals('y');
			});

			it('should accept DocumentFragment as a parameter and clean it after it is added', () => {
				let p1 = new _element2.default('p');
				let p2 = new _element2.default('p');
				let frag = new _documentfragment2.default([p1, p2]);

				let element = new _element2.default('div');

				element.insertChildren(0, frag);

				expect(element.getChildCount()).to.equal(2);
				expect(element.getChild(0)).to.equal(p1);
				expect(element.getChild(1)).to.equal(p2);
				expect(frag.getChildCount()).to.equal(0);
			});
		});

		describe('appendChildren', () => {
			it('should add children to the end of the element', () => {
				let element = new _element2.default('elem', [], ['xy']);
				element.appendChildren('foo');

				expect(element).to.have.property('name').that.equals('elem');
				expect(element.getChildCount()).to.equal(5);
				expect(element.getChild(0)).to.have.property('character').that.equals('x');
				expect(element.getChild(1)).to.have.property('character').that.equals('y');
				expect(element.getChild(2)).to.have.property('character').that.equals('f');
				expect(element.getChild(3)).to.have.property('character').that.equals('o');
				expect(element.getChild(4)).to.have.property('character').that.equals('o');
			});

			it('should accept DocumentFragment as a parameter and clean it after it is added', () => {
				let p1 = new _element2.default('p');
				let p2 = new _element2.default('p');
				let frag = new _documentfragment2.default([p1, p2]);

				let element = new _element2.default('div');

				element.appendChildren(frag);

				expect(element.getChildCount()).to.equal(2);
				expect(element.getChild(0)).to.equal(p1);
				expect(element.getChild(1)).to.equal(p2);
				expect(frag.getChildCount()).to.equal(0);
			});
		});

		describe('removeChildren', () => {
			it('should remove children from the element and return them as a NodeList', () => {
				let element = new _element2.default('elem', [], ['foobar']);
				let removed = element.removeChildren(2, 3);

				expect(element.getChildCount()).to.equal(3);
				expect(element.getChild(0)).to.have.property('character').that.equals('f');
				expect(element.getChild(1)).to.have.property('character').that.equals('o');
				expect(element.getChild(2)).to.have.property('character').that.equals('r');

				expect(removed).to.be.instanceof(_nodelist2.default);
				expect(removed.length).to.equal(3);

				expect(removed.get(0).character).to.equal('o');
				expect(removed.get(1).character).to.equal('b');
				expect(removed.get(2).character).to.equal('a');
			});

			it('should remove one child when second parameter is not specified', () => {
				let element = new _element2.default('elem', [], ['foo']);
				let removed = element.removeChildren(2);

				expect(element.getChildCount()).to.equal(2);
				expect(element.getChild(0)).to.have.property('character').that.equals('f');
				expect(element.getChild(1)).to.have.property('character').that.equals('o');

				expect(removed).to.be.instanceof(_nodelist2.default);
				expect(removed.length).to.equal(1);

				expect(removed.get(0).character).to.equal('o');
			});
		});

		describe('getChildIndex', () => {
			it('should return child index', () => {
				let element = new _element2.default('elem', [], [new _element2.default('p'), 'bar', new _element2.default('h')]);
				let p = element.getChild(0);
				let b = element.getChild(1);
				let a = element.getChild(2);
				let r = element.getChild(3);
				let h = element.getChild(4);

				expect(element.getChildIndex(p)).to.equal(0);
				expect(element.getChildIndex(b)).to.equal(1);
				expect(element.getChildIndex(a)).to.equal(2);
				expect(element.getChildIndex(r)).to.equal(3);
				expect(element.getChildIndex(h)).to.equal(4);
			});
		});

		describe('getChildCount', () => {
			it('should return number of children', () => {
				let element = new _element2.default('elem', [], ['bar']);

				expect(element.getChildCount()).to.equal(3);
			});
		});

		describe('attributes interface', () => {
			let node;

			beforeEach(() => {
				node = new _element2.default();
			});

			describe('setAttribute', () => {
				it('should set given attribute on the element', () => {
					node.setAttribute('foo', 'bar');

					expect(node.getAttribute('foo')).to.equal('bar');
				});
			});

			describe('setAttributesTo', () => {
				it('should remove all attributes set on element and set the given ones', () => {
					node.setAttribute('abc', 'xyz');
					node.setAttributesTo({ foo: 'bar' });

					expect(node.getAttribute('foo')).to.equal('bar');
					expect(node.getAttribute('abc')).to.be.undefined;
				});
			});

			describe('removeAttribute', () => {
				it('should remove attribute set on the element and return true', () => {
					node.setAttribute('foo', 'bar');
					let result = node.removeAttribute('foo');

					expect(node.getAttribute('foo')).to.be.undefined;
					expect(result).to.be.true;
				});

				it('should return false if element does not contain given attribute', () => {
					let result = node.removeAttribute('foo');

					expect(result).to.be.false;
				});
			});

			describe('clearAttributes', () => {
				it('should remove all attributes from the element', () => {
					node.setAttribute('foo', 'bar');
					node.setAttribute('abc', 'xyz');

					node.clearAttributes();

					expect(node.getAttribute('foo')).to.be.undefined;
					expect(node.getAttribute('abc')).to.be.undefined;
				});
			});
		});

		describe('isEmpty', () => {
			it('checks whether element has no children', () => {
				expect(new _element2.default('a').isEmpty()).to.be.true;
				expect(new _element2.default('a', null, 'x').isEmpty()).to.be.false;
			});
		});

		describe('getText()', () => {
			it('returns all text nodes', () => {
				const el = new _element2.default('p', null, [new _element2.default('p', null, 'abc'), 'def', new _element2.default('p', null, 'ghi'), 'jkl']);

				expect(el.getText()).to.equal('abcdefghijkl');
			});
		});

		describe('toJSON', () => {
			it('should serialize empty element', () => {
				let element = new _element2.default('one');

				expect((0, _utils.jsonParseStringify)(element)).to.deep.equal({ name: 'one' });
			});

			it('should serialize element with attributes', () => {
				let element = new _element2.default('one', { foo: true, bar: false });

				expect((0, _utils.jsonParseStringify)(element)).to.deep.equal({
					attributes: [['foo', true], ['bar', false]],
					name: 'one'
				});
			});

			it('should serialize node with children', () => {
				let img = new _element2.default('img');
				let one = new _element2.default('one');
				let two = new _element2.default('two', null, ['b', 'a', img, 'r']);
				let three = new _element2.default('three');

				let node = new _element2.default(null, null, [one, two, three]);

				expect((0, _utils.jsonParseStringify)(node)).to.deep.equal({
					children: {
						nodes: [{ name: 'one' }, {
							children: {
								nodes: [{ text: 'ba' }, { name: 'img' }, { text: 'r' }]
							},
							name: 'two'
						}, { name: 'three' }]
					},
					name: null
				});
			});
		});

		describe('fromJSON', () => {
			it('should create element without attributes', () => {
				const el = new _element2.default('el');

				let serialized = (0, _utils.jsonParseStringify)(el);

				let deserialized = _element2.default.fromJSON(serialized);

				expect(deserialized.parent).to.be.null;
				expect(deserialized.name).to.equal('el');
				expect(deserialized.getChildCount()).to.equal(0);
			});

			it('should create element with attributes', () => {
				const el = new _element2.default('el', { foo: true });

				let serialized = (0, _utils.jsonParseStringify)(el);

				let deserialized = _element2.default.fromJSON(serialized);

				expect(deserialized.parent).to.be.null;
				expect(deserialized.name).to.equal('el');
				expect(deserialized.getChildCount()).to.equal(0);
				expect(deserialized.hasAttribute('foo')).to.be.true;
				expect(deserialized.getAttribute('foo')).to.be.true;
			});

			it('should create element with children', () => {
				const p = new _element2.default('p');
				const el = new _element2.default('el', null, p);

				let serialized = (0, _utils.jsonParseStringify)(el);

				let deserialized = _element2.default.fromJSON(serialized);

				expect(deserialized.parent).to.be.null;
				expect(deserialized.name).to.equal('el');
				expect(deserialized.getChildCount()).to.equal(1);

				expect(deserialized.getChild(0).name).to.equal('p');
				expect(deserialized.getChild(0).parent).to.equal(deserialized);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
