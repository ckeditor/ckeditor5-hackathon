define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/ckeditor5/_utils/utils.js', '/tests/engine/model/_utils/utils.js'], function (_document, _documentfragment, _element, _text, _position, _ckeditorerror, _utils, _utils3) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('position', () => {
		let doc, root, otherRoot, p, ul, li1, li2, f, o, z, b, a, r;

		// root
		//  |- p         Before: [ 0 ]       After: [ 1 ]
		//  |- ul        Before: [ 1 ]       After: [ 2 ]
		//     |- li     Before: [ 1, 0 ]    After: [ 1, 1 ]
		//     |  |- f   Before: [ 1, 0, 0 ] After: [ 1, 0, 1 ]
		//     |  |- o   Before: [ 1, 0, 1 ] After: [ 1, 0, 2 ]
		//     |  |- z   Before: [ 1, 0, 2 ] After: [ 1, 0, 3 ]
		//     |- li     Before: [ 1, 1 ]    After: [ 1, 2 ]
		//        |- b   Before: [ 1, 1, 0 ] After: [ 1, 1, 1 ]
		//        |- a   Before: [ 1, 1, 1 ] After: [ 1, 1, 2 ]
		//        |- r   Before: [ 1, 1, 2 ] After: [ 1, 1, 3 ]
		before(() => {
			doc = new _document2.default();

			root = doc.createRoot('root');
			otherRoot = doc.createRoot('otherRoot');

			li1 = new _element2.default('li', [], 'foz');

			f = li1.getChild(0);
			o = li1.getChild(1);
			z = li1.getChild(2);

			li2 = new _element2.default('li', [], 'bar');

			b = li2.getChild(0);
			a = li2.getChild(1);
			r = li2.getChild(2);

			ul = new _element2.default('ul', [], [li1, li2]);

			p = new _element2.default('p');

			root.insertChildren(0, [p, ul]);
		});

		describe('constructor', () => {
			it('should create a position with path and document', () => {
				let position = new _position2.default(root, [0]);

				expect(position).to.have.property('path').that.deep.equals([0]);
				expect(position).to.have.property('root').that.equals(root);
			});

			it('should accept DocumentFragment as a root', () => {
				const frag = new _documentfragment2.default();
				const pos = new _position2.default(frag, [0]);

				expect(pos).to.have.property('root', frag);
			});

			it('should accept detached Element as a root', () => {
				const el = new _element2.default('p');
				const pos = new _position2.default(el, [0]);

				expect(pos).to.have.property('root', el);
				expect(pos.path).to.deep.equal([0]);
			});

			it('should normalize attached Element as a root', () => {
				const pos = new _position2.default(li1, [0, 2]);

				expect(pos).to.have.property('root', root);
				expect(pos.isEqual(_position2.default.createAt(li1, 0, 2)));
			});

			it('should normalize Element from a detached branch as a root', () => {
				const rootEl = new _element2.default('p', null, [new _element2.default('a')]);
				const elA = rootEl.getChild(0);
				const pos = new _position2.default(elA, [0]);

				expect(pos).to.have.property('root', rootEl);
				expect(pos.isEqual(_position2.default.createAt(elA, 0)));
			});

			it('should throw error if given path is incorrect', () => {
				expect(() => {
					new _position2.default(root, {});
				}).to.throw(_ckeditorerror2.default, /position-path-incorrect/);

				expect(() => {
					new _position2.default(root, []);
				}).to.throw(_ckeditorerror2.default, /position-path-incorrect/);
			});

			it('should throw error if given root is invalid', () => {
				expect(() => {
					new _position2.default(new _text2.default('a'));
				}).to.throw(_ckeditorerror2.default, /position-root-invalid/);

				expect(() => {
					new _position2.default();
				}).to.throw(_ckeditorerror2.default, /position-root-invalid/);
			});
		});

		describe('createFromParentAndOffset', () => {
			it('should create positions form node and offset', () => {
				expect(_position2.default.createFromParentAndOffset(root, 0)).to.have.property('path').that.deep.equals([0]);
				expect(_position2.default.createFromParentAndOffset(root, 1)).to.have.property('path').that.deep.equals([1]);
				expect(_position2.default.createFromParentAndOffset(root, 2)).to.have.property('path').that.deep.equals([2]);

				expect(_position2.default.createFromParentAndOffset(p, 0)).to.have.property('path').that.deep.equals([0, 0]);

				expect(_position2.default.createFromParentAndOffset(ul, 0)).to.have.property('path').that.deep.equals([1, 0]);
				expect(_position2.default.createFromParentAndOffset(ul, 1)).to.have.property('path').that.deep.equals([1, 1]);
				expect(_position2.default.createFromParentAndOffset(ul, 2)).to.have.property('path').that.deep.equals([1, 2]);

				expect(_position2.default.createFromParentAndOffset(li1, 0)).to.have.property('path').that.deep.equals([1, 0, 0]);
				expect(_position2.default.createFromParentAndOffset(li1, 1)).to.have.property('path').that.deep.equals([1, 0, 1]);
				expect(_position2.default.createFromParentAndOffset(li1, 2)).to.have.property('path').that.deep.equals([1, 0, 2]);
				expect(_position2.default.createFromParentAndOffset(li1, 3)).to.have.property('path').that.deep.equals([1, 0, 3]);
			});

			it('throws when parent is not an element', () => {
				expect(() => {
					_position2.default.createFromParentAndOffset(b, 0);
				}).to.throw(_ckeditorerror2.default, /^position-parent-incorrect/);
			});

			it('works with a doc frag', () => {
				const frag = new _documentfragment2.default();

				expect(_position2.default.createFromParentAndOffset(frag, 0)).to.have.property('root', frag);
			});
		});

		describe('createAt', () => {
			it('should create positions from positions', () => {
				const spy = _utils2.default.sinon.spy(_position2.default, 'createFromPosition');

				expect(_position2.default.createAt(_position2.default.createAt(ul))).to.have.property('path').that.deep.equals([1, 0]);

				expect(spy.calledOnce).to.be.true;
			});

			it('should create positions from node and offset', () => {
				expect(_position2.default.createAt(ul)).to.have.property('path').that.deep.equals([1, 0]);
				expect(_position2.default.createAt(li1)).to.have.property('path').that.deep.equals([1, 0, 0]);
				expect(_position2.default.createAt(ul, 1)).to.have.property('path').that.deep.equals([1, 1]);
			});

			it('should create positions from node and flag', () => {
				expect(_position2.default.createAt(root, 'END')).to.have.property('path').that.deep.equals([2]);

				expect(_position2.default.createAt(p, 'BEFORE')).to.have.property('path').that.deep.equals([0]);
				expect(_position2.default.createAt(a, 'BEFORE')).to.have.property('path').that.deep.equals([1, 1, 1]);

				expect(_position2.default.createAt(p, 'AFTER')).to.have.property('path').that.deep.equals([1]);
				expect(_position2.default.createAt(a, 'AFTER')).to.have.property('path').that.deep.equals([1, 1, 2]);

				expect(_position2.default.createAt(ul, 'END')).to.have.property('path').that.deep.equals([1, 2]);
			});
		});

		describe('createBefore', () => {
			it('should create positions before elements', () => {
				expect(_position2.default.createBefore(p)).to.have.property('path').that.deep.equals([0]);

				expect(_position2.default.createBefore(ul)).to.have.property('path').that.deep.equals([1]);

				expect(_position2.default.createBefore(li1)).to.have.property('path').that.deep.equals([1, 0]);

				expect(_position2.default.createBefore(f)).to.have.property('path').that.deep.equals([1, 0, 0]);
				expect(_position2.default.createBefore(o)).to.have.property('path').that.deep.equals([1, 0, 1]);
				expect(_position2.default.createBefore(z)).to.have.property('path').that.deep.equals([1, 0, 2]);

				expect(_position2.default.createBefore(li2)).to.have.property('path').that.deep.equals([1, 1]);

				expect(_position2.default.createBefore(b)).to.have.property('path').that.deep.equals([1, 1, 0]);
				expect(_position2.default.createBefore(a)).to.have.property('path').that.deep.equals([1, 1, 1]);
				expect(_position2.default.createBefore(r)).to.have.property('path').that.deep.equals([1, 1, 2]);
			});

			it('should throw error if one try to create positions before root', () => {
				expect(() => {
					_position2.default.createBefore(root);
				}).to.throw(_ckeditorerror2.default, /position-before-root/);
			});
		});

		describe('createAfter', () => {
			it('should create positions after elements', () => {
				expect(_position2.default.createAfter(p)).to.have.property('path').that.deep.equals([1]);

				expect(_position2.default.createAfter(ul)).to.have.property('path').that.deep.equals([2]);

				expect(_position2.default.createAfter(li1)).to.have.property('path').that.deep.equals([1, 1]);

				expect(_position2.default.createAfter(f)).to.have.property('path').that.deep.equals([1, 0, 1]);
				expect(_position2.default.createAfter(o)).to.have.property('path').that.deep.equals([1, 0, 2]);
				expect(_position2.default.createAfter(z)).to.have.property('path').that.deep.equals([1, 0, 3]);

				expect(_position2.default.createAfter(li2)).to.have.property('path').that.deep.equals([1, 2]);

				expect(_position2.default.createAfter(b)).to.have.property('path').that.deep.equals([1, 1, 1]);
				expect(_position2.default.createAfter(a)).to.have.property('path').that.deep.equals([1, 1, 2]);
				expect(_position2.default.createAfter(r)).to.have.property('path').that.deep.equals([1, 1, 3]);
			});

			it('should throw error if one try to make positions after root', () => {
				expect(() => {
					_position2.default.createAfter(root);
				}).to.throw(_ckeditorerror2.default, /position-after-root/);
			});
		});

		describe('createFromPosition', () => {
			it('should create a copy of given position', () => {
				let original = new _position2.default(root, [1, 2, 3]);
				let position = _position2.default.createFromPosition(original);

				expect(position).to.be.instanceof(_position2.default);
				expect(position.isEqual(original)).to.be.true;
				expect(position).not.to.be.equal(original);
			});
		});

		it('should have parent', () => {
			expect(new _position2.default(root, [0])).to.have.property('parent').that.equals(root);
			expect(new _position2.default(root, [1])).to.have.property('parent').that.equals(root);
			expect(new _position2.default(root, [2])).to.have.property('parent').that.equals(root);

			expect(new _position2.default(root, [0, 0])).to.have.property('parent').that.equals(p);

			expect(new _position2.default(root, [1, 0])).to.have.property('parent').that.equals(ul);
			expect(new _position2.default(root, [1, 1])).to.have.property('parent').that.equals(ul);
			expect(new _position2.default(root, [1, 2])).to.have.property('parent').that.equals(ul);

			expect(new _position2.default(root, [1, 0, 0])).to.have.property('parent').that.equals(li1);
			expect(new _position2.default(root, [1, 0, 1])).to.have.property('parent').that.equals(li1);
			expect(new _position2.default(root, [1, 0, 2])).to.have.property('parent').that.equals(li1);
			expect(new _position2.default(root, [1, 0, 3])).to.have.property('parent').that.equals(li1);
		});

		it('should have offset', () => {
			expect(new _position2.default(root, [0])).to.have.property('offset').that.equals(0);
			expect(new _position2.default(root, [1])).to.have.property('offset').that.equals(1);
			expect(new _position2.default(root, [2])).to.have.property('offset').that.equals(2);

			expect(new _position2.default(root, [0, 0])).to.have.property('offset').that.equals(0);

			expect(new _position2.default(root, [1, 0])).to.have.property('offset').that.equals(0);
			expect(new _position2.default(root, [1, 1])).to.have.property('offset').that.equals(1);
			expect(new _position2.default(root, [1, 2])).to.have.property('offset').that.equals(2);

			expect(new _position2.default(root, [1, 0, 0])).to.have.property('offset').that.equals(0);
			expect(new _position2.default(root, [1, 0, 1])).to.have.property('offset').that.equals(1);
			expect(new _position2.default(root, [1, 0, 2])).to.have.property('offset').that.equals(2);
			expect(new _position2.default(root, [1, 0, 3])).to.have.property('offset').that.equals(3);
		});

		it('should be able to set offset', () => {
			let position = new _position2.default(root, [1, 0, 2]);
			position.offset = 4;

			expect(position.offset).to.equal(4);
			expect(position.path).to.deep.equal([1, 0, 4]);
		});

		it('should have nodeBefore', () => {
			expect(new _position2.default(root, [0]).nodeBefore).to.be.null;
			expect(new _position2.default(root, [1]).nodeBefore).to.equal(p);
			expect(new _position2.default(root, [2]).nodeBefore).to.equal(ul);

			expect(new _position2.default(root, [0, 0]).nodeBefore).to.null;

			expect(new _position2.default(root, [1, 0]).nodeBefore).to.be.null;
			expect(new _position2.default(root, [1, 1]).nodeBefore).to.equal(li1);
			expect(new _position2.default(root, [1, 2]).nodeBefore).to.equal(li2);

			expect(new _position2.default(root, [1, 0, 0]).nodeBefore).to.be.null;
			expect(new _position2.default(root, [1, 0, 1]).nodeBefore.character).to.equal('f');
			expect(new _position2.default(root, [1, 0, 2]).nodeBefore.character).to.equal('o');
			expect(new _position2.default(root, [1, 0, 3]).nodeBefore.character).to.equal('z');
		});

		it('should have nodeAfter', () => {
			expect(new _position2.default(root, [0]).nodeAfter).to.equal(p);
			expect(new _position2.default(root, [1]).nodeAfter).to.equal(ul);
			expect(new _position2.default(root, [2]).nodeAfter).to.be.null;

			expect(new _position2.default(root, [0, 0]).nodeAfter).to.be.null;

			expect(new _position2.default(root, [1, 0]).nodeAfter).to.equal(li1);
			expect(new _position2.default(root, [1, 1]).nodeAfter).to.equal(li2);
			expect(new _position2.default(root, [1, 2]).nodeAfter).to.be.null;

			expect(new _position2.default(root, [1, 0, 0]).nodeAfter.character).to.equal('f');
			expect(new _position2.default(root, [1, 0, 1]).nodeAfter.character).to.equal('o');
			expect(new _position2.default(root, [1, 0, 2]).nodeAfter.character).to.equal('z');
			expect(new _position2.default(root, [1, 0, 3]).nodeAfter).to.be.null;
		});

		it('should have proper parent path', () => {
			let position = new _position2.default(root, [1, 2, 3]);

			expect(position.getParentPath()).to.deep.equal([1, 2]);
		});

		describe('isBefore', () => {
			it('should return true if given position has same root and is before this position', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let beforePosition = new _position2.default(root, [1, 0]);

				expect(position.isAfter(beforePosition)).to.be.true;
			});

			it('should return false if given position has same root and is not before this position', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let afterPosition = new _position2.default(root, [1, 2]);

				expect(position.isAfter(afterPosition)).to.be.false;
			});

			it('should return false if given position has different root', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let differentPosition = new _position2.default(otherRoot, [1, 0]);

				expect(position.isAfter(differentPosition)).to.be.false;
			});
		});

		describe('isEqual', () => {
			it('should return true if given position has same path and root', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let samePosition = new _position2.default(root, [1, 1, 2]);

				expect(position.isEqual(samePosition)).to.be.true;
			});

			it('should return false if given position has different path', () => {
				let position = new _position2.default(root, [1, 1, 1]);
				let differentPosition = new _position2.default(root, [1, 2, 2]);

				expect(position.isEqual(differentPosition)).to.be.false;
			});

			it('should return false if given position has different root', () => {
				let position = new _position2.default(root, [1, 1, 1]);
				let differentPosition = new _position2.default(otherRoot, [1, 1, 1]);

				expect(position.isEqual(differentPosition)).to.be.false;
			});
		});

		describe('isAfter', () => {
			it('should return true if given position has same root and is after this position', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let afterPosition = new _position2.default(root, [1, 2]);

				expect(position.isBefore(afterPosition)).to.be.true;
			});

			it('should return false if given position has same root and is not after this position', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let beforePosition = new _position2.default(root, [1, 0]);

				expect(position.isBefore(beforePosition)).to.be.false;
			});

			it('should return false if given position has different root', () => {
				let position = new _position2.default(root, [1, 1, 2]);
				let differentPosition = new _position2.default(otherRoot, [1, 2]);

				expect(position.isBefore(differentPosition)).to.be.false;
			});
		});

		describe('isTouching', () => {
			it('should return true if positions are same', () => {
				let position = new _position2.default(root, [1, 1, 1]);
				let result = position.isTouching(new _position2.default(root, [1, 1, 1]));

				expect(result).to.be.true;
			});

			it('should return true if given position is in next node and there are no whole nodes before it', () => {
				let positionA = new _position2.default(root, [1]);
				let positionB = new _position2.default(root, [1, 0, 0]);

				expect(positionA.isTouching(positionB)).to.be.true;
				expect(positionB.isTouching(positionA)).to.be.true;
			});

			it('should return true if given position is in previous node and there are no whole nodes after it', () => {
				let positionA = new _position2.default(root, [2]);
				let positionB = new _position2.default(root, [1, 1, 3]);

				expect(positionA.isTouching(positionB)).to.be.true;
				expect(positionB.isTouching(positionA)).to.be.true;
			});

			it('should return true if positions are in different sub-trees but there are no whole nodes between them', () => {
				let positionA = new _position2.default(root, [1, 0, 3]);
				let positionB = new _position2.default(root, [1, 1, 0]);

				expect(positionA.isTouching(positionB)).to.be.true;
				expect(positionB.isTouching(positionA)).to.be.true;
			});

			it('should return false if there are whole nodes between positions', () => {
				let positionA = new _position2.default(root, [2]);
				let positionB = new _position2.default(root, [1, 0, 3]);

				expect(positionA.isTouching(positionB)).to.be.false;
				expect(positionB.isTouching(positionA)).to.be.false;
			});

			it('should return false if there are whole nodes between positions', () => {
				let positionA = new _position2.default(root, [1, 0, 3]);
				let positionB = new _position2.default(root, [1, 1, 1]);

				expect(positionA.isTouching(positionB)).to.be.false;
				expect(positionB.isTouching(positionA)).to.be.false;
			});

			it('should return false if positions are in different roots', () => {
				let positionA = new _position2.default(root, [1, 0, 3]);
				let positionB = new _position2.default(otherRoot, [1, 1, 0]);

				expect(positionA.isTouching(positionB)).to.be.false;
				expect(positionB.isTouching(positionA)).to.be.false;
			});
		});

		describe('isAtStart', () => {
			it('should return true if position is at the beginning of its parent', () => {
				expect(new _position2.default(root, [0]).isAtStart()).to.be.true;
				expect(new _position2.default(root, [1]).isAtStart()).to.be.false;
			});
		});

		describe('isAtEnd', () => {
			it('should return true if position is at the end of its parent', () => {
				expect(new _position2.default(root, [root.getChildCount()]).isAtEnd()).to.be.true;
				expect(new _position2.default(root, [0]).isAtEnd()).to.be.false;
			});
		});

		describe('compareWith', () => {
			it('should return SAME if positions are same', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const compared = new _position2.default(root, [1, 2, 3]);

				expect(position.compareWith(compared)).to.equal('SAME');
			});

			it('should return BEFORE if the position is before compared one', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const compared = new _position2.default(root, [1, 3]);

				expect(position.compareWith(compared)).to.equal('BEFORE');
			});

			it('should return AFTER if the position is after compared one', () => {
				const position = new _position2.default(root, [1, 2, 3, 4]);
				const compared = new _position2.default(root, [1, 2, 3]);

				expect(position.compareWith(compared)).to.equal('AFTER');
			});

			it('should return DIFFERENT if positions are in different roots', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const compared = new _position2.default(otherRoot, [1, 2, 3]);

				expect(position.compareWith(compared)).to.equal('DIFFERENT');
			});
		});

		describe('getTransformedByInsertion', () => {
			it('should return a new Position instance', () => {
				const position = new _position2.default(root, [0]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [2]), 4, false);

				expect(transformed).not.to.equal(position);
				expect(transformed).to.be.instanceof(_position2.default);
			});

			it('should increment offset if insertion is in the same parent and closer offset', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 2, 2]), 2, false);

				expect(transformed.offset).to.equal(5);
			});

			it('should not increment offset if insertion position is in different root', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(otherRoot, [1, 2, 2]), 2, false);

				expect(transformed.offset).to.equal(3);
			});

			it('should not increment offset if insertion is in the same parent and the same offset', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 2, 3]), 2, false);

				expect(transformed.offset).to.equal(3);
			});

			it('should increment offset if insertion is in the same parent and the same offset and it is inserted before', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 2, 3]), 2, true);

				expect(transformed.offset).to.equal(5);
			});

			it('should not increment offset if insertion is in the same parent and further offset', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 2, 4]), 2, false);

				expect(transformed.offset).to.equal(3);
			});

			it('should update path if insertion position parent is a node from that path and offset is before next node on that path', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 2]), 2, false);

				expect(transformed.path).to.deep.equal([1, 4, 3]);
			});

			it('should not update path if insertion position parent is a node from that path and offset is after next node on that path', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByInsertion(new _position2.default(root, [1, 3]), 2, false);

				expect(transformed.path).to.deep.equal([1, 2, 3]);
			});
		});

		describe('getTransformedByDeletion', () => {
			it('should return a new Position instance', () => {
				const position = new _position2.default(root, [0]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [2]), 4);

				expect(transformed).not.to.equal(position);
				expect(transformed).to.be.instanceof(_position2.default);
			});

			it('should return null if original position is inside one of removed nodes', () => {
				const position = new _position2.default(root, [1, 2]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [0]), 2);

				expect(transformed).to.be.null;
			});

			it('should decrement offset if deletion is in the same parent and closer offset', () => {
				const position = new _position2.default(root, [1, 2, 7]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [1, 2, 2]), 2);

				expect(transformed.offset).to.equal(5);
			});

			it('should return null if original position is between removed nodes', () => {
				const position = new _position2.default(root, [1, 2, 4]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [1, 2, 3]), 5);

				expect(transformed).to.be.null;
			});

			it('should not decrement offset if deletion position is in different root', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByDeletion(new _position2.default(otherRoot, [1, 2, 1]), 2);

				expect(transformed.offset).to.equal(3);
			});

			it('should not decrement offset if deletion is in the same parent and further offset', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [1, 2, 4]), 2);

				expect(transformed.offset).to.equal(3);
			});

			it('should update path if deletion position parent is a node from that path and offset is before next node on that path', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [1, 0]), 2);

				expect(transformed.path).to.deep.equal([1, 0, 3]);
			});

			it('should not update path if deletion position parent is a node from that path and offset is after next node on that path', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByDeletion(new _position2.default(root, [1, 3]), 2);

				expect(transformed.path).to.deep.equal([1, 2, 3]);
			});
		});

		describe('getTransformedByMove', () => {
			it('should increment offset if a range was moved to the same parent and closer offset', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByMove(new _position2.default(root, [2]), new _position2.default(root, [1, 2, 0]), 3, false);

				expect(transformed.path).to.deep.equal([1, 2, 6]);
			});

			it('should decrement offset if a range was moved from the same parent and closer offset', () => {
				const position = new _position2.default(root, [1, 2, 6]);
				const transformed = position.getTransformedByMove(new _position2.default(root, [1, 2, 0]), new _position2.default(root, [2]), 3, false);

				expect(transformed.path).to.deep.equal([1, 2, 3]);
			});

			it('should decrement offset if position was at the end of a range and move was not sticky', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByMove(new _position2.default(root, [1, 2, 0]), new _position2.default(root, [2]), 3, false);

				expect(transformed.path).to.deep.equal([1, 2, 0]);
			});

			it('should update path if position was at the end of a range and move was sticky', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByMove(new _position2.default(root, [1, 2, 0]), new _position2.default(root, [2]), 3, false, true);

				expect(transformed.path).to.deep.equal([5]);
			});

			it('should update path if a range contained this position', () => {
				const position = new _position2.default(root, [1, 2, 3]);
				const transformed = position.getTransformedByMove(new _position2.default(root, [1, 1]), new _position2.default(root, [2, 1]), 3, false);

				expect(transformed.path).to.deep.equal([2, 2, 3]);
			});
		});

		describe('_getCombined', () => {
			it('should return correct combination of this and given positions', () => {
				const position = new _position2.default(root, [1, 3, 4, 2]);
				const sourcePosition = new _position2.default(root, [1, 1]);
				const targetPosition = new _position2.default(root, [2, 5]);

				const combined = position._getCombined(sourcePosition, targetPosition);

				expect(combined.path).to.deep.equal([2, 7, 4, 2]);
			});
		});

		describe('getShiftedBy', () => {
			it('should return a new instance of Position with offset changed by shift value', () => {
				let position = new _position2.default(root, [1, 2, 3]);
				let shifted = position.getShiftedBy(2);

				expect(shifted).to.be.instanceof(_position2.default);
				expect(shifted).to.not.equal(position);
				expect(shifted.path).to.deep.equal([1, 2, 5]);
			});

			it('should accept negative values', () => {
				let position = new _position2.default(root, [1, 2, 3]);
				let shifted = position.getShiftedBy(-2);

				expect(shifted.path).to.deep.equal([1, 2, 1]);
			});

			it('should not let setting offset lower than zero', () => {
				let position = new _position2.default(root, [1, 2, 3]);
				let shifted = position.getShiftedBy(-7);

				expect(shifted.path).to.deep.equal([1, 2, 0]);
			});
		});

		describe('toJSON', () => {
			it('should serialize position', () => {
				let position = new _position2.default(root, [0]);

				let serialized = (0, _utils3.jsonParseStringify)(position);

				expect(serialized).to.deep.equal({ root: 'root', path: [0] });
			});

			it('should serialize position from graveyard', () => {
				let position = new _position2.default(doc.graveyard, [0]);

				let serialized = (0, _utils3.jsonParseStringify)(position);

				expect(serialized).to.deep.equal({ root: '$graveyard', path: [0] });
			});
		});

		describe('fromJSON', () => {
			it('should create object with given document', () => {
				let deserialized = _position2.default.fromJSON({ root: 'root', path: [0, 1, 2] }, doc);

				expect(deserialized.root).to.equal(root);
				expect(deserialized.path).to.deep.equal([0, 1, 2]);
			});

			it('should create object from graveyard', () => {
				let deserialized = _position2.default.fromJSON({ root: '$graveyard', path: [0, 1, 2] }, doc);

				expect(deserialized.root).to.equal(doc.graveyard);
				expect(deserialized.path).to.deep.equal([0, 1, 2]);
			});

			it('should throw error when creating object in document that does not have provided root', () => {
				expect(() => {
					_position2.default.fromJSON({ root: 'noroot', path: [0] }, doc);
				}).to.throw(_ckeditorerror2.default, /position-fromjson-no-root/);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
