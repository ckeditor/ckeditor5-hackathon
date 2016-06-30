define('tests', ['/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/engine/view/documentfragment.js', '/ckeditor5/engine/view/rooteditableelement.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/view/_utils/createdocumentmock.js'], function (_element, _text, _documentfragment, _rooteditableelement, _ckeditorerror, _createdocumentmock) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _rooteditableelement2 = _interopRequireDefault(_rooteditableelement);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _createdocumentmock2 = _interopRequireDefault(_createdocumentmock);

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
			charB = new _text2.default('b');
			charA = new _text2.default('a');
			img = new _element2.default('img');
			charR = new _text2.default('r');

			one = new _element2.default('one');
			two = new _element2.default('two', null, [charB, charA, img, charR]);
			three = new _element2.default('three');

			root = new _element2.default(null, null, [one, two, three]);
		});

		describe('getNextSibling/getPreviousSibling', () => {
			it('should return next sibling', () => {
				expect(root.getNextSibling()).to.be.null;

				expect(one.getNextSibling()).to.equal(two);
				expect(two.getNextSibling()).to.equal(three);
				expect(three.getNextSibling()).to.be.null;

				expect(charB.getNextSibling()).to.equal(charA);
				expect(charA.getNextSibling()).to.equal(img);
				expect(img.getNextSibling()).to.equal(charR);
				expect(charR.getNextSibling()).to.be.null;
			});

			it('should return previous sibling', () => {
				expect(root.getPreviousSibling()).to.be.null;

				expect(one.getPreviousSibling()).to.be.null;
				expect(two.getPreviousSibling()).to.equal(one);
				expect(three.getPreviousSibling()).to.equal(two);

				expect(charB.getPreviousSibling()).to.be.null;
				expect(charA.getPreviousSibling()).to.equal(charB);
				expect(img.getPreviousSibling()).to.equal(charA);
				expect(charR.getPreviousSibling()).to.equal(img);
			});
		});

		describe('getAncestors', () => {
			it('should return empty array for node without ancestors', () => {
				const result = root.getAncestors();
				expect(result).to.be.an('array');
				expect(result.length).to.equal(0);
			});

			it('should return array including node itself if requested', () => {
				const result = root.getAncestors({ includeNode: true });
				expect(result).to.be.an('array');
				expect(result.length).to.equal(1);
				expect(result[0]).to.equal(root);
			});

			it('should return array of ancestors', () => {
				const result = charR.getAncestors();
				expect(result.length).to.equal(2);
				expect(result[0]).to.equal(root);
				expect(result[1]).to.equal(two);

				const result2 = charR.getAncestors({ includeNode: true });
				expect(result2.length).to.equal(3);
				expect(result2[0]).to.equal(root);
				expect(result2[1]).to.equal(two);
				expect(result2[2]).to.equal(charR);
			});

			it('should return array of ancestors starting from parent', () => {
				const result = charR.getAncestors({ parentFirst: true });
				expect(result.length).to.equal(2);
				expect(result[0]).to.equal(two);
				expect(result[1]).to.equal(root);

				const result2 = charR.getAncestors({ includeNode: true, parentFirst: true });
				expect(result2.length).to.equal(3);
				expect(result2[2]).to.equal(root);
				expect(result2[1]).to.equal(two);
				expect(result2[0]).to.equal(charR);
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
				expect(charA.getIndex()).to.equal(1);
				expect(img.getIndex()).to.equal(2);
				expect(charR.getIndex()).to.equal(3);
			});

			it('should throw an error if parent does not contain element', () => {
				let f = new _text2.default('f');
				let bar = new _element2.default('bar', [], []);

				f.parent = bar;

				expect(() => {
					f.getIndex();
				}).to.throw(_ckeditorerror2.default, /view-node-not-found-in-parent/);
			});
		});

		describe('getDocument', () => {
			it('should return null if any parent has not set Document', () => {
				expect(charA.getDocument()).to.be.null;
			});

			it('should return Document attached to the parent element', () => {
				const docMock = (0, _createdocumentmock2.default)();
				const parent = new _rooteditableelement2.default(docMock, 'div');
				const child = new _element2.default('p');

				child.parent = parent;

				expect(parent.getDocument()).to.equal(docMock);
				expect(child.getDocument()).to.equal(docMock);
			});

			it('should return null if element is inside DocumentFragment', () => {
				const child = new _element2.default('p');
				new _documentfragment2.default([child]);

				expect(child.getDocument()).to.be.null;
			});
		});

		describe('getRoot', () => {
			it('should return this element if it has no parent', () => {
				const child = new _element2.default('p');

				expect(child.getRoot()).to.equal(child);
			});

			it('should return root element', () => {
				const parent = new _rooteditableelement2.default((0, _createdocumentmock2.default)(), 'div');
				const child = new _element2.default('p');

				child.parent = parent;

				expect(parent.getRoot()).to.equal(parent);
				expect(child.getRoot()).to.equal(parent);
			});
		});

		describe('remove', () => {
			it('should remove node from its parent', () => {
				const char = new _text2.default('a');
				const parent = new _element2.default('p', null, [char]);
				char.remove();

				expect(parent.getChildIndex(char)).to.equal(-1);
			});

			it('uses parent.removeChildren method', () => {
				const char = new _text2.default('a');
				const parent = new _element2.default('p', null, [char]);
				const removeChildrenSpy = sinon.spy(parent, 'removeChildren');
				const index = char.getIndex();
				char.remove();
				removeChildrenSpy.restore();
				sinon.assert.calledOnce(removeChildrenSpy);
				sinon.assert.calledWithExactly(removeChildrenSpy, index);
			});
		});

		describe('change event', () => {
			let root, text, img;
			let rootChangeSpy;

			before(() => {
				rootChangeSpy = sinon.spy();
			});

			beforeEach(() => {
				text = new _text2.default('foo');
				img = new _element2.default('img');
				img.setAttribute('src', 'img.png');

				root = new _element2.default('p', { renderer: { markToSync: rootChangeSpy } });
				root.appendChildren([text, img]);

				root.on('change:children', (evt, node) => rootChangeSpy('children', node));
				root.on('change:attributes', (evt, node) => rootChangeSpy('attributes', node));
				root.on('change:text', (evt, node) => rootChangeSpy('text', node));

				rootChangeSpy.reset();
			});

			it('should be fired on the node', () => {
				const imgChangeSpy = sinon.spy();

				img.on('change:attributes', (evt, node) => {
					imgChangeSpy('attributes', node);
				});

				img.setAttribute('width', 100);

				sinon.assert.calledOnce(imgChangeSpy);
				sinon.assert.calledWith(imgChangeSpy, 'attributes', img);
			});

			it('should be fired on the parent', () => {
				img.setAttribute('width', 100);

				sinon.assert.calledOnce(rootChangeSpy);
				sinon.assert.calledWith(rootChangeSpy, 'attributes', img);
			});

			describe('setAttr', () => {
				it('should fire change event', () => {
					img.setAttribute('width', 100);

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'attributes', img);
				});
			});

			describe('removeAttr', () => {
				it('should fire change event', () => {
					img.removeAttribute('src');

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'attributes', img);
				});
			});

			describe('insertChildren', () => {
				it('should fire change event', () => {
					root.insertChildren(1, new _element2.default('img'));

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'children', root);
				});
			});

			describe('appendChildren', () => {
				it('should fire change event', () => {
					root.appendChildren(new _element2.default('img'));

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'children', root);
				});
			});

			describe('removeChildren', () => {
				it('should fire change event', () => {
					root.removeChildren(1, 1);

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'children', root);
				});
			});

			describe('removeChildren', () => {
				it('should fire change event', () => {
					text.data = 'bar';

					sinon.assert.calledOnce(rootChangeSpy);
					sinon.assert.calledWith(rootChangeSpy, 'text', text);
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
