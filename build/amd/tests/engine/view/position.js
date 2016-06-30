define('tests', ['/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/node.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/text.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/_utils/view.js'], function (_position, _node, _element, _text, _ckeditorerror, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _position2 = _interopRequireDefault(_position);

	var _node2 = _interopRequireDefault(_node);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Position', () => {
		const parentMock = {};

		describe('constructor', () => {
			it('should create element without attributes', () => {
				const elem = new _position2.default(parentMock, 5);

				expect(elem).to.have.property('parent').that.equals(parentMock);
				expect(elem).to.have.property('offset').that.equals(5);
			});
		});

		describe('nodeBefore', () => {
			it('should equal to node that is before position', () => {
				const b1 = new _element2.default('b');
				const el = new _element2.default('p', null, [b1]);
				const position = new _position2.default(el, 1);

				expect(position.nodeBefore).to.equal(b1);
			});

			it('should equal null if there is no node before', () => {
				const b1 = new _element2.default('b');
				const el = new _element2.default('p', null, [b1]);
				const position = new _position2.default(el, 0);

				expect(position.nodeBefore).to.be.null;
			});

			it('should equal null if position is located inside text node', () => {
				const text = new _text2.default('foobar');
				const position = new _position2.default(text, 3);

				expect(position.nodeBefore).to.be.null;
			});
		});

		describe('nodeAfter', () => {
			it('should equal to node that is after position', () => {
				const b1 = new _element2.default('b');
				const el = new _element2.default('p', null, [b1]);
				const position = new _position2.default(el, 0);

				expect(position.nodeAfter).to.equal(b1);
			});

			it('should equal null if there is no node before', () => {
				const b1 = new _element2.default('b');
				const el = new _element2.default('p', null, [b1]);
				const position = new _position2.default(el, 1);

				expect(position.nodeAfter).to.be.null;
			});

			it('should equal null if position is located inside text node', () => {
				const text = new _text2.default('foobar');
				const position = new _position2.default(text, 3);

				expect(position.nodeAfter).to.be.null;
			});
		});

		describe('getShiftedBy', () => {
			it('returns new instance with shifted offset', () => {
				const position = new _position2.default(parentMock, 10);
				const shifted = position.getShiftedBy(12);
				expect(shifted.offset).to.equal(22);
			});

			it('accepts negative values', () => {
				const position = new _position2.default(parentMock, 10);
				const shifted = position.getShiftedBy(-5);
				expect(shifted.offset).to.equal(5);
			});

			it('prevents offset to be a negative value', () => {
				const position = new _position2.default(parentMock, 10);
				const shifted = position.getShiftedBy(-20);

				expect(shifted.offset).to.equal(0);
			});
		});

		describe('createFromPosition', () => {
			it('creates new Position with same parent and offset', () => {
				const offset = 50;
				const position = new _position2.default(parentMock, offset);
				const newPosition = _position2.default.createFromPosition(position);

				expect(position).to.not.equal(newPosition);
				expect(position.offset).to.equal(offset);
				expect(position.parent).to.equal(parentMock);
			});
		});

		describe('isEqual', () => {
			it('should return true for same object', () => {
				const position = new _position2.default({}, 12);
				expect(position.isEqual(position)).to.be.true;
			});

			it('should return true for positions with same parent and offset', () => {
				const parentMock = {};
				const position1 = new _position2.default(parentMock, 12);
				const position2 = new _position2.default(parentMock, 12);
				expect(position1.isEqual(position2)).to.be.true;
			});

			it('should return false for positions with different parents', () => {
				const position1 = new _position2.default({}, 12);
				const position2 = new _position2.default({}, 12);
				expect(position1.isEqual(position2)).to.be.false;
			});

			it('should return false for positions with different positions', () => {
				const parentMock = {};
				const position1 = new _position2.default(parentMock, 12);
				const position2 = new _position2.default(parentMock, 2);
				expect(position1.isEqual(position2)).to.be.false;
			});
		});

		describe('isBefore', () => {
			it('should return false for same positions', () => {
				const node = new _node2.default();
				const position1 = new _position2.default(node, 10);
				const position2 = new _position2.default(node, 10);

				expect(position1.isBefore(position1)).to.be.false;
				expect(position1.isBefore(position2)).to.be.false;
				expect(position2.isBefore(position1)).to.be.false;
			});

			it('should return false if no common ancestor is found', () => {
				const t1 = new _text2.default('foo');
				const t2 = new _text2.default('bar');
				const e1 = new _element2.default('p', null, [t1]);
				const e2 = new _element2.default('p', null, [t2]);
				const position1 = new _position2.default(e1, 0);
				const position2 = new _position2.default(e2, 1);

				expect(position1.isBefore(position2));
				expect(position2.isBefore(position1));
			});

			it('should return true if position is before in same node', () => {
				const node = new _node2.default();
				const p1 = new _position2.default(node, 10);
				const p2 = new _position2.default(node, 5);

				expect(p2.isBefore(p1)).to.be.true;
				expect(p1.isBefore(p2)).to.be.false;
			});

			it('should compare positions that have common parent', () => {
				const t1 = new _text2.default('foo');
				const t2 = new _text2.default('bar');
				const root = new _element2.default('p', null, [t1, t2]);
				const position1 = new _position2.default(t1, 2);
				const position2 = new _position2.default(t2, 0);
				const position3 = new _position2.default(root, 0);
				const position4 = new _position2.default(root, 2);
				const position5 = new _position2.default(t1, 0);
				const position6 = new _position2.default(root, 1);

				expect(position1.isBefore(position2)).to.be.true;
				expect(position2.isBefore(position1)).to.be.false;
				expect(position3.isBefore(position1)).to.be.true;
				expect(position3.isBefore(position2)).to.be.true;
				expect(position1.isBefore(position3)).to.be.false;
				expect(position2.isBefore(position3)).to.be.false;
				expect(position4.isBefore(position1)).to.be.false;
				expect(position4.isBefore(position3)).to.be.false;
				expect(position3.isBefore(position4)).to.be.true;
				expect(position3.isBefore(position5)).to.be.true;
				expect(position6.isBefore(position2)).to.be.true;
				expect(position1.isBefore(position6)).to.be.true;
			});
		});

		describe('isAfter', () => {
			it('should return false for same positions', () => {
				const node = new _node2.default();
				const position1 = new _position2.default(node, 10);
				const position2 = new _position2.default(node, 10);

				expect(position1.isAfter(position1)).to.be.false;
				expect(position1.isAfter(position2)).to.be.false;
				expect(position2.isAfter(position1)).to.be.false;
			});

			it('should return false if no common ancestor is found', () => {
				const t1 = new _text2.default('foo');
				const t2 = new _text2.default('bar');
				const e1 = new _element2.default('p', null, [t1]);
				const e2 = new _element2.default('p', null, [t2]);
				const position1 = new _position2.default(e1, 0);
				const position2 = new _position2.default(e2, 1);

				expect(position1.isAfter(position2));
				expect(position2.isAfter(position1));
			});

			it('should return true if position is after in same node', () => {
				const node = new _node2.default();
				const p1 = new _position2.default(node, 10);
				const p2 = new _position2.default(node, 5);

				expect(p2.isAfter(p1)).to.be.false;
				expect(p1.isAfter(p2)).to.be.true;
			});

			it('should compare positions that have common parent', () => {
				const t1 = new _text2.default('foo');
				const t2 = new _text2.default('bar');
				const root = new _element2.default('p', null, [t1, t2]);
				const position1 = new _position2.default(t1, 2);
				const position2 = new _position2.default(t2, 0);
				const position3 = new _position2.default(root, 0);
				const position4 = new _position2.default(root, 2);
				const position5 = new _position2.default(t1, 0);
				const position6 = new _position2.default(root, 1);

				expect(position1.isAfter(position2)).to.be.false;
				expect(position2.isAfter(position1)).to.be.true;
				expect(position3.isAfter(position1)).to.be.false;
				expect(position3.isAfter(position2)).to.be.false;
				expect(position1.isAfter(position3)).to.be.true;
				expect(position2.isAfter(position3)).to.be.true;
				expect(position4.isAfter(position1)).to.be.true;
				expect(position4.isAfter(position3)).to.be.true;
				expect(position3.isAfter(position4)).to.be.false;
				expect(position5.isAfter(position3)).to.be.true;
				expect(position2.isAfter(position6)).to.be.true;
			});
		});

		describe('compareWith', () => {
			it('should return SAME if positions are same', () => {
				const root = new _node2.default();
				const position = new _position2.default(root, 0);
				const compared = new _position2.default(root, 0);

				expect(position.compareWith(compared)).to.equal('SAME');
			});

			it('should return BEFORE if the position is before compared one', () => {
				const root = new _node2.default();
				const position = new _position2.default(root, 0);
				const compared = new _position2.default(root, 1);

				expect(position.compareWith(compared)).to.equal('BEFORE');
			});

			it('should return AFTER if the position is after compared one', () => {
				const root = new _node2.default();
				const position = new _position2.default(root, 4);
				const compared = new _position2.default(root, 1);

				expect(position.compareWith(compared)).to.equal('AFTER');
			});

			it('should return DIFFERENT if positions are in different roots', () => {
				const root1 = new _node2.default();
				const root2 = new _node2.default();
				const position = new _position2.default(root1, 4);
				const compared = new _position2.default(root2, 1);

				expect(position.compareWith(compared)).to.equal('DIFFERENT');
			});
		});

		describe('createBefore', () => {
			it('should create positions before nodes', () => {
				const { selection } = (0, _view.parse)('<p>[]<b></b></p>');
				const position = selection.getFirstPosition();
				const nodeAfter = position.nodeAfter;

				expect(_position2.default.createBefore(nodeAfter).isEqual(position)).to.be.true;
			});

			it('should throw error if one try to create positions before root', () => {
				expect(() => {
					_position2.default.createBefore((0, _view.parse)('<p></p>'));
				}).to.throw(_ckeditorerror2.default, /position-before-root/);
			});
		});

		describe('createAfter', () => {
			it('should create positions after nodes', () => {
				const { selection } = (0, _view.parse)('<p><b></b>[]</p>');
				const position = selection.getFirstPosition();
				const nodeBefore = position.nodeBefore;

				expect(_position2.default.createAfter(nodeBefore).isEqual(position)).to.be.true;
			});

			it('should throw error if one try to create positions after root', () => {
				expect(() => {
					_position2.default.createAfter((0, _view.parse)('<p></p>'));
				}).to.throw(_ckeditorerror2.default, /position-after-root/);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
