define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/treewalker.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/utils/ckeditorerror.js'], function (_document, _element, _text, _treewalker, _position, _range, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('TreeWalker', () => {
		let doc, root, img1, paragraph, b, a, r, img2, x;
		let rootBeginning, rootEnding;

		before(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			// root
			//  |- img1
			//  |- p
			//     |- B -bold
			//     |- A -bold
			//     |- R
			//     |
			//     |- img2
			//     |
			//     |- X

			b = new _text2.default('b', { bold: true });
			a = new _text2.default('a', { bold: true });
			r = new _text2.default('r');
			img2 = new _element2.default('img2');
			x = new _text2.default('x');

			paragraph = new _element2.default('p', [], [b, a, r, img2, x]);
			img1 = new _element2.default('img1');

			root.insertChildren(0, [img1, paragraph]);

			rootBeginning = new _position2.default(root, [0]);
			rootEnding = new _position2.default(root, [2]);
		});

		describe('constructor', () => {
			it('should throw if neither boundaries nor starting position is set', () => {
				expect(() => {
					new _treewalker2.default();
				}).to.throw(_ckeditorerror2.default, /^tree-walker-no-start-position/);

				expect(() => {
					new _treewalker2.default({});
				}).to.throw(_ckeditorerror2.default, /^tree-walker-no-start-position/);

				expect(() => {
					new _treewalker2.default({ singleCharacters: true });
				}).to.throw(_ckeditorerror2.default, /^tree-walker-no-start-position/);
			});

			it('should throw if walking direction is unknown', () => {
				expect(() => {
					new _treewalker2.default({ startPosition: rootBeginning, direction: 'UNKNOWN' });
				}).to.throw(_ckeditorerror2.default, /^tree-walker-unknown-direction/);
			});
		});

		describe('iterate from start position `startPosition`', () => {
			let expected;

			beforeEach(() => {
				expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_END', item: img1 }, { type: 'ELEMENT_START', item: paragraph }, { type: 'TEXT', text: 'ba', attrs: [['bold', true]] }, { type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }, { type: 'TEXT', text: 'x', attrs: [] }, { type: 'ELEMENT_END', item: paragraph }];
			});

			it('should provide iterator interface with default FORWARD direction', () => {
				let iterator = new _treewalker2.default({ startPosition: rootBeginning });
				let i = 0;

				for (let value of iterator) {
					expectValue(value, expected[i]);
					i++;
				}

				expect(i).to.equal(expected.length);
			});

			it('should provide iterator interface with FORWARD direction', () => {
				let iterator = new _treewalker2.default({ startPosition: rootBeginning, direction: 'FORWARD' });
				let i = 0;

				for (let value of iterator) {
					expectValue(value, expected[i]);
					i++;
				}

				expect(i).to.equal(expected.length);
			});

			it('should provide iterator interface which BACKWARD direction', () => {
				let iterator = new _treewalker2.default({ startPosition: rootEnding, direction: 'BACKWARD' });
				let i = expected.length;

				for (let value of iterator) {
					expectValue(value, expected[--i], { direction: 'BACKWARD' });
				}

				expect(i).to.equal(0);
			});

			it('should start iterating at the startPosition witch is not a root bound', () => {
				let iterator = new _treewalker2.default({ startPosition: new _position2.default(root, [1]) });
				let i = 2;

				for (let value of iterator) {
					expectValue(value, expected[i]);
					i++;
				}

				expect(i).to.equal(expected.length);
			});

			it('should start iterating at the startPosition witch is not a root bound, going backward', () => {
				let expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_END', item: img1 }];

				let iterator = new _treewalker2.default({ startPosition: new _position2.default(root, [1]), direction: 'BACKWARD' });
				let i = expected.length;

				for (let value of iterator) {
					expectValue(value, expected[--i], { direction: 'BACKWARD' });
				}

				expect(i).to.equal(0);
			});
		});

		describe('iterate trough the range `boundary`', () => {
			describe('range starts between elements', () => {
				let expected, range;

				before(() => {
					expected = [{ type: 'ELEMENT_START', item: paragraph }, { type: 'TEXT', text: 'ba', attrs: [['bold', true]] }, { type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }];

					range = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [1, 4]));
				});

				it('should iterating over the range', () => {
					let iterator = new _treewalker2.default({ boundaries: range });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should iterating over the range going backward', () => {
					let iterator = new _treewalker2.default({ boundaries: range, direction: 'BACKWARD' });
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});

			describe('range starts inside the text', () => {
				let expected, range;

				before(() => {
					expected = [{ type: 'TEXT', text: 'a', attrs: [['bold', true]] }, { type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }];

					range = new _range2.default(new _position2.default(root, [1, 1]), new _position2.default(root, [1, 4]));
				});

				it('should return part of the text', () => {
					let iterator = new _treewalker2.default({ boundaries: range });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should return part of the text going backward', () => {
					let iterator = new _treewalker2.default({
						boundaries: range,
						direction: 'BACKWARD' });
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});

			describe('range ends inside the text', () => {
				let expected, range;

				before(() => {
					expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_END', item: img1 }, { type: 'ELEMENT_START', item: paragraph }, { type: 'TEXT', text: 'b', attrs: [['bold', true]] }];

					range = new _range2.default(rootBeginning, new _position2.default(root, [1, 1]));
				});

				it('should return part of the text', () => {
					let iterator = new _treewalker2.default({ boundaries: range });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should return part of the text going backward', () => {
					let iterator = new _treewalker2.default({
						boundaries: range,
						startPosition: range.end,
						direction: 'BACKWARD'
					});
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});

			describe('custom start position', () => {
				it('should iterating from the start position', () => {
					let expected = [{ type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }];

					let range = new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [1, 4]));

					let iterator = new _treewalker2.default({
						boundaries: range,
						startPosition: new _position2.default(root, [1, 2])
					});
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should iterating from the start position going backward', () => {
					let expected = [{ type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }];

					let range = new _range2.default(new _position2.default(root, [1, 2]), new _position2.default(root, [1, 6]));

					let iterator = new _treewalker2.default({
						boundaries: range,
						startPosition: new _position2.default(root, [1, 4]),
						direction: 'BACKWARD'
					});
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});
		});

		describe('iterate by every single characters `singleCharacter`', () => {
			describe('whole root', () => {
				let expected;

				before(() => {
					expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_END', item: img1 }, { type: 'ELEMENT_START', item: paragraph }, { type: 'CHARACTER', text: 'b', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'a', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'ELEMENT_END', item: img2 }, { type: 'CHARACTER', text: 'x', attrs: [] }, { type: 'ELEMENT_END', item: paragraph }];
				});

				it('should return single characters', () => {
					let iterator = new _treewalker2.default({ startPosition: rootBeginning, singleCharacters: true });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should return single characters going backward', () => {
					let iterator = new _treewalker2.default({
						startPosition: rootEnding,
						singleCharacters: true,
						direction: 'BACKWARD' });
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});

			describe('range', () => {
				let start, end, range, expected;

				before(() => {
					expected = [{ type: 'CHARACTER', text: 'b', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'a', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }];

					start = new _position2.default(root, [1, 0]); // p, 0
					end = new _position2.default(root, [1, 3, 0]); // img2, 0
					range = new _range2.default(start, end);
				});

				it('should respect boundaries', () => {
					let iterator = new _treewalker2.default({ boundaries: range, singleCharacters: true });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should respect boundaries going backward', () => {
					let iterator = new _treewalker2.default({
						boundaries: range,
						singleCharacters: true,
						startPosition: range.end,
						direction: 'BACKWARD'
					});
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});
		});

		describe('iterate omitting child nodes and ELEMENT_END `shallow`', () => {
			let expected;

			before(() => {
				expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_START', item: paragraph }];
			});

			it('should not enter elements', () => {
				let iterator = new _treewalker2.default({ startPosition: rootBeginning, shallow: true });
				let i = 0;

				for (let value of iterator) {
					expectValue(value, expected[i], { shallow: true });
					i++;
				}

				expect(i).to.equal(expected.length);
			});

			it('should not enter elements going backward', () => {
				let iterator = new _treewalker2.default({ startPosition: rootEnding, shallow: true, direction: 'BACKWARD' });
				let i = expected.length;

				for (let value of iterator) {
					expectValue(value, expected[--i], { shallow: true, direction: 'BACKWARD' });
				}

				expect(i).to.equal(0);
			});
		});

		describe('iterate omitting ELEMENT_END `ignoreElementEnd`', () => {
			describe('merged text', () => {
				let expected;

				before(() => {
					expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_START', item: paragraph }, { type: 'TEXT', text: 'ba', attrs: [['bold', true]] }, { type: 'TEXT', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'TEXT', text: 'x', attrs: [] }];
				});

				it('should iterate ignoring ELEMENT_END', () => {
					let iterator = new _treewalker2.default({ startPosition: rootBeginning, ignoreElementEnd: true });
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should iterate ignoring ELEMENT_END going backward', () => {
					let iterator = new _treewalker2.default({
						startPosition: rootEnding,
						ignoreElementEnd: true,
						direction: 'BACKWARD'
					});
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});

			describe('single character', () => {
				let expected;

				before(() => {
					expected = [{ type: 'ELEMENT_START', item: img1 }, { type: 'ELEMENT_START', item: paragraph }, { type: 'CHARACTER', text: 'b', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'a', attrs: [['bold', true]] }, { type: 'CHARACTER', text: 'r', attrs: [] }, { type: 'ELEMENT_START', item: img2 }, { type: 'CHARACTER', text: 'x', attrs: [] }];
				});

				it('should return single characters ignoring ELEMENT_END', () => {
					let iterator = new _treewalker2.default({
						startPosition: rootBeginning,
						singleCharacters: true,
						ignoreElementEnd: true
					});
					let i = 0;

					for (let value of iterator) {
						expectValue(value, expected[i]);
						i++;
					}

					expect(i).to.equal(expected.length);
				});

				it('should return single characters ignoring ELEMENT_END going backward', () => {
					let iterator = new _treewalker2.default({
						startPosition: rootEnding,
						singleCharacters: true,
						ignoreElementEnd: true,
						direction: 'BACKWARD'
					});
					let i = expected.length;

					for (let value of iterator) {
						expectValue(value, expected[--i], { direction: 'BACKWARD' });
					}

					expect(i).to.equal(0);
				});
			});
		});
	});

	function expectValue(value, expected, options) {
		expect(value.type).to.equal(expected.type);

		if (value.type == 'TEXT') {
			expectText(value, expected, options);
		} else if (value.type == 'CHARACTER') {
			expectCharacter(value, expected, options);
		} else if (value.type == 'ELEMENT_START') {
			expectStart(value, expected, options);
		} else if (value.type == 'ELEMENT_END') {
			expectEnd(value, expected, options);
		}
	}

	function expectText(value, expected, options = {}) {
		let previousPosition, nextPosition;

		expect(value.item.text).to.equal(expected.text);
		expect(Array.from(value.item.first._attrs)).to.deep.equal(expected.attrs);
		expect(value.length).to.equal(value.item.text.length);

		if (options.direction == 'BACKWARD') {
			previousPosition = _position2.default.createAfter(value.item.last);
			nextPosition = _position2.default.createBefore(value.item.first);
		} else {
			previousPosition = _position2.default.createBefore(value.item.first);
			nextPosition = _position2.default.createAfter(value.item.last);
		}

		expect(value.previousPosition).to.deep.equal(previousPosition);
		expect(value.nextPosition).to.deep.equal(nextPosition);
	}

	function expectCharacter(value, expected, options = {}) {
		let previousPosition, nextPosition;

		expect(value.item.character).to.equal(expected.text);
		expect(Array.from(value.item._attrs)).to.deep.equal(expected.attrs);
		expect(value.length).to.equal(value.item.character.length);

		if (options.direction == 'BACKWARD') {
			previousPosition = _position2.default.createAfter(value.item);
			nextPosition = _position2.default.createBefore(value.item);
		} else {
			previousPosition = _position2.default.createBefore(value.item);
			nextPosition = _position2.default.createAfter(value.item);
		}

		expect(value.previousPosition).to.deep.equal(previousPosition);
		expect(value.nextPosition).to.deep.equal(nextPosition);
	}

	function expectStart(value, expected, options = {}) {
		let previousPosition, nextPosition;

		expect(value.item).to.equal(expected.item);
		expect(value.length).to.equal(1);

		if (options.direction == 'BACKWARD') {
			previousPosition = _position2.default.createAfter(value.item);
			nextPosition = _position2.default.createBefore(value.item);
		} else {
			previousPosition = _position2.default.createBefore(value.item);
			nextPosition = _position2.default.createFromParentAndOffset(value.item, 0);
		}

		if (options.shallow) {
			expect(value.previousPosition).to.deep.equal(previousPosition);
		} else {
			expect(value.nextPosition).to.deep.equal(nextPosition);
		}
	}

	function expectEnd(value, expected, options = {}) {
		let previousPosition, nextPosition;

		expect(value.item).to.equal(expected.item);
		expect(value.length).to.be.undefined;

		if (options.direction == 'BACKWARD') {
			previousPosition = _position2.default.createAfter(value.item);
			nextPosition = _position2.default.createFromParentAndOffset(value.item, value.item.getChildCount());
		} else {
			previousPosition = _position2.default.createFromParentAndOffset(value.item, value.item.getChildCount());
			nextPosition = _position2.default.createAfter(value.item);
		}

		expect(value.previousPosition).to.deep.equal(previousPosition);
		expect(value.nextPosition).to.deep.equal(nextPosition);
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
