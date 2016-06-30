define('tests', ['/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/position.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/engine/view/text.js'], function (_range, _position, _element, _text) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Range', () => {
		describe('constructor', () => {
			it('creates range from provided positions', () => {
				const start = new _position2.default({}, 1);
				const end = new _position2.default({}, 2);
				const range = new _range2.default(start, end);

				expect(range).to.be.an.instanceof(_range2.default);
				expect(range).to.have.property('start').that.not.equals(start);
				expect(range).to.have.property('end').that.not.equals(end);
				expect(range.start.parent).to.equal(start.parent);
				expect(range.end.parent).to.equal(end.parent);
				expect(range.start.offset).to.equal(start.offset);
				expect(range.end.offset).to.equal(end.offset);
			});
		});

		describe('isEqual', () => {
			it('should return true for the same range', () => {
				const start = new _position2.default({}, 1);
				const end = new _position2.default({}, 2);
				const range = new _range2.default(start, end);

				expect(range.isEqual(range)).to.be.true;
			});

			it('should return true for ranges with same start and end positions', () => {
				const start = new _position2.default({}, 1);
				const end = new _position2.default({}, 2);
				const range1 = new _range2.default(start, end);
				const range2 = new _range2.default(start, end);

				expect(range1.isEqual(range2)).to.be.true;
			});

			it('should return false if start position is different', () => {
				const start1 = new _position2.default({}, 1);
				const start2 = new _position2.default({}, 1);
				const end = new _position2.default({}, 2);
				const range1 = new _range2.default(start1, end);
				const range2 = new _range2.default(start2, end);

				expect(range1.isEqual(range2)).to.be.false;
			});

			it('should return false if end position is different', () => {
				const start = new _position2.default({}, 1);
				const end1 = new _position2.default({}, 2);
				const end2 = new _position2.default({}, 2);
				const range1 = new _range2.default(start, end1);
				const range2 = new _range2.default(start, end2);

				expect(range1.isEqual(range2)).to.be.false;
			});

			it('should return false for ranges with same root and different offsets', () => {
				const mockObject = {};
				const range1 = new _range2.default(new _position2.default(mockObject, 0), new _position2.default(mockObject, 10));
				const range2 = new _range2.default(new _position2.default(mockObject, 2), new _position2.default(mockObject, 10));

				expect(range1.isEqual(range2)).to.be.false;
			});
		});

		describe('isIntersecting', () => {
			let root, p1, p2, t1, t2, t3;

			//            root
			//    __________|__________
			//    |                   |
			// ___p1___               p2
			// |       |              |
			// t1      t2             t3

			beforeEach(() => {
				t1 = new _text2.default('foo');
				t2 = new _text2.default('bar');
				t3 = new _text2.default('baz');
				p1 = new _element2.default('p', null, [t1, t2]);
				p2 = new _element2.default('p', null, t3);
				root = new _element2.default('div', null, [p1, p2]);
			});

			it('should return true if given range is equal', () => {
				const range = _range2.default.createFromParentsAndOffsets(t1, 0, t3, 2);
				const otherRange = _range2.default.createFromRange(range);
				expect(range.isIntersecting(otherRange)).to.be.true;
				expect(otherRange.isIntersecting(range)).to.be.true;
			});

			it('should return true if given range contains this range', () => {
				const range = _range2.default.createFromParentsAndOffsets(t1, 0, t3, 3);
				const otherRange = _range2.default.createFromParentsAndOffsets(p1, 1, t2, 2);

				expect(range.isIntersecting(otherRange)).to.be.true;
				expect(otherRange.isIntersecting(range)).to.be.true;
			});

			it('should return true if given range ends in this range', () => {
				const range = _range2.default.createFromParentsAndOffsets(root, 1, t3, 3);
				const otherRange = _range2.default.createFromParentsAndOffsets(t1, 0, p2, 0);

				expect(range.isIntersecting(otherRange)).to.be.true;
				expect(otherRange.isIntersecting(range)).to.be.true;
			});

			it('should return true if given range starts in this range', () => {
				const range = _range2.default.createFromParentsAndOffsets(t1, 0, t2, 3);
				const otherRange = _range2.default.createFromParentsAndOffsets(p1, 1, p2, 0);

				expect(range.isIntersecting(otherRange)).to.be.true;
				expect(otherRange.isIntersecting(range)).to.be.true;
			});

			it('should return false if given range is fully before/after this range', () => {
				const range = _range2.default.createFromParentsAndOffsets(t1, 0, t2, 3);
				const otherRange = _range2.default.createFromParentsAndOffsets(root, 1, t3, 0);

				expect(range.isIntersecting(otherRange)).to.be.false;
				expect(otherRange.isIntersecting(range)).to.be.false;
			});

			it('should return false if ranges are in different roots', () => {
				const range = _range2.default.createFromParentsAndOffsets(t1, 0, t2, 3);
				const otherRange = _range2.default.createFromParentsAndOffsets(new _element2.default('div'), 1, t3, 0);

				expect(range.isIntersecting(otherRange)).to.be.false;
				expect(otherRange.isIntersecting(range)).to.be.false;
			});
		});

		describe('createFromRange', () => {
			it('should create a new instance of Range that is equal to passed range', () => {
				const range = new _range2.default(new _position2.default({}, 0), new _position2.default({}, 1));
				const clone = _range2.default.createFromRange(range);

				expect(clone).not.to.be.equal(range); // clone is not pointing to the same object as position
				expect(clone.isEqual(range)).to.be.true; // but they are equal in the position-sense
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
