define('tests', ['/ckeditor5/engine/model/nodelist.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/model/_utils/utils.js'], function (_nodelist, _documentfragment, _element, _text, _ckeditorerror, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _nodelist2 = _interopRequireDefault(_nodelist);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('NodeList', () => {
		describe('constructor', () => {
			it('should add elements to the node list', () => {
				let p = new _element2.default('p');
				let nodeList = new _nodelist2.default(p);

				expect(nodeList.length).to.equal(1);
				expect(nodeList.get(0)).to.equal(p);
			});

			it('should change string into a set of nodes', () => {
				let nodeList = new _nodelist2.default('foo');

				expect(nodeList.length).to.equal(3);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(2).character).to.equal('o');
			});

			it('should change node into a set of nodes', () => {
				let nodeList = new _nodelist2.default(new _text2.default('xy'));

				expect(nodeList.length).to.equal(2);
				expect(nodeList.get(0).character).to.equal('x');
				expect(nodeList.get(1).character).to.equal('y');
			});

			it('should change text with attribute into a set of nodes', () => {
				let attr = { bold: true };
				let nodeList = new _nodelist2.default(new _text2.default('foo', [attr]));

				expect(nodeList.length).to.equal(3);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(0).getAttribute(attr.key)).to.equal(attr.value);
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(1).getAttribute(attr.key)).to.equal(attr.value);
				expect(nodeList.get(2).character).to.equal('o');
				expect(nodeList.get(2).getAttribute(attr.key)).to.equal(attr.value);
			});

			it('should change array of characters into a set of nodes', () => {
				let char = new _element2.default('p', [], 'y').getChild(0);
				let nodeList = new _nodelist2.default(['foo', new _text2.default('x'), char, 'bar']);

				expect(nodeList.length).to.equal(8);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(2).character).to.equal('o');
				expect(nodeList.get(3).character).to.equal('x');
				expect(nodeList.get(4).character).to.equal('y');
				expect(nodeList.get(5).character).to.equal('b');
				expect(nodeList.get(6).character).to.equal('a');
				expect(nodeList.get(7).character).to.equal('r');
			});

			it('should omit empty strings / texts', () => {
				let nodeList = new _nodelist2.default(['fo', '', 'ob', new _text2.default('', { foo: true }), 'ar']);

				expect(nodeList.length).to.equal(6);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(2).character).to.equal('o');
				expect(nodeList.get(3).character).to.equal('b');
				expect(nodeList.get(4).character).to.equal('a');
				expect(nodeList.get(5).character).to.equal('r');

				expect(nodeList.get(0)._attrs.size).to.equal(0);
				expect(nodeList.get(1)._attrs.size).to.equal(0);
				expect(nodeList.get(2)._attrs.size).to.equal(0);
				expect(nodeList.get(3)._attrs.size).to.equal(0);
				expect(nodeList.get(4)._attrs.size).to.equal(0);
				expect(nodeList.get(5)._attrs.size).to.equal(0);
			});

			it('should merge strings and text objects if possible', () => {
				let attr = { foo: 'bar' };
				let nodeList = new _nodelist2.default(['fo', new _text2.default('o'), new _text2.default('x', [attr]), new _text2.default('y', [attr]), 'bar']);

				expect(nodeList.length).to.equal(8);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(2).character).to.equal('o');
				expect(nodeList.get(3).character).to.equal('x');
				expect(nodeList.get(4).character).to.equal('y');
				expect(nodeList.get(5).character).to.equal('b');
				expect(nodeList.get(6).character).to.equal('a');
				expect(nodeList.get(7).character).to.equal('r');

				expect(nodeList._nodes.length).to.equal(3);
				expect(nodeList._nodes[0].text).to.equal('foo');
				expect(nodeList._nodes[1].text).to.equal('xy');
				expect(nodeList._nodes[2].text).to.equal('bar');
			});

			it('should accept DocumentFragment as a parameter', () => {
				let p1 = new _element2.default('p');
				let p2 = new _element2.default('p');
				let frag = new _documentfragment2.default([p1, p2]);

				let nodeList = new _nodelist2.default(frag);

				expect(nodeList.length).to.equal(2);
				expect(nodeList.get(0)).to.equal(p1);
				expect(nodeList.get(1)).to.equal(p2);
			});

			it('should accept DocumentFragment as one of items in input array', () => {
				let p1 = new _element2.default('p');
				let p2 = new _element2.default('p');
				let p3 = new _element2.default('p');
				let frag = new _documentfragment2.default([p1, p2]);

				let nodeList = new _nodelist2.default([frag, p3]);

				expect(nodeList.length).to.equal(3);
				expect(nodeList.get(0)).to.equal(p1);
				expect(nodeList.get(1)).to.equal(p2);
				expect(nodeList.get(2)).to.equal(p3);
			});
		});

		describe('insert', () => {
			it('should insert one node list into another', () => {
				let outerList = new _nodelist2.default('foo');
				let innerList = new _nodelist2.default('xxx');

				outerList.insert(2, innerList);

				expect(outerList.length).to.equal(6);
				expect(outerList.get(0).character).to.equal('f');
				expect(outerList.get(1).character).to.equal('o');
				expect(outerList.get(2).character).to.equal('x');
				expect(outerList.get(3).character).to.equal('x');
				expect(outerList.get(4).character).to.equal('x');
				expect(outerList.get(5).character).to.equal('o');
			});

			it('should merge inserted text objects if possible', () => {
				let attr = { foo: 'bar' };
				let outerList = new _nodelist2.default(['foo', new _text2.default('bar', [attr])]);
				let innerList = new _nodelist2.default(['x', new _text2.default('y', [attr])]);

				outerList.insert(3, innerList);

				expect(outerList._nodes.length).to.equal(2);
				expect(outerList._nodes[0].text).to.equal('foox');
				expect(outerList._nodes[1].text).to.equal('ybar');
			});
		});

		describe('remove', () => {
			it('should remove part of the node list and return removed nodes as another node list', () => {
				let nodeList = new _nodelist2.default('foobar');

				let removed = nodeList.remove(2, 3);

				expect(nodeList.length).to.equal(3);
				expect(nodeList.get(0).character).to.equal('f');
				expect(nodeList.get(1).character).to.equal('o');
				expect(nodeList.get(2).character).to.equal('r');

				expect(removed).to.be.instanceof(_nodelist2.default);
				expect(removed.length).to.equal(3);
				expect(removed.get(0).character).to.equal('o');
				expect(removed.get(1).character).to.equal('b');
				expect(removed.get(2).character).to.equal('a');
			});

			it('should merge text objects left in node list possible', () => {
				let attr = { foo: 'bar' };
				let nodeList = new _nodelist2.default(['foo', new _text2.default('xxx', [attr]), 'bar']);

				nodeList.remove(2, 5);

				expect(nodeList._nodes.length).to.equal(1);
				expect(nodeList._nodes[0].text).to.equal('foar');
			});

			it('should return empty node list and do nothing if node list removed from is also empty', () => {
				let nodeList = new _nodelist2.default();
				let result = nodeList.remove(2, 3);

				expect(result.length).to.equal(0);
			});
		});

		describe('indexOf', () => {
			let nodeList, p;

			beforeEach(() => {
				p = new _element2.default('p');
				nodeList = new _nodelist2.default(['abc', p, 'def']);
			});

			it('should return index of specified element', () => {
				let index = nodeList.indexOf(p);

				expect(index).to.equal(3);
			});

			it('should return index of specified character', () => {
				let char = nodeList.get(5);
				let index = nodeList.indexOf(char);

				expect(index).to.equal(5);
			});

			it('should return -1 if specified element is not a part of a node list', () => {
				expect(nodeList.indexOf(new _element2.default('p'))).to.equal(-1);
			});

			it('should return -1 if specified character is not a part of a node list', () => {
				let div = new _element2.default('div', [], 'a');
				let char = div.getChild(0);

				expect(nodeList.indexOf(char)).to.equal(-1);
			});
		});

		describe('iterator', () => {
			it('should iterate over all elements in the collection', () => {
				let characters = 'foo';
				let nodeList = new _nodelist2.default(characters);
				let i = 0;

				for (let node of nodeList) {
					expect(node.character).to.equal(characters[i]);
					i++;
				}

				expect(i).to.equal(3);
			});
		});

		describe('setAttribute', () => {
			it('should change attribute for multiple items in node list but not for their children', () => {
				let p = new _element2.default('p', [], 'x');
				let div = new _element2.default('div');

				let nodeList = new _nodelist2.default([p, 'foo', div, 'bar']);

				nodeList.setAttribute(0, 6, 'a', 'true');

				// Attribute set.
				expect(p.hasAttribute('a')).to.be.true;
				expect(nodeList.get(1).hasAttribute('a')).to.be.true;
				expect(nodeList.get(2).hasAttribute('a')).to.be.true;
				expect(nodeList.get(3).hasAttribute('a')).to.be.true;
				expect(div.hasAttribute('a')).to.be.true;
				expect(nodeList.get(5).hasAttribute('a')).to.be.true;
				expect(nodeList.get(6).hasAttribute('a')).to.be.false;
				expect(nodeList.get(7).hasAttribute('a')).to.be.false;

				// Attribute not set for children.
				expect(p.getChild(0).hasAttribute('a')).to.be.false;
			});

			it('should remove attribute if no new attribute has been passed', () => {
				let p = new _element2.default('p', { a: true });
				let text = new _text2.default('foobar', { a: true });
				let nodeList = new _nodelist2.default([p, text]);

				nodeList.setAttribute(0, 4, 'a', null);

				expect(p.hasAttribute('a')).to.be.false;
				expect(nodeList.get(1).hasAttribute('a')).to.be.false;
				expect(nodeList.get(2).hasAttribute('a')).to.be.false;
				expect(nodeList.get(3).hasAttribute('a')).to.be.false;
				expect(nodeList.get(4).hasAttribute('a')).to.be.true;
				expect(nodeList.get(5).hasAttribute('a')).to.be.true;

				expect(nodeList._nodes.length).to.equal(3);
			});

			it('should throw if wrong index or number is passed', () => {
				let attr = { a: true };
				let text = new _text2.default('foo', [attr]);
				let nodeList = new _nodelist2.default(text);

				expect(() => {
					nodeList.setAttribute(-1, 2, attr.key, null);
				}).to.throw(_ckeditorerror2.default, /nodelist-setattribute-out-of-bounds/);

				expect(() => {
					nodeList.setAttribute(2, 2, attr.key, null);
				}).to.throw(_ckeditorerror2.default, /nodelist-setattribute-out-of-bounds/);
			});
		});

		describe('_splitNodeAt', () => {
			it('should split text object into two text objects', () => {
				let nodeList = new _nodelist2.default('abcd');
				nodeList._splitNodeAt(2);

				expect(nodeList._nodes.length).to.equal(2);
				expect(nodeList._nodes[0].text).to.equal('ab');
				expect(nodeList._nodes[1].text).to.equal('cd');
			});

			it('should do nothing if node before and after index are different', () => {
				let nodeList = new _nodelist2.default([new _text2.default('ab', { foo: true }), 'cd']);
				nodeList._splitNodeAt(2);

				expect(nodeList._nodes.length).to.equal(2);
				expect(nodeList._nodes[0].text).to.equal('ab');
				expect(nodeList._nodes[1].text).to.equal('cd');
			});
		});

		describe('_mergeNodeAt', () => {
			it('should merge two text object if they have same attributes', () => {
				let attr = { foo: true };
				let nodeList = new _nodelist2.default(['ab', new _text2.default('cd', [attr])]);

				expect(nodeList._nodes.length).to.equal(2);

				nodeList._nodes[1]._attrs.delete(attr.key);
				nodeList._mergeNodeAt(2);

				expect(nodeList._nodes.length).to.equal(1);
				expect(nodeList._nodes[0].text).to.equal('abcd');
			});

			it('should do nothing if text objects has different attributes', () => {
				let nodeList = new _nodelist2.default([new _text2.default('ab', { foo: true }), 'cd']);

				nodeList._mergeNodeAt(2);

				expect(nodeList._nodes.length).to.equal(2);
				expect(nodeList._nodes[0].text).to.equal('ab');
				expect(nodeList._nodes[1].text).to.equal('cd');
			});
		});

		describe('_getCharIndex', () => {
			it('should return offset of character at given index from the beginning of the NodeListText containing that character', () => {
				let nodeList = new _nodelist2.default([new _text2.default('ab', { foo: true }), 'cd']);
				let charIndexC = nodeList._getCharIndex(2);
				let charIndexD = nodeList._getCharIndex(3);

				expect(charIndexC).to.equal(0);
				expect(charIndexD).to.equal(1);
			});
		});

		describe('toJSON', () => {
			it('should return serialized empty object', () => {
				let nodeList = new _nodelist2.default();

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal({});
			});

			it('should return serialized object', () => {
				let p = new _element2.default('p');
				let nodeList = new _nodelist2.default(p);

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal({ nodes: [(0, _utils.jsonParseStringify)(p)] });
			});

			it('should return serialized object with child text', () => {
				let p = new _element2.default('p', null, 'bar');
				let nodeList = new _nodelist2.default(p);

				let newVar = {
					nodes: [{
						children: { nodes: [{ text: 'bar' }] },
						name: 'p'
					}]
				};

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal(newVar);
			});

			it('should return serialized object for text', () => {
				let text = new _text2.default('bar');
				let nodeList = new _nodelist2.default(text);

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal({ nodes: [{ text: 'bar' }] });
			});

			it('should return serialized object for text with attributes', () => {
				let text = new _text2.default('bar', { bold: true });
				let nodeList = new _nodelist2.default(text);

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal({ nodes: [{ attributes: [['bold', true]], text: 'bar' }] });
			});

			it('should return serialized object for text with attributes', () => {
				let text = new _text2.default('bar', { bold: true });
				let nodeList = new _nodelist2.default(text);

				expect((0, _utils.jsonParseStringify)(nodeList)).to.deep.equal({
					nodes: [{ attributes: [['bold', true]], text: 'bar' }]
				});
			});
		});

		describe('fromJSON', () => {
			it('should create instance from empty serialized element', () => {
				let nodeList = new _nodelist2.default();

				let serialized = (0, _utils.jsonParseStringify)(nodeList);

				let deserialized = _nodelist2.default.fromJSON(serialized);

				expect(deserialized.length).to.equal(nodeList.length);
			});

			it('should create instance from serialized text with attributes', () => {
				let text = new _text2.default('bar', { bold: true });
				let nodeList = new _nodelist2.default(text);

				let serialized = (0, _utils.jsonParseStringify)(nodeList);

				let deserialized = _nodelist2.default.fromJSON(serialized);

				expect(deserialized.length).to.equal(nodeList.length);

				for (let i = 0; i < 3; i++) {
					expect(deserialized.get(i).character).to.equal(nodeList.get(i).character);
					expect(deserialized.get(i).hasAttribute('bold')).to.equal(nodeList.get(i).hasAttribute('bold'));
					expect(deserialized.get(i).getAttribute('bold')).to.equal(nodeList.get(i).getAttribute('bold'));
				}
			});

			it('should create instance from serialized element', () => {
				let p = new _element2.default('p');
				let nodeList = new _nodelist2.default(p);

				let serialized = (0, _utils.jsonParseStringify)(nodeList);

				let deserialized = _nodelist2.default.fromJSON(serialized);

				expect(deserialized.length).to.equal(nodeList.length);
				expect(deserialized.get(0).name).to.deep.equal(nodeList.get(0).name);
			});

			it('should create instance from serialized element with attributes', () => {
				let p = new _element2.default('p', { bold: true });
				let nodeList = new _nodelist2.default(p);

				let serialized = (0, _utils.jsonParseStringify)(nodeList);

				let deserialized = _nodelist2.default.fromJSON(serialized);

				expect(deserialized.length).to.equal(nodeList.length);
				expect(deserialized.get(0).name).to.deep.equal(nodeList.get(0).name);
				expect(deserialized.get(0).hasAttribute('bold')).to.equal(nodeList.get(0).hasAttribute('bold'));
				expect(deserialized.get(0).getAttribute('bold')).to.equal(nodeList.get(0).getAttribute('bold'));
			});

			it('should create instance from serialized element with parent', () => {
				let p = new _element2.default('p', null, 'bar');
				let nodeList = new _nodelist2.default(p);

				let serialized = (0, _utils.jsonParseStringify)(nodeList);
				let deserialized = _nodelist2.default.fromJSON(serialized);

				expect(deserialized.length).to.equal(nodeList.length);
				expect(deserialized.get(0).name).to.equal(nodeList.get(0).name);
				expect(deserialized.get(0).getChildCount()).to.equal(nodeList.get(0).getChildCount());

				for (let i = 0; i < 3; i++) {
					expect(deserialized.get(0).getChild(i).character).to.equal(nodeList.get(0).getChild(i).character);
					expect(deserialized.get(0).getChild(i).hasAttribute('bold')).to.equal(nodeList.get(0).getChild(i).hasAttribute('bold'));
					expect(deserialized.get(0).getChild(i).getAttribute('bold')).to.equal(nodeList.get(0).getChild(i).getAttribute('bold'));
				}
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
