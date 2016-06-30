define('tests', ['/ckeditor5/engine/model/node.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/utils/mapsequal.js'], function (_node, _element, _text, _mapsequal) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _node2 = _interopRequireDefault(_node);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _mapsequal2 = _interopRequireDefault(_mapsequal);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('CharacterProxy', () => {
		let text, element, char;

		beforeEach(() => {
			text = new _text2.default('abc', { foo: true });
			element = new _element2.default('div', [], [new _element2.default('p'), text, new _element2.default('p')]);
			char = element.getChild(2);
		});

		it('should extend Node class', () => {
			expect(char).to.be.instanceof(_node2.default);
		});

		it('should have correct character property', () => {
			expect(char).to.have.property('character').that.equals('b');
		});

		it('should have correct parent property', () => {
			expect(char).to.have.property('parent').that.equals(element);
		});

		it('should have attributes list equal to passed to Text instance', () => {
			expect((0, _mapsequal2.default)(char._attrs, text._attrs)).to.be.true;
		});

		it('should return correct index in parent node', () => {
			expect(char.getIndex()).to.equal(2);
		});

		describe('attributes interface', () => {
			describe('hasAttribute', () => {
				it('should return true if text fragment has attribute with given key', () => {
					expect(char.hasAttribute('foo')).to.be.true;
				});

				it('should return false if text fragment does not have attribute with given key', () => {
					expect(char.hasAttribute('abc')).to.be.false;
				});
			});

			describe('getAttribute', () => {
				it('should return attribute with given key if text fragment has given attribute', () => {
					expect(char.getAttribute('foo')).to.be.true;
				});

				it('should return undefined if text fragment does not have given attribute', () => {
					expect(char.getAttribute('bar')).to.be.undefined;
				});
			});

			describe('getAttributes', () => {
				it('should return an iterator that iterates over all attributes set on the text fragment', () => {
					let attrs = Array.from(char.getAttributes());

					expect(attrs).to.deep.equal([['foo', true]]);
				});
			});

			describe('setAttribute', () => {
				it('should set attribute on given character', () => {
					char.setAttribute('abc', 'xyz');

					expect(element.getChild(0).getAttribute('abc')).to.be.undefined;
					expect(element.getChild(1).getAttribute('abc')).to.be.undefined;
					expect(element.getChild(2).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(3).getAttribute('abc')).to.be.undefined;
					expect(element.getChild(4).getAttribute('abc')).to.be.undefined;
				});

				it('should remove attribute when passed attribute value is null', () => {
					char.setAttribute('foo', null);

					expect(element.getChild(0).hasAttribute('foo')).to.be.false;
					expect(element.getChild(1).hasAttribute('foo')).to.be.true;
					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.true;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;
				});

				it('should correctly split and merge characters', () => {
					char.setAttribute('abc', 'xyz');
					char.nextSibling.setAttribute('abc', 'xyz');

					expect(element._children._nodes.length).to.equal(4);
					expect(element._children._nodes[1].text).to.equal('a');
					expect(element._children._nodes[2].text).to.equal('bc');
				});
			});

			describe('setAttributesTo', () => {
				it('should remove all attributes from character and set given ones', () => {
					char.setAttributesTo({ abc: 'xyz' });

					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(2).getAttribute('abc')).to.equal('xyz');
				});
			});

			describe('removeAttribute', () => {
				it('should remove given attribute from character', () => {
					char.removeAttribute('foo');

					expect(element.getChild(0).hasAttribute('foo')).to.be.false;
					expect(element.getChild(1).hasAttribute('foo')).to.be.true;
					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.true;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;
				});
			});

			describe('clearAttributes', () => {
				it('should remove all attributes from text fragment', () => {
					char.setAttribute('abc', 'xyz');
					char.clearAttributes();

					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(2).hasAttribute('abc')).to.be.false;
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
