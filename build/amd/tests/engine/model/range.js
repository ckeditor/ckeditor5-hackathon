define('tests', ['/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/treewalker.js', '/tests/engine/model/_utils/utils.js'], function (_range, _position, _element, _text, _document, _treewalker, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _document2 = _interopRequireDefault(_document);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Range', () => {
		let doc, range, start, end, root, otherRoot;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			otherRoot = doc.createRoot('otherRoot');

			start = new _position2.default(root, [1]);
			end = new _position2.default(root, [2]);

			range = new _range2.default(start, end);
		});

		describe('constructor', () => {
			it('should create a range with given positions', () => {
				expect(range.start.isEqual(start)).to.be.true;
				expect(range.end.isEqual(end)).to.be.true;
			});
		});

		describe('root', () => {
			it('should be equal to start position root', () => {
				expect(range.root).to.equal(start.root);
			});
		});

		describe('isCollapsed', () => {
			it('should be true if range start and end positions are equal', () => {
				let collapsedRange = new _range2.default(start, start);
				expect(collapsedRange.isCollapsed).to.be.true;
			});

			it('should be false if range start and end positions are not equal', () => {
				expect(range.isCollapsed).to.be.false;
			});
		});

		describe('isEqual', () => {
			it('should return true if the ranges are the same', () => {
				let sameStart = _position2.default.createFromPosition(start);
				let sameEnd = _position2.default.createFromPosition(end);

				let sameRange = new _range2.default(sameStart, sameEnd);

				expect(range.isEqual(sameRange)).to.be.true;
			});

			it('should return false if the start position is different', () => {
				let range = new _range2.default(start, end);

				let diffStart = new _position2.default(root, [0]);
				let sameEnd = _position2.default.createFromPosition(end);

				let diffRange = new _range2.default(diffStart, sameEnd);

				expect(range.isEqual(diffRange)).to.be.false;
			});

			it('should return false if the end position is different', () => {
				let sameStart = new _position2.default(root, [0]);
				let diffEnd = new _position2.default(root, [0]);

				let diffRange = new _range2.default(sameStart, diffEnd);

				expect(range.isEqual(diffRange)).to.be.false;
			});

			it('should return false if ranges are in different roots', () => {
				let otherRootStart = new _position2.default(otherRoot, start.path.slice());
				let otherRootEnd = new _position2.default(otherRoot, end.path.slice());

				let otherRootRange = new _range2.default(otherRootStart, otherRootEnd);

				expect(range.isEqual(otherRootRange)).to.be.false;
			});
		});

		describe('isIntersecting', () => {
			it('should return true if given range is equal', () => {
				let otherRange = _range2.default.createFromRange(range);
				expect(range.isIntersecting(otherRange)).to.be.true;
			});

			it('should return true if given range contains this range', () => {
				let otherRange = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [3]));
				expect(range.isIntersecting(otherRange)).to.be.true;
			});

			it('should return true if given range ends in this range', () => {
				let otherRange = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1, 4]));
				expect(range.isIntersecting(otherRange)).to.be.true;
			});

			it('should return true if given range starts in this range', () => {
				let otherRange = new _range2.default(new _position2.default(root, [1, 4]), new _position2.default(root, [3]));
				expect(range.isIntersecting(otherRange)).to.be.true;
			});

			it('should return false if given range is fully before this range', () => {
				let otherRange = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1]));
				expect(range.isIntersecting(otherRange)).to.be.false;
			});

			it('should return false if given range is fully after this range', () => {
				let otherRange = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [2, 0]));
				expect(range.isIntersecting(otherRange)).to.be.false;
			});

			it('should return false if ranges are in different roots', () => {
				let otherRange = new _range2.default(new _position2.default(otherRoot, [0]), new _position2.default(otherRoot, [1, 4]));
				expect(range.isIntersecting(otherRange)).to.be.false;
			});
		});

		describe('static constructors', () => {
			let p, f, o, z;

			// root
			//  |- p
			//     |- f
			//     |- o
			//     |- z
			beforeEach(() => {
				f = new _text2.default('f');
				o = new _text2.default('o');
				z = new _text2.default('z');

				p = new _element2.default('p', [], [f, o, z]);

				root.insertChildren(0, [p]);
			});

			describe('createFromElement', () => {
				it('should return range', () => {
					const range = _range2.default.createFromElement(p);

					expect(range.start.path).to.deep.equal([0, 0]);
					expect(range.end.path).to.deep.equal([0, 3]);
				});
			});

			describe('createOnElement', () => {
				it('should return range', () => {
					const range = _range2.default.createOnElement(p);

					expect(range.start.path).to.deep.equal([0]);
					expect(range.end.path).to.deep.equal([0, 0]);
				});
			});

			describe('createFromParentsAndOffsets', () => {
				it('should return range', () => {
					const range = _range2.default.createFromParentsAndOffsets(root, 0, p, 2);

					expect(range.start.path).to.deep.equal([0]);
					expect(range.end.path).to.deep.equal([0, 2]);
				});
			});

			describe('createFromPositionAndShift', () => {
				it('should make range from start position and offset', () => {
					const position = new _position2.default(root, [1, 2, 3]);
					const range = _range2.default.createFromPositionAndShift(position, 4);

					expect(range).to.be.instanceof(_range2.default);
					expect(range.start.isEqual(position)).to.be.true;
					expect(range.end.root).to.equal(range.start.root);
					expect(range.end.path).to.deep.equal([1, 2, 7]);
				});
			});

			describe('createFromRange', () => {
				it('should create a new instance of Range that is equal to passed range', () => {
					const clone = _range2.default.createFromRange(range);

					expect(clone).not.to.be.equal(range); // clone is not pointing to the same object as position
					expect(clone.isEqual(range)).to.be.true; // but they are equal in the position-sense
				});
			});
		});

		describe('iterator', () => {
			it('should merge characters with same attributes', () => {
				prepareRichRoot(root);

				let range = new _range2.default(new _position2.default(root, [0, 0, 3]), new _position2.default(root, [3, 0, 2]));
				let nodes = Array.from(range).map(value => value.item);
				let lengths = Array.from(range).map(value => value.length);
				let nodeNames = mapNodesToNames(nodes);

				expect(nodeNames).to.deep.equal(['T:st', 'E:p', 'T:lorem ipsum', 'E:p', 'T:foo', 'E:p', 'T:bar', 'E:div', 'E:h', 'T:se']);
				expect(lengths).to.deep.equal([2, 1, 11, 1, 3, 1, 3, 1, 1, 2]);
			});
		});

		describe('getWalker', () => {
			it('should be possible to iterate using this method', () => {
				prepareRichRoot(root);

				const range = new _range2.default(new _position2.default(root, [0, 0, 3]), new _position2.default(root, [3, 0, 2]));
				const items = [];
				const walker = range.getWalker();

				for (let value of walker) {
					items.push(value.item);
				}

				expect(mapNodesToNames(items)).to.deep.equal(['T:st', 'E:h', 'E:p', 'T:lorem ipsum', 'E:p', 'E:div', 'E:p', 'T:foo', 'E:p', 'E:p', 'T:bar', 'E:p', 'E:div', 'E:h', 'T:se']);
			});

			it('should return treewalker with given options', () => {
				prepareRichRoot(root);

				const range = new _range2.default(new _position2.default(root, [0, 0, 3]), new _position2.default(root, [3, 0, 2]));
				const walker = range.getWalker({ singleCharacters: true });

				expect(walker).to.be.instanceof(_treewalker2.default);
				expect(walker).to.have.property('singleCharacters').that.is.true;
				expect(walker).to.have.property('boundaries').that.equals(range);
				expect(walker).to.have.property('shallow').that.is.false;
			});
		});

		describe('getItems', () => {
			it('should iterate over all items in the range', () => {
				prepareRichRoot(root);

				let range = new _range2.default(new _position2.default(root, [0, 0, 3]), new _position2.default(root, [3, 0, 2]));
				let items = Array.from(range.getItems());
				let nodeNames = mapNodesToNames(items);

				expect(nodeNames).to.deep.equal(['T:st', 'E:p', 'T:lorem ipsum', 'E:p', 'T:foo', 'E:p', 'T:bar', 'E:div', 'E:h', 'T:se']);
			});

			it('should iterate over all items in the range as single characters', () => {
				const a = new _text2.default('a');
				const b = new _text2.default('b');
				const x = new _text2.default('x');
				const y = new _text2.default('y');

				const e1 = new _element2.default('e1');
				const e2 = new _element2.default('e2');

				e1.insertChildren(0, [a, b]);
				e2.insertChildren(0, [x, y]);
				root.insertChildren(0, [e1, e2]);

				let range = new _range2.default(new _position2.default(root, [0, 1]), new _position2.default(root, [1, 1]));

				let items = Array.from(range.getItems({ singleCharacters: true }));

				expect(items.length).to.equal(3);
				expect(items[0].character).to.equal('b');
				expect(items[1]).to.equal(e2);
				expect(items[2].character).to.equal('x');
			});
		});

		describe('getPositions', () => {
			beforeEach(() => {
				prepareRichRoot(root);
			});

			it('should iterate over all positions in this range', () => {
				let expectedPaths = [[1, 2], [1, 3], [2], [2, 0], [2, 3], [3], [3, 0], [3, 0, 0], [3, 0, 2]];
				let range = new _range2.default(new _position2.default(root, [1, 2]), new _position2.default(root, [3, 0, 2]));
				let i = 0;

				for (let position of range.getPositions()) {
					expect(position.path).to.deep.equal(expectedPaths[i]);
					i++;
				}

				expect(i).to.equal(expectedPaths.length);
			});

			it('should return single nodes iterating over all positions in this range', () => {
				let expectedPaths = [[1, 2], [1, 3], [2], [2, 0], [2, 1], [2, 2], [2, 3], [3], [3, 0], [3, 0, 0], [3, 0, 1], [3, 0, 2]];
				let range = new _range2.default(new _position2.default(root, [1, 2]), new _position2.default(root, [3, 0, 2]));
				let i = 0;

				for (let position of range.getPositions({ singleCharacters: true })) {
					expect(position.path).to.deep.equal(expectedPaths[i]);
					i++;
				}

				expect(i).to.equal(expectedPaths.length);
			});
		});

		describe('containsPosition', () => {
			beforeEach(() => {
				range = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [3]));
			});

			it('should return false if position is before range', () => {
				const position = new _position2.default(root, [0, 4]);

				expect(range.containsPosition(position)).to.be.false;
			});

			it('should return false if position is after range', () => {
				const position = new _position2.default(root, [3, 0]);

				expect(range.containsPosition(position)).to.be.false;
			});

			it('should return true if position is inside range', () => {
				const position = new _position2.default(root, [2, 2]);

				expect(range.containsPosition(position)).to.be.true;
			});
		});

		describe('getTransformedByInsertion', () => {
			it('should return an array of Range objects', () => {
				const range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [2]), 2);

				expect(transformed).to.be.instanceof(Array);
				expect(transformed[0]).to.be.instanceof(_range2.default);
			});

			it('should update it\'s positions offsets if insertion is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 1]), 2);

				expect(transformed[0].start.offset).to.equal(4);
				expect(transformed[0].end.offset).to.equal(6);
			});

			it('should update it\'s positions paths if insertion is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [0]), 2);

				expect(transformed[0].start.path[0]).to.equal(5);
				expect(transformed[0].end.path[0]).to.equal(6);
			});

			it('should expand range if insertion was in the middle of range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [5, 0]), 4);

				expect(transformed.length).to.equal(1);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([5, 8]);
			});

			it('should return array with two ranges if insertion was in the middle of range and spread flag was set', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [4, 1, 6]), 4, true);

				expect(transformed.length).to.equal(2);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 1, 6]);

				expect(transformed[1].start.path).to.deep.equal([4, 1, 10]);
				expect(transformed[1].end.path).to.deep.equal([5, 4]);
			});

			it('should not expand range if insertion is equal to start boundary of the range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 8]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 2]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 5]);
				expect(transformed[0].end.path).to.deep.equal([3, 11]);
			});

			it('should expand range if insertion is equal to start boundary of the range and sticky flag is set', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 8]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 2]), 3, false, true);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([3, 11]);
			});

			it('should not update positions if insertion is before range (but not equal to the start boundary)', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 8]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 1]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 5]);
				expect(transformed[0].end.path).to.deep.equal([3, 11]);
			});

			it('should not expand range if insertion is equal to end boundary of the range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [4, 4]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 4]);
			});

			it('should expand range if insertion is equal to end boundary of the range and sticky flag is set', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [4, 4]), 3, false, true);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 7]);
			});

			it('should not update positions if insertion is after range (but not equal to the end boundary)', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [4, 5]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 4]);
			});

			it('should not change if the range is collapsed and isSticky is false', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 2]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 2]), 3, false, false);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([3, 2]);
			});

			it('should move after inserted nodes if the range is collapsed and isSticky is true', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 2]));
				const transformed = range.getTransformedByInsertion(new _position2.default(root, [3, 2]), 3, false, true);

				expect(transformed[0].start.path).to.deep.equal([3, 5]);
				expect(transformed[0].end.path).to.deep.equal([3, 5]);
			});
		});

		describe('getTransformedByMove', () => {
			it('should return an array of Range objects', () => {
				const range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [2]), new _position2.default(root, [5]), 2);

				expect(transformed).to.be.instanceof(Array);
				expect(transformed[0]).to.be.instanceof(_range2.default);
			});

			it('should update it\'s positions offsets if target is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [8, 1]), new _position2.default(root, [3, 1]), 2);

				expect(transformed[0].start.offset).to.equal(4);
				expect(transformed[0].end.offset).to.equal(6);
			});

			it('should update it\'s positions paths if target is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [8]), new _position2.default(root, [0]), 2);

				expect(transformed[0].start.path[0]).to.equal(5);
				expect(transformed[0].end.path[0]).to.equal(6);
			});

			it('should expand range if target was in the middle of range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [8]), new _position2.default(root, [5, 0]), 4);

				expect(transformed.length).to.equal(1);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([5, 8]);
			});

			it('should not expand range if insertion is equal to start boundary of the range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 8]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [8, 2]), new _position2.default(root, [3, 2]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 5]);
				expect(transformed[0].end.path).to.deep.equal([3, 11]);
			});

			it('should not expand range if insertion is equal to end boundary of the range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [8, 4]), new _position2.default(root, [4, 4]), 3);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 4]);
			});

			it('should update it\'s positions offsets if source is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [3, 0]), new _position2.default(root, [8, 1]), 2);

				expect(transformed[0].start.offset).to.equal(0);
				expect(transformed[0].end.offset).to.equal(2);
			});

			it('should update it\'s positions paths if source is before range and they are affected', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [4, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [0]), new _position2.default(root, [8]), 2);

				expect(transformed[0].start.path[0]).to.equal(1);
				expect(transformed[0].end.path[0]).to.equal(2);
			});

			it('should shrink range if source was in the middle of range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [5, 0]), new _position2.default(root, [8]), 4);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([5, 0]);
			});

			it('should shrink range if source contained range start position', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [3, 1]), new _position2.default(root, [8]), 2);

				expect(transformed[0].start.path).to.deep.equal([3, 1]);
				expect(transformed[0].end.path).to.deep.equal([5, 4]);
			});

			it('should shrink range if source contained range end position', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [5, 3]), new _position2.default(root, [8]), 2);

				expect(transformed[0].start.path).to.deep.equal([3, 2]);
				expect(transformed[0].end.path).to.deep.equal([5, 3]);
			});

			it('should move range if it was contained in moved range', () => {
				const range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [3, 7]));
				const transformed = range.getTransformedByMove(new _position2.default(root, [3]), new _position2.default(root, [6]), 2);

				expect(transformed[0].start.path).to.deep.equal([4, 2]);
				expect(transformed[0].end.path).to.deep.equal([4, 7]);
			});
		});

		describe('getDifference', () => {
			let range;

			beforeEach(() => {
				range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
			});

			it('should return an array of Range objects', () => {
				const otherRange = new _range2.default(new _position2.default(root, [6]), new _position2.default(root, [7]));
				const diff = range.getDifference(otherRange);

				expect(diff).to.be.instanceof(Array);
				expect(diff[0]).to.be.instanceof(_range2.default);
			});

			it('should return original range if other range does not intersect with it', () => {
				const otherRange = new _range2.default(new _position2.default(root, [6]), new _position2.default(root, [7]));
				const diff = range.getDifference(otherRange);

				expect(diff[0].start.path).to.deep.equal([3, 2]);
				expect(diff[0].end.path).to.deep.equal([5, 4]);
			});

			it('should return shrunken range if other range intersects with it', () => {
				const otherRange = new _range2.default(new _position2.default(root, [4, 1]), new _position2.default(root, [7]));
				const diff = range.getDifference(otherRange);

				expect(diff[0].start.path).to.deep.equal([3, 2]);
				expect(diff[0].end.path).to.deep.equal([4, 1]);
			});

			it('should return an empty array if other range contains or is same as the original range', () => {
				const otherRange = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [6]));
				const diff = range.getDifference(otherRange);

				expect(diff.length).to.equal(0);
			});

			it('should two ranges if other range is contained by the original range', () => {
				const otherRange = new _range2.default(new _position2.default(root, [3, 7]), new _position2.default(root, [4, 1]));
				const diff = range.getDifference(otherRange);

				expect(diff.length).to.equal(2);

				expect(diff[0].start.path).to.deep.equal([3, 2]);
				expect(diff[0].end.path).to.deep.equal([3, 7]);

				expect(diff[1].start.path).to.deep.equal([4, 1]);
				expect(diff[1].end.path).to.deep.equal([5, 4]);
			});
		});

		describe('getIntersection', () => {
			let range;

			beforeEach(() => {
				range = new _range2.default(new _position2.default(root, [3, 2]), new _position2.default(root, [5, 4]));
			});

			it('should return null if ranges do not intersect', () => {
				const otherRange = new _range2.default(new _position2.default(root, [5, 4]), new _position2.default(root, [7]));
				const common = range.getIntersection(otherRange);

				expect(common).to.be.null;
			});

			it('should return a range equal to the common part of ranges - original range contains the other range', () => {
				const otherRange = new _range2.default(new _position2.default(root, [4]), new _position2.default(root, [5]));
				const common = range.getIntersection(otherRange);

				expect(common.isEqual(otherRange)).to.be.true;
			});

			it('should return a range equal to the common part of ranges - original range is contained by the other range', () => {
				const otherRange = new _range2.default(new _position2.default(root, [3]), new _position2.default(root, [6]));
				const common = range.getIntersection(otherRange);

				expect(common.isEqual(range)).to.be.true;
			});

			it('should return a range equal to the common part of ranges - original range intersects with the other range', () => {
				const otherRange = new _range2.default(new _position2.default(root, [3]), new _position2.default(root, [4, 7]));
				const common = range.getIntersection(otherRange);

				expect(common.start.path).to.deep.equal([3, 2]);
				expect(common.end.path).to.deep.equal([4, 7]);
			});
		});

		describe('getMinimalFlatRanges', () => {
			beforeEach(() => {
				prepareRichRoot(root);
			});

			it('should return empty array if range is collapsed', () => {
				let range = new _range2.default(new _position2.default(root, [1, 3]), new _position2.default(root, [1, 3]));
				let flat = range.getMinimalFlatRanges();

				expect(flat.length).to.equal(0);
			});

			it('should return empty array if range does not contain any node', () => {
				let range = new _range2.default(new _position2.default(root, [1, 3]), new _position2.default(root, [2, 0]));
				let flat = range.getMinimalFlatRanges();

				expect(flat.length).to.equal(0);
			});

			it('should return a minimal set of flat ranges that covers the range (start and end in different sub-trees)', () => {
				let range = new _range2.default(new _position2.default(root, [0, 0, 3]), new _position2.default(root, [3, 0, 2]));
				let flat = range.getMinimalFlatRanges();

				expect(flat.length).to.equal(4);
				expect(flat[0].start.path).to.deep.equal([0, 0, 3]);
				expect(flat[0].end.path).to.deep.equal([0, 0, 5]);
				expect(flat[1].start.path).to.deep.equal([0, 1]);
				expect(flat[1].end.path).to.deep.equal([0, 2]);
				expect(flat[2].start.path).to.deep.equal([1]);
				expect(flat[2].end.path).to.deep.equal([3]);
				expect(flat[3].start.path).to.deep.equal([3, 0, 0]);
				expect(flat[3].end.path).to.deep.equal([3, 0, 2]);
			});

			it('should return a minimal set of flat ranges that covers the range (start.path is prefix of end.path)', () => {
				let range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [0, 1, 4]));
				let flat = range.getMinimalFlatRanges();

				expect(flat.length).to.equal(2);
				expect(flat[0].start.path).to.deep.equal([0, 0]);
				expect(flat[0].end.path).to.deep.equal([0, 1]);
				expect(flat[1].start.path).to.deep.equal([0, 1, 0]);
				expect(flat[1].end.path).to.deep.equal([0, 1, 4]);
			});
		});

		describe('isFlat', () => {
			beforeEach(() => {
				prepareRichRoot(root);
			});

			it('should be true if start and end position are in the same parent', () => {
				let range = new _range2.default(new _position2.default(root, [0, 0]), new _position2.default(root, [0, 2]));
				expect(range.isFlat).to.be.true;
			});

			it('should be false if start and end position are in different parents', () => {
				let range = new _range2.default(new _position2.default(root, [0, 0]), new _position2.default(root, [3, 0, 1]));
				expect(range.isFlat).to.be.false;
			});
		});

		describe('fromJSON', () => {
			it('should create range from given JSON object', () => {
				const serialized = (0, _utils.jsonParseStringify)(range);
				const deserialized = _range2.default.fromJSON(serialized, doc);

				expect(deserialized).to.deep.equal(range);
			});
		});

		describe('isEmpty', () => {
			beforeEach(() => {
				prepareRichRoot(root);
			});

			it('should be true if there are no nodes between range start and end', () => {
				let range = new _range2.default(new _position2.default(root, [0, 0, 5]), new _position2.default(root, [0, 1, 0]));
				expect(range.isEmpty).to.be.true;
			});

			it('should be false if there are nodes between range start and end', () => {
				let range = new _range2.default(new _position2.default(root, [0, 0, 5]), new _position2.default(root, [0, 1, 1]));
				expect(range.isEmpty).to.be.false;
			});
		});

		function mapNodesToNames(nodes) {
			return nodes.map(node => {
				return node instanceof _element2.default ? 'E:' + node.name : 'T:' + (node.text || node.character);
			});
		}

		function prepareRichRoot() {
			root.insertChildren(0, [new _element2.default('div', [], [new _element2.default('h', [], 'first'), new _element2.default('p', [], 'lorem ipsum')]), new _element2.default('p', [], 'foo'), new _element2.default('p', [], 'bar'), new _element2.default('div', [], [new _element2.default('h', [], 'second'), new _element2.default('p', [], 'lorem')])]);
		}
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
