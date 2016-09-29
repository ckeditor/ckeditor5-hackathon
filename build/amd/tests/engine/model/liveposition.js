define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/documentfragment.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/liveposition.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/utils/ckeditorerror.js'], function (_document, _documentfragment, _element, _position, _liveposition, _range, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _documentfragment2 = _interopRequireDefault(_documentfragment);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _liveposition2 = _interopRequireDefault(_liveposition);

	var _range2 = _interopRequireDefault(_range);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('LivePosition', () => {
		let doc, root, ul, p, li1, li2;

		before(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			li1 = new _element2.default('li', [], 'abcdef');
			li2 = new _element2.default('li', [], 'foobar');
			ul = new _element2.default('ul', [], [li1, li2]);
			p = new _element2.default('p', [], 'qwerty');

			root.insertChildren(0, [p, ul]);
		});

		it('should be an instance of Position', () => {
			let live = new _liveposition2.default(root, [0]);
			live.detach();

			expect(live).to.be.instanceof(_position2.default);
		});

		it('should throw if given root is not a RootElement', () => {
			expect(() => {
				new _liveposition2.default(new _documentfragment2.default(), [1]);
			}).to.throw(_ckeditorerror2.default, /liveposition-root-not-rootelement/);
		});

		it('should listen to a change event of the document that owns this position root', () => {
			sinon.spy(_liveposition2.default.prototype, 'listenTo');

			let live = new _liveposition2.default(root, [0]);
			live.detach();

			expect(live.listenTo.calledWith(doc, 'change')).to.be.true;

			_liveposition2.default.prototype.listenTo.restore();
		});

		it('should stop listening when detached', () => {
			sinon.spy(_liveposition2.default.prototype, 'stopListening');

			let live = new _liveposition2.default(root, [0]);
			live.detach();

			expect(live.stopListening.called).to.be.true;

			_liveposition2.default.prototype.stopListening.restore();
		});

		it('createFromPosition should return LivePosition', () => {
			let position = _liveposition2.default.createFromPosition(new _position2.default(root, [0]));
			expect(position).to.be.instanceof(_liveposition2.default);
			position.detach();
		});

		it('createFromParentAndOffset should return LivePosition', () => {
			let position = _liveposition2.default.createFromParentAndOffset(ul, 0);
			expect(position).to.be.instanceof(_liveposition2.default);
			position.detach();
		});

		it('createBefore should return LivePosition', () => {
			let position = _liveposition2.default.createBefore(ul);
			expect(position).to.be.instanceof(_liveposition2.default);
			position.detach();
		});

		it('createAfter should return LivePosition', () => {
			let position = _liveposition2.default.createAfter(ul);
			expect(position).to.be.instanceof(_liveposition2.default);
			position.detach();
		});

		describe('should get transformed if', () => {
			let live;

			beforeEach(() => {
				live = new _liveposition2.default(root, [1, 4, 6]);
			});

			afterEach(() => {
				live.detach();
			});

			describe('insertion', () => {
				it('is in the same parent and closer offset', () => {
					let insertRange = new _range2.default(new _position2.default(root, [1, 4, 0]), new _position2.default(root, [1, 4, 3]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal([1, 4, 9]);
				});

				it('is at the same position and live position is sticking to right side', () => {
					let insertRange = new _range2.default(new _position2.default(root, [1, 4, 6]), new _position2.default(root, [1, 4, 9]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal([1, 4, 9]);
				});

				it('is before a node from the live position path', () => {
					let insertRange = new _range2.default(new _position2.default(root, [1, 0]), new _position2.default(root, [1, 2]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal([1, 6, 6]);
				});
			});

			describe('range move', () => {
				it('is at the same parent and closer offset', () => {
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 4, 0]), new _position2.default(root, [1, 4, 3]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([1, 4, 9]);
				});

				it('is at the same position and live position is sticking to right side', () => {
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 4, 6]), new _position2.default(root, [1, 4, 9]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([1, 4, 9]);
				});

				it('is at a position before a node from the live position path', () => {
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 0]), new _position2.default(root, [1, 2]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([1, 6, 6]);
				});

				it('is from the same parent and closer offset', () => {
					let moveSource = new _position2.default(root, [1, 4, 0]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([1, 4, 2]);
				});

				it('is from a position before a node from the live position path', () => {
					let moveSource = new _position2.default(root, [1, 0]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([1, 0, 6]);
				});

				it('contains live position (same level)', () => {
					let moveSource = new _position2.default(root, [1, 4, 4]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([2, 2]);
				});

				it('contains live position (deep)', () => {
					let moveSource = new _position2.default(root, [1, 3]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal([2, 1, 6]);
				});
			});
		});

		describe('should not get transformed if', () => {
			let path, otherRoot;

			before(() => {
				path = [1, 4, 6];
				otherRoot = doc.createRoot('otherRoot');
			});

			let live;

			beforeEach(() => {
				live = new _liveposition2.default(root, path);
			});

			afterEach(() => {
				live.detach();
			});

			describe('insertion', () => {
				it('is in the same parent and further offset', () => {
					let insertRange = new _range2.default(new _position2.default(root, [1, 4, 7]), new _position2.default(root, [1, 4, 9]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is at the same position and live position is sticking to left side', () => {
					let live = new _liveposition2.default(root, path, 'STICKS_TO_PREVIOUS');
					let insertRange = new _range2.default(new _position2.default(root, [1, 4, 6]), new _position2.default(root, [1, 4, 9]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal(path);

					live.detach();
				});

				it('is after a node from the position path', () => {
					let insertRange = new _range2.default(new _position2.default(root, [1, 5]), new _position2.default(root, [1, 7]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is in different root', () => {
					let insertRange = new _range2.default(new _position2.default(otherRoot, [1, 4, 0]), new _position2.default(otherRoot, [1, 4, 4]));

					doc.fire('change', 'insert', { range: insertRange }, null);

					expect(live.path).to.deep.equal(path);
				});
			});

			describe('range move', () => {
				it('is at the same parent and further offset', () => {
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 4, 7]), new _position2.default(root, [1, 4, 9]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is at the same position and live position is sticking to left side', () => {
					let live = new _liveposition2.default(root, path, 'STICKS_TO_PREVIOUS');
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 4, 6]), new _position2.default(root, [1, 4, 9]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);

					live.detach();
				});

				it('is at a position after a node from the live position path', () => {
					let moveSource = new _position2.default(root, [2]);
					let moveRange = new _range2.default(new _position2.default(root, [1, 5]), new _position2.default(root, [1, 7]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is from the same parent and further offset', () => {
					let moveSource = new _position2.default(root, [1, 4, 7]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is from a position after a node from the live position path', () => {
					let moveSource = new _position2.default(root, [1, 5]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is to different root', () => {
					let moveSource = new _position2.default(root, [2, 0]);
					let moveRange = new _range2.default(new _position2.default(otherRoot, [1, 0]), new _position2.default(otherRoot, [1, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});

				it('is from different root', () => {
					let moveSource = new _position2.default(otherRoot, [1, 0]);
					let moveRange = new _range2.default(new _position2.default(root, [2, 0]), new _position2.default(root, [2, 4]));

					let changes = {
						range: moveRange,
						sourcePosition: moveSource
					};
					doc.fire('change', 'move', changes, null);

					expect(live.path).to.deep.equal(path);
				});
			});

			it('attributes changed', () => {
				let changes = {
					range: new _range2.default(new _position2.default(root, [1, 4, 0]), new _position2.default(root, [1, 4, 10])),
					key: 'foo',
					oldValue: null,
					newValue: 'bar'
				};

				doc.fire('change', 'setAttribute', changes, null);

				expect(live.path).to.deep.equal(path);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
