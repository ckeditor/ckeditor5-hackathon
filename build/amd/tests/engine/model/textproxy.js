define('tests', ['/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/textproxy.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/characterproxy.js'], function (_element, _text, _textproxy, _document, _characterproxy) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _textproxy2 = _interopRequireDefault(_textproxy);

	var _document2 = _interopRequireDefault(_document);

	var _characterproxy2 = _interopRequireDefault(_characterproxy);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('TextProxy', () => {
		let doc, text, element, textFragment, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			element = new _element2.default('div');
			root.insertChildren(0, element);

			text = new _text2.default('foobar', { foo: 'bar' });
			element.insertChildren(0, text);
			textFragment = new _textproxy2.default(element.getChild(2), 3);
		});

		afterEach(() => {
			element.removeChildren(0, 1);
		});

		it('should have first property pointing to the first character node contained in TextProxy', () => {
			let char = textFragment.first;

			expect(char.getPath()).to.deep.equal([0, 2]);
			expect(char.character).to.equal('o');
		});

		it('should have last property pointing to the last character node contained in TextProxy', () => {
			let char = textFragment.last;

			expect(char.getPath()).to.deep.equal([0, 4]);
			expect(char.character).to.equal('a');
		});

		it('should have text property', () => {
			expect(textFragment).to.have.property('text').that.equals('oba');
		});

		describe('getCharAt', () => {
			it('should return CharacterProxy element representing proper tree model character node', () => {
				let char = textFragment.getCharAt(1);

				expect(char).to.be.instanceof(_characterproxy2.default);
				expect(char.character).to.equal('b');
				expect(char.getAttribute('foo')).to.equal('bar');
				expect(char.parent).to.equal(element);
			});

			it('should return null for wrong index', () => {
				expect(textFragment.getCharAt(-1)).to.be.null;
				expect(textFragment.getCharAt(4)).to.be.null;
			});
		});

		describe('attributes interface', () => {
			describe('hasAttribute', () => {
				it('should return true if text fragment has attribute with given key', () => {
					expect(textFragment.hasAttribute('foo')).to.be.true;
				});

				it('should return false if text fragment does not have attribute with given key', () => {
					expect(textFragment.hasAttribute('abc')).to.be.false;
				});
			});

			describe('getAttribute', () => {
				it('should return attribute with given key if text fragment has given attribute', () => {
					expect(textFragment.getAttribute('foo')).to.equal('bar');
				});

				it('should return undefined if text fragment does not have given attribute', () => {
					expect(textFragment.getAttribute('bar')).to.be.undefined;
				});
			});

			describe('getAttributes', () => {
				it('should return an iterator that iterates over all attributes set on the text fragment', () => {
					let attrs = Array.from(textFragment.getAttributes());

					expect(attrs).to.deep.equal([['foo', 'bar']]);
				});
			});

			describe('setAttribute', () => {
				it('should set attribute on characters contained in text fragment', () => {
					textFragment.setAttribute('abc', 'xyz');

					expect(element.getChild(0).getAttribute('abc')).to.be.undefined;
					expect(element.getChild(1).getAttribute('abc')).to.be.undefined;
					expect(element.getChild(2).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(3).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(4).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(5).getAttribute('abc')).to.be.undefined;
				});

				it('should remove attribute when passed attribute value is null', () => {
					textFragment.setAttribute('foo', null);

					expect(element.getChild(0).hasAttribute('foo')).to.be.true;
					expect(element.getChild(1).hasAttribute('foo')).to.be.true;
					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.false;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;
					expect(element.getChild(5).hasAttribute('foo')).to.be.true;
				});

				it('should correctly split and merge text fragments and refresh this text fragment properties', () => {
					let otherTextProxy = new _textproxy2.default(element.getChild(5), 1);
					otherTextProxy.setAttribute('foo', null);
					textFragment.setAttribute('foo', null);

					expect(element._children._nodes.length).to.equal(2);
					expect(textFragment.first._nodeListText).to.equal(element._children._nodes[1]);
				});
			});

			describe('setAttributesTo', () => {
				it('should remove all attributes from text fragment and set given ones', () => {
					textFragment.setAttributesTo({ abc: 'xyz' });

					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.false;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;

					expect(element.getChild(2).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(3).getAttribute('abc')).to.equal('xyz');
					expect(element.getChild(4).getAttribute('abc')).to.equal('xyz');
				});
			});

			describe('removeAttribute', () => {
				it('should remove given attribute from text fragment', () => {
					textFragment.removeAttribute('foo');

					expect(element.getChild(0).hasAttribute('foo')).to.be.true;
					expect(element.getChild(1).hasAttribute('foo')).to.be.true;
					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.false;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;
					expect(element.getChild(5).hasAttribute('foo')).to.be.true;
				});
			});

			describe('clearAttributes', () => {
				it('should remove all attributes from text fragment', () => {
					textFragment.setAttribute('abc', 'xyz');
					textFragment.clearAttributes();

					expect(element.getChild(2).hasAttribute('foo')).to.be.false;
					expect(element.getChild(3).hasAttribute('foo')).to.be.false;
					expect(element.getChild(4).hasAttribute('foo')).to.be.false;

					expect(element.getChild(2).hasAttribute('abc')).to.be.false;
					expect(element.getChild(3).hasAttribute('abc')).to.be.false;
					expect(element.getChild(4).hasAttribute('abc')).to.be.false;
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
