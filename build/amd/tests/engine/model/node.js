define('tests', ['/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js'], function (_element, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _element2 = _interopRequireDefault(_element);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Node', () => {
		let root;
		let one, two, three;
		let charB, charA, charR, img;

		before(() => {
			img = new _element2.default('img');

			one = new _element2.default('one');
			two = new _element2.default('two', null, ['b', 'a', img, 'r']);
			charB = two.getChild(0);
			charA = two.getChild(1);
			charR = two.getChild(3);
			three = new _element2.default('three');

			root = new _element2.default(null, null, [one, two, three]);
		});

		describe('should have a correct property', () => {
			it('depth', () => {
				expect(root).to.have.property('depth').that.equals(0);

				expect(one).to.have.property('depth').that.equals(1);
				expect(two).to.have.property('depth').that.equals(1);
				expect(three).to.have.property('depth').that.equals(1);

				expect(charB).to.have.property('depth').that.equals(2);
				expect(charA).to.have.property('depth').that.equals(2);
				expect(img).to.have.property('depth').that.equals(2);
				expect(charR).to.have.property('depth').that.equals(2);
			});

			it('root', () => {
				expect(root).to.have.property('root').that.equals(root);

				expect(one).to.have.property('root').that.equals(root);
				expect(two).to.have.property('root').that.equals(root);
				expect(three).to.have.property('root').that.equals(root);

				expect(img).to.have.property('root').that.equals(root);
			});

			it('nextSibling', () => {
				expect(root).to.have.property('nextSibling').that.is.null;

				expect(one).to.have.property('nextSibling').that.equals(two);
				expect(two).to.have.property('nextSibling').that.equals(three);
				expect(three).to.have.property('nextSibling').that.is.null;

				expect(charB).to.have.property('nextSibling').that.deep.equals(charA);
				expect(charA).to.have.property('nextSibling').that.deep.equals(img);
				expect(img).to.have.property('nextSibling').that.deep.equals(charR);
				expect(charR).to.have.property('nextSibling').that.is.null;
			});

			it('previousSibling', () => {
				expect(root).to.have.property('previousSibling').that.is.expect;

				expect(one).to.have.property('previousSibling').that.is.null;
				expect(two).to.have.property('previousSibling').that.equals(one);
				expect(three).to.have.property('previousSibling').that.equals(two);

				expect(charB).to.have.property('previousSibling').that.is.null;
				expect(charA).to.have.property('previousSibling').that.deep.equals(charB);
				expect(img).to.have.property('previousSibling').that.deep.equals(charA);
				expect(charR).to.have.property('previousSibling').that.deep.equals(img);
			});
		});

		describe('constructor', () => {
			it('should create empty attribute list if no parameters were passed', () => {
				let foo = new _element2.default('foo');

				expect(foo._attrs).to.be.instanceof(Map);
				expect(foo._attrs.size).to.equal(0);
			});

			it('should initialize attribute list with passed attributes', () => {
				let attrs = { foo: true, bar: false };
				let foo = new _element2.default('foo', attrs);

				expect(foo._attrs.size).to.equal(2);
				expect(foo.getAttribute('foo')).to.equal(true);
				expect(foo.getAttribute('bar')).to.equal(false);
			});
		});

		describe('getIndex', () => {
			it('should return null if the parent is null', () => {
				expect(root.getIndex()).to.be.null;
			});

			it('should return index in the parent', () => {
				expect(one.getIndex()).to.equal(0);
				expect(two.getIndex()).to.equal(1);
				expect(three.getIndex()).to.equal(2);

				expect(charB.getIndex()).to.equal(0);
				expect(img.getIndex()).to.equal(2);
				expect(charR.getIndex()).to.equal(3);
			});

			it('should throw an error if parent does not contains element', () => {
				let e = new _element2.default('e');
				let bar = new _element2.default('bar', [], []);

				e.parent = bar;

				expect(() => {
					e.getIndex();
				}).to.throw(_ckeditorerror2.default, /node-not-found-in-parent/);
			});
		});

		describe('getPath', () => {
			it('should return proper path', () => {
				expect(root.getPath()).to.deep.equal([]);

				expect(one.getPath()).to.deep.equal([0]);
				expect(two.getPath()).to.deep.equal([1]);
				expect(three.getPath()).to.deep.equal([2]);

				expect(charB.getPath()).to.deep.equal([1, 0]);
				expect(img.getPath()).to.deep.equal([1, 2]);
				expect(charR.getPath()).to.deep.equal([1, 3]);
			});
		});

		describe('attributes interface', () => {
			let node = new _element2.default('p', { foo: 'bar' });

			describe('hasAttribute', () => {
				it('should return true if element contains attribute with given key', () => {
					expect(node.hasAttribute('foo')).to.be.true;
				});

				it('should return false if element does not contain attribute with given key', () => {
					expect(node.hasAttribute('bar')).to.be.false;
				});
			});

			describe('getAttribute', () => {
				it('should return attribute value for given key if element contains given attribute', () => {
					expect(node.getAttribute('foo')).to.equal('bar');
				});

				it('should return undefined if element does not contain given attribute', () => {
					expect(node.getAttribute('bar')).to.be.undefined;
				});
			});

			describe('getAttributes', () => {
				it('should return an iterator that iterates over all attributes set on the element', () => {
					expect(Array.from(node.getAttributes())).to.deep.equal([['foo', 'bar']]);
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
