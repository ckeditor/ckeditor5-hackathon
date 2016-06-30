define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/liverange.js', '/ckeditor5/engine/model/selection.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/count.js'], function (_document, _element, _text, _range, _position, _liverange, _selection, _insertoperation, _moveoperation, _ckeditorerror, _utils, _count) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _text2 = _interopRequireDefault(_text);

	var _range2 = _interopRequireDefault(_range);

	var _position2 = _interopRequireDefault(_position);

	var _liverange2 = _interopRequireDefault(_liverange);

	var _selection2 = _interopRequireDefault(_selection);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _utils2 = _interopRequireDefault(_utils);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('Selection', () => {
		let attrFooBar;

		before(() => {
			attrFooBar = { foo: 'bar' };
		});

		let doc, root, selection, liveRange, range;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot();
			root.appendChildren([new _element2.default('p'), new _element2.default('p'), new _element2.default('p', [], 'foobar'), new _element2.default('p'), new _element2.default('p'), new _element2.default('p'), new _element2.default('p', [], 'foobar')]);
			selection = doc.selection;
			doc.schema.registerItem('p', '$block');

			liveRange = new _liverange2.default(new _position2.default(root, [0]), new _position2.default(root, [1]));
			range = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [2, 2]));
		});

		afterEach(() => {
			doc.destroy();
			liveRange.detach();
		});

		describe('default range', () => {
			it('should go to the first editable element', () => {
				const ranges = Array.from(selection.getRanges());

				expect(ranges.length).to.equal(1);
				expect(selection.anchor.isEqual(new _position2.default(root, [0, 0]))).to.be.true;
				expect(selection.focus.isEqual(new _position2.default(root, [0, 0]))).to.be.true;
				expect(selection).to.have.property('isBackward', false);
				expect(selection._attrs).to.be.instanceof(Map);
				expect(selection._attrs.size).to.equal(0);
			});

			it('should be set to the beginning of the doc if there is no editable element', () => {
				doc = new _document2.default();
				root = doc.createRoot();
				root.insertChildren(0, 'foobar');
				selection = doc.selection;

				const ranges = Array.from(selection.getRanges());

				expect(ranges.length).to.equal(1);
				expect(selection.anchor.isEqual(new _position2.default(root, [0]))).to.be.true;
				expect(selection.focus.isEqual(new _position2.default(root, [0]))).to.be.true;
				expect(selection).to.have.property('isBackward', false);
				expect(selection._attrs).to.be.instanceof(Map);
				expect(selection._attrs.size).to.equal(0);
			});

			it('should skip element when you can not put selection', () => {
				doc = new _document2.default();
				root = doc.createRoot();
				root.insertChildren(0, [new _element2.default('img'), new _element2.default('p', [], 'foobar')]);
				doc.schema.registerItem('img');
				doc.schema.registerItem('p', '$block');
				selection = doc.selection;

				const ranges = Array.from(selection.getRanges());

				expect(ranges.length).to.equal(1);
				expect(selection.anchor.isEqual(new _position2.default(root, [1, 0]))).to.be.true;
				expect(selection.focus.isEqual(new _position2.default(root, [1, 0]))).to.be.true;
				expect(selection).to.have.property('isBackward', false);
				expect(selection._attrs).to.be.instanceof(Map);
				expect(selection._attrs.size).to.equal(0);
			});
		});

		describe('isCollapsed', () => {
			it('should return true for default range', () => {
				expect(selection.isCollapsed).to.be.true;
			});

			it('should return true when there is single collapsed ranges', () => {
				selection.addRange(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [0])));

				expect(selection.isCollapsed).to.be.true;
			});

			it('should return false when there are multiple ranges', () => {
				selection.addRange(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [0])));
				selection.addRange(new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [2])));

				expect(selection.isCollapsed).to.be.false;
			});

			it('should return false when there is not collapsed range', () => {
				selection.addRange(range);

				expect(selection.isCollapsed).to.be.false;
			});
		});

		describe('rangeCount', () => {
			it('should return proper range count', () => {
				expect(selection.rangeCount).to.equal(1);

				selection.addRange(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [0])));

				expect(selection.rangeCount).to.equal(1);

				selection.addRange(new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [2])));

				expect(selection.rangeCount).to.equal(2);
			});
		});

		describe('isBackward', () => {
			it('is defined by the last added range', () => {
				selection.addRange(range, true);
				expect(selection).to.have.property('isBackward', true);

				selection.addRange(liveRange);
				expect(selection).to.have.property('isBackward', false);
			});

			it('is false when last range is collapsed', () => {
				const pos = _position2.default.createAt(root, 0);

				selection.addRange(new _range2.default(pos, pos), true);

				expect(selection.isBackward).to.be.false;
			});
		});

		describe('addRange', () => {
			it('should copy added ranges and store multiple ranges', () => {
				selection.addRange(liveRange);
				selection.addRange(range);

				const ranges = selection._ranges;

				expect(ranges.length).to.equal(2);
				expect(ranges[0].isEqual(liveRange)).to.be.true;
				expect(ranges[1].isEqual(range)).to.be.true;
				expect(ranges[0]).not.to.be.equal(liveRange);
				expect(ranges[1]).not.to.be.equal(range);
			});

			it('should set anchor and focus to the start and end of the most recently added range', () => {
				selection.addRange(liveRange);

				expect(selection.anchor.path).to.deep.equal([0]);
				expect(selection.focus.path).to.deep.equal([1]);

				selection.addRange(range);

				expect(selection.anchor.path).to.deep.equal([2]);
				expect(selection.focus.path).to.deep.equal([2, 2]);
			});

			it('should set anchor and focus to the end and start of the most recently added range if backward flag was used', () => {
				selection.addRange(liveRange, true);

				expect(selection.anchor.path).to.deep.equal([1]);
				expect(selection.focus.path).to.deep.equal([0]);

				selection.addRange(range, true);

				expect(selection.anchor.path).to.deep.equal([2, 2]);
				expect(selection.focus.path).to.deep.equal([2]);
			});

			it('should return a copy of (not a reference to) array of stored ranges', () => {
				selection.addRange(liveRange);

				const ranges = Array.from(selection.getRanges());

				selection.addRange(range);

				expect(ranges.length).to.equal(1);
				expect(ranges[0].isEqual(liveRange)).to.be.true;
			});

			it('should convert added Range to LiveRange', () => {
				selection.addRange(range);

				const ranges = selection._ranges;

				expect(ranges[0]).to.be.instanceof(_liverange2.default);
			});

			it('should fire change:range event when adding a range', () => {
				let spy = sinon.spy();
				selection.on('change:range', spy);

				selection.addRange(range);

				expect(spy.called).to.be.true;
			});

			it('should unbind all events when destroyed', () => {
				selection.addRange(liveRange);
				selection.addRange(range);

				const ranges = selection._ranges;

				sinon.spy(ranges[0], 'detach');
				sinon.spy(ranges[1], 'detach');

				selection.destroy();

				expect(ranges[0].detach.called).to.be.true;
				expect(ranges[1].detach.called).to.be.true;

				ranges[0].detach.restore();
				ranges[1].detach.restore();
			});

			it('should throw an error if added range intersects with already stored range', () => {
				selection.addRange(liveRange);

				expect(() => {
					selection.addRange(new _range2.default(new _position2.default(root, [0, 4]), new _position2.default(root, [1, 2])));
				}).to.throw(_ckeditorerror2.default, /selection-range-intersects/);
			});
		});

		describe('collapse', () => {
			it('detaches all existing ranges', () => {
				selection.addRange(range);
				selection.addRange(liveRange);

				const spy = _utils2.default.sinon.spy(_liverange2.default.prototype, 'detach');
				selection.collapse(root);

				expect(spy.calledTwice).to.be.true;
			});

			it('fires change:range', () => {
				const spy = sinon.spy();

				selection.on('change:range', spy);

				selection.collapse(root);

				expect(spy.calledOnce).to.be.true;
			});

			it('sets selection at the 0 offset if second parameter not passed', () => {
				selection.collapse(root);

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', 0);
			});

			it('sets selection at given offset in given parent', () => {
				selection.collapse(root, 3);

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', 3);
			});

			it('sets selection at the end of the given parent', () => {
				selection.collapse(root, 'END');

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', root.getChildCount());
			});

			it('sets selection before the specified element', () => {
				selection.collapse(root.getChild(1), 'BEFORE');

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', 1);
			});

			it('sets selection after the specified element', () => {
				selection.collapse(root.getChild(1), 'AFTER');

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', 2);
			});

			it('sets selection at the specified position', () => {
				const pos = _position2.default.createFromParentAndOffset(root, 3);

				selection.collapse(pos);

				expect(selection).to.have.property('isCollapsed', true);

				const focus = selection.focus;
				expect(focus).to.have.property('parent', root);
				expect(focus).to.have.property('offset', 3);
			});
		});

		describe('setFocus', () => {
			it('keeps all existing ranges and fires no change:range when no modifications needed', () => {
				selection.addRange(range);
				selection.addRange(liveRange);

				const spy = sinon.spy();
				selection.on('change:range', spy);

				selection.setFocus(selection.focus);

				expect((0, _count2.default)(selection.getRanges())).to.equal(2);
				expect(spy.callCount).to.equal(0);
			});

			it('fires change:range', () => {
				selection.addRange(range);

				const spy = sinon.spy();
				selection.on('change:range', spy);

				selection.setFocus(_position2.default.createAt(root, 'END'));

				expect(spy.calledOnce).to.be.true;
			});

			it('modifies default range', () => {
				const startPos = selection.getFirstPosition();
				const endPos = _position2.default.createAt(root, 'END');

				selection.setFocus(endPos);

				expect(selection.anchor.compareWith(startPos)).to.equal('SAME');
				expect(selection.focus.compareWith(endPos)).to.equal('SAME');
			});

			it('modifies existing collapsed selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);

				selection.collapse(startPos);

				selection.setFocus(endPos);

				expect(selection.anchor.compareWith(startPos)).to.equal('SAME');
				expect(selection.focus.compareWith(endPos)).to.equal('SAME');
			});

			it('makes existing collapsed selection a backward selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 0);

				selection.collapse(startPos);

				selection.setFocus(endPos);

				expect(selection.anchor.compareWith(startPos)).to.equal('SAME');
				expect(selection.focus.compareWith(endPos)).to.equal('SAME');
				expect(selection.isBackward).to.be.true;
			});

			it('modifies existing non-collapsed selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 3);

				selection.addRange(new _range2.default(startPos, endPos));

				selection.setFocus(newEndPos);

				expect(selection.anchor.compareWith(startPos)).to.equal('SAME');
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
			});

			it('makes existing non-collapsed selection a backward selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 0);

				selection.addRange(new _range2.default(startPos, endPos));

				selection.setFocus(newEndPos);

				expect(selection.anchor.compareWith(startPos)).to.equal('SAME');
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
				expect(selection.isBackward).to.be.true;
			});

			it('makes existing backward selection a forward selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 3);

				selection.addRange(new _range2.default(startPos, endPos), true);

				selection.setFocus(newEndPos);

				expect(selection.anchor.compareWith(endPos)).to.equal('SAME');
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
				expect(selection.isBackward).to.be.false;
			});

			it('modifies existing backward selection', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 0);

				selection.addRange(new _range2.default(startPos, endPos), true);

				selection.setFocus(newEndPos);

				expect(selection.anchor.compareWith(endPos)).to.equal('SAME');
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
				expect(selection.isBackward).to.be.true;
			});

			it('modifies only the last range', () => {
				// Offsets are chosen in this way that the order of adding ranges must count, not their document order.
				const startPos1 = _position2.default.createAt(root, 4);
				const endPos1 = _position2.default.createAt(root, 5);
				const startPos2 = _position2.default.createAt(root, 1);
				const endPos2 = _position2.default.createAt(root, 2);

				const newEndPos = _position2.default.createAt(root, 0);

				selection.addRange(new _range2.default(startPos1, endPos1));
				selection.addRange(new _range2.default(startPos2, endPos2));

				const spy = sinon.spy();

				selection.on('change:range', spy);

				selection.setFocus(newEndPos);

				const ranges = Array.from(selection.getRanges());

				expect(ranges).to.have.lengthOf(2);
				expect(ranges[0].start.compareWith(startPos1)).to.equal('SAME');
				expect(ranges[0].end.compareWith(endPos1)).to.equal('SAME');

				expect(selection.anchor.compareWith(startPos2)).to.equal('SAME');
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
				expect(selection.isBackward).to.be.true;

				expect(spy.calledOnce).to.be.true;
			});

			it('collapses the selection when extending to the anchor', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);

				selection.addRange(new _range2.default(startPos, endPos));

				selection.setFocus(startPos);

				expect(selection.focus.compareWith(startPos)).to.equal('SAME');
				expect(selection.isCollapsed).to.be.true;
			});

			it('uses Position.createAt', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 4);
				const spy = _utils2.default.sinon.stub(_position2.default, 'createAt', () => newEndPos);

				selection.addRange(new _range2.default(startPos, endPos));

				selection.setFocus(root, 'END');

				expect(spy.calledOnce).to.be.true;
				expect(selection.focus.compareWith(newEndPos)).to.equal('SAME');
			});

			it('detaches the range it replaces', () => {
				const startPos = _position2.default.createAt(root, 1);
				const endPos = _position2.default.createAt(root, 2);
				const newEndPos = _position2.default.createAt(root, 4);
				const spy = _utils2.default.sinon.spy(_liverange2.default.prototype, 'detach');

				selection.addRange(new _range2.default(startPos, endPos));

				selection.setFocus(newEndPos);

				expect(spy.calledOnce).to.be.true;
			});
		});

		describe('removeAllRanges', () => {
			let spy, ranges;

			beforeEach(() => {
				selection.addRange(liveRange);
				selection.addRange(range);

				spy = sinon.spy();
				selection.on('change:range', spy);

				ranges = selection._ranges;

				sinon.spy(ranges[0], 'detach');
				sinon.spy(ranges[1], 'detach');

				selection.removeAllRanges();
			});

			afterEach(() => {
				ranges[0].detach.restore();
				ranges[1].detach.restore();
			});

			it('should remove all stored ranges (and reset to default range)', () => {
				expect(Array.from(selection.getRanges()).length).to.equal(1);
				expect(selection.anchor.isEqual(new _position2.default(root, [0, 0]))).to.be.true;
				expect(selection.focus.isEqual(new _position2.default(root, [0, 0]))).to.be.true;
			});

			it('should fire exactly one update event', () => {
				expect(spy.calledOnce).to.be.true;
			});

			it('should detach ranges', () => {
				expect(ranges[0].detach.called).to.be.true;
				expect(ranges[1].detach.called).to.be.true;
			});
		});

		describe('setRanges', () => {
			let newRanges, spy, oldRanges;

			before(() => {
				newRanges = [new _range2.default(new _position2.default(root, [4]), new _position2.default(root, [5])), new _range2.default(new _position2.default(root, [5, 0]), new _position2.default(root, [6, 0]))];
			});

			beforeEach(() => {
				selection.addRange(liveRange);
				selection.addRange(range);

				spy = sinon.spy();
				selection.on('change:range', spy);

				oldRanges = selection._ranges;

				sinon.spy(oldRanges[0], 'detach');
				sinon.spy(oldRanges[1], 'detach');
			});

			afterEach(() => {
				oldRanges[0].detach.restore();
				oldRanges[1].detach.restore();
			});

			it('should remove all ranges and add given ranges', () => {
				selection.setRanges(newRanges);

				let ranges = selection._ranges;

				expect(ranges.length).to.equal(2);
				expect(ranges[0].isEqual(newRanges[0])).to.be.true;
				expect(ranges[1].isEqual(newRanges[1])).to.be.true;
			});

			it('should use last range from given array to get anchor and focus position', () => {
				selection.setRanges(newRanges);
				expect(selection.anchor.path).to.deep.equal([5, 0]);
				expect(selection.focus.path).to.deep.equal([6, 0]);
			});

			it('should acknowledge backward flag when setting anchor and focus', () => {
				selection.setRanges(newRanges, true);
				expect(selection.anchor.path).to.deep.equal([6, 0]);
				expect(selection.focus.path).to.deep.equal([5, 0]);
			});

			it('should fire exactly one update event', () => {
				selection.setRanges(newRanges);
				expect(spy.calledOnce).to.be.true;
			});

			it('should detach removed LiveRanges', () => {
				selection.setRanges(newRanges);
				expect(oldRanges[0].detach.called).to.be.true;
				expect(oldRanges[1].detach.called).to.be.true;
			});
		});

		describe('getFirstRange', () => {
			it('should return a range which start position is before all other ranges\' start positions', () => {
				// This will not be the first range despite being added as first
				selection.addRange(new _range2.default(new _position2.default(root, [4]), new _position2.default(root, [5])));

				// This should be the first range.
				selection.addRange(new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [4])));

				// A random range that is not first.
				selection.addRange(new _range2.default(new _position2.default(root, [6]), new _position2.default(root, [7])));

				let range = selection.getFirstRange();

				expect(range.start.path).to.deep.equal([1]);
				expect(range.end.path).to.deep.equal([4]);
			});
		});

		describe('getFirstPosition', () => {
			it('should return a position that is in selection and is before any other position from the selection', () => {
				// This will not be a range containing the first position despite being added as first
				selection.addRange(new _range2.default(new _position2.default(root, [4]), new _position2.default(root, [5])));

				// This should be the first range.
				selection.addRange(new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [4])));

				// A random range that is not first.
				selection.addRange(new _range2.default(new _position2.default(root, [6]), new _position2.default(root, [7])));

				let position = selection.getFirstPosition();

				expect(position.path).to.deep.equal([1]);
			});
		});

		// Selection uses LiveRanges so here are only simple test to see if integration is
		// working well, without getting into complicated corner cases.
		describe('after applying an operation should get updated and not fire update event', () => {
			let spy;

			beforeEach(() => {
				root.insertChildren(0, [new _element2.default('ul', [], 'abcdef'), new _element2.default('p', [], 'foobar'), 'xyz']);

				selection.addRange(new _range2.default(new _position2.default(root, [0, 2]), new _position2.default(root, [1, 4])));

				spy = sinon.spy();
				selection.on('change:range', spy);
			});

			describe('InsertOperation', () => {
				it('before selection', () => {
					doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0, 1]), 'xyz', doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 5]);
					expect(range.end.path).to.deep.equal([1, 4]);
					expect(spy.called).to.be.false;
				});

				it('inside selection', () => {
					doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [1, 0]), 'xyz', doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 2]);
					expect(range.end.path).to.deep.equal([1, 7]);
					expect(spy.called).to.be.false;
				});
			});

			describe('MoveOperation', () => {
				it('move range from before a selection', () => {
					doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [0, 0]), 2, new _position2.default(root, [2]), doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 0]);
					expect(range.end.path).to.deep.equal([1, 4]);
					expect(spy.called).to.be.false;
				});

				it('moved into before a selection', () => {
					doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [2]), 2, new _position2.default(root, [0, 0]), doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 4]);
					expect(range.end.path).to.deep.equal([1, 4]);
					expect(spy.called).to.be.false;
				});

				it('move range from inside of selection', () => {
					doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [1, 0]), 2, new _position2.default(root, [2]), doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 2]);
					expect(range.end.path).to.deep.equal([1, 2]);
					expect(spy.called).to.be.false;
				});

				it('moved range intersects with selection', () => {
					doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [1, 3]), 2, new _position2.default(root, [4]), doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 2]);
					expect(range.end.path).to.deep.equal([1, 3]);
					expect(spy.called).to.be.false;
				});

				it('split inside selection (do not break selection)', () => {
					doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [2]), new _element2.default('p'), doc.version));

					doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [1, 2]), 4, new _position2.default(root, [2, 0]), doc.version));

					let range = selection._ranges[0];

					expect(range.start.path).to.deep.equal([0, 2]);
					expect(range.end.path).to.deep.equal([2, 2]);
					expect(spy.called).to.be.false;
				});
			});
		});

		describe('attributes interface', () => {
			let fullP, emptyP, rangeInFullP, rangeInEmptyP;

			beforeEach(() => {
				root.insertChildren(0, [new _element2.default('p', [], 'foobar'), new _element2.default('p', [], [])]);

				fullP = root.getChild(0);
				emptyP = root.getChild(1);

				rangeInFullP = new _range2.default(new _position2.default(root, [0, 4]), new _position2.default(root, [0, 4]));
				rangeInEmptyP = new _range2.default(new _position2.default(root, [1, 0]), new _position2.default(root, [1, 0]));
			});

			describe('setAttribute', () => {
				it('should set given attribute on the selection', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('foo', 'bar');

					expect(selection.getAttribute('foo')).to.equal('bar');
					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
				});

				it('should store attribute if the selection is in empty node', () => {
					selection.setRanges([rangeInEmptyP]);
					selection.setAttribute('foo', 'bar');

					expect(selection.getAttribute('foo')).to.equal('bar');

					expect(emptyP.getAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.equal('bar');
				});

				it('should fire change:attribute event', () => {
					let spy = sinon.spy();
					selection.on('change:attribute', spy);

					selection.setAttribute('foo', 'bar');

					expect(spy.called).to.be.true;
				});
			});

			describe('hasAttribute', () => {
				it('should return true if element contains attribute with given key', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('foo', 'bar');

					expect(selection.hasAttribute('foo')).to.be.true;
				});

				it('should return false if element does not contain attribute with given key', () => {
					expect(selection.hasAttribute('abc')).to.be.false;
				});
			});

			describe('getAttribute', () => {
				it('should return undefined if element does not contain given attribute', () => {
					expect(selection.getAttribute('abc')).to.be.undefined;
				});
			});

			describe('getAttributes', () => {
				it('should return an iterator that iterates over all attributes set on the text fragment', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('foo', 'bar');
					selection.setAttribute('abc', 'xyz');

					let attrs = Array.from(selection.getAttributes());

					expect(attrs).to.deep.equal([['foo', 'bar'], ['abc', 'xyz']]);
				});
			});

			describe('setAttributesTo', () => {
				it('should remove all attributes set on element and set the given ones', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('abc', 'xyz');
					selection.setAttributesTo({ foo: 'bar' });

					expect(selection.getAttribute('foo')).to.equal('bar');
					expect(selection.getAttribute('abc')).to.be.undefined;

					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('abc'))).to.be.false;
				});

				it('should remove all stored attributes and store the given ones if the selection is in empty node', () => {
					selection.setRanges([rangeInEmptyP]);
					selection.setAttribute('abc', 'xyz');
					selection.setAttributesTo({ foo: 'bar' });

					expect(selection.getAttribute('foo')).to.equal('bar');
					expect(selection.getAttribute('abc')).to.be.undefined;

					expect(emptyP.getAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.equal('bar');
					expect(emptyP.hasAttribute(_selection2.default._getStoreAttributeKey('abc'))).to.be.false;
				});

				it('should fire change:attribute event', () => {
					let spy = sinon.spy();
					selection.on('change:attribute', spy);

					selection.setAttributesTo({ foo: 'bar' });

					expect(spy.called).to.be.true;
				});
			});

			describe('removeAttribute', () => {
				it('should remove attribute set on the text fragment', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('foo', 'bar');
					selection.removeAttribute('foo');

					expect(selection.getAttribute('foo')).to.be.undefined;

					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
				});

				it('should remove stored attribute if the selection is in empty node', () => {
					selection.setRanges([rangeInEmptyP]);
					selection.setAttribute('foo', 'bar');
					selection.removeAttribute('foo');

					expect(selection.getAttribute('foo')).to.be.undefined;

					expect(emptyP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
				});

				it('should fire change:attribute event', () => {
					let spy = sinon.spy();
					selection.on('change:attribute', spy);

					selection.removeAttribute('foo');

					expect(spy.called).to.be.true;
				});
			});

			describe('clearAttributes', () => {
				it('should remove all attributes from the element', () => {
					selection.setRanges([rangeInFullP]);
					selection.setAttribute('foo', 'bar');
					selection.setAttribute('abc', 'xyz');

					selection.clearAttributes();

					expect(selection.getAttribute('foo')).to.be.undefined;
					expect(selection.getAttribute('abc')).to.be.undefined;

					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
					expect(fullP.hasAttribute(_selection2.default._getStoreAttributeKey('abc'))).to.be.false;
				});

				it('should remove all stored attributes if the selection is in empty node', () => {
					selection.setRanges([rangeInEmptyP]);
					selection.setAttribute('foo', 'bar');
					selection.setAttribute('abc', 'xyz');

					selection.clearAttributes();

					expect(selection.getAttribute('foo')).to.be.undefined;
					expect(selection.getAttribute('abc')).to.be.undefined;

					expect(emptyP.hasAttribute(_selection2.default._getStoreAttributeKey('foo'))).to.be.false;
					expect(emptyP.hasAttribute(_selection2.default._getStoreAttributeKey('abc'))).to.be.false;
				});

				it('should fire change:attribute event', () => {
					let spy = sinon.spy();
					selection.on('change:attribute', spy);

					selection.clearAttributes();

					expect(spy.called).to.be.true;
				});
			});
		});

		describe('_updateAttributes', () => {
			beforeEach(() => {
				root.insertChildren(0, [new _element2.default('p', { p: true }), new _text2.default('a', { a: true }), new _element2.default('p', { p: true }), new _text2.default('b', { b: true }), new _text2.default('c', { c: true }), new _element2.default('p', [], [new _text2.default('d', { d: true })]), new _element2.default('p', { p: true }), new _text2.default('e', { e: true })]);
			});

			it('if selection is a range, should find first character in it and copy it\'s attributes', () => {
				selection.setRanges([new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [5]))]);

				expect(Array.from(selection.getAttributes())).to.deep.equal([['b', true]]);

				// Step into elements when looking for first character:
				selection.setRanges([new _range2.default(new _position2.default(root, [5]), new _position2.default(root, [7]))]);

				expect(Array.from(selection.getAttributes())).to.deep.equal([['d', true]]);
			});

			it('if selection is collapsed it should seek a character to copy that character\'s attributes', () => {
				// Take styles from character before selection.
				selection.setRanges([new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [2]))]);
				expect(Array.from(selection.getAttributes())).to.deep.equal([['a', true]]);

				// If there are none,
				// Take styles from character after selection.
				selection.setRanges([new _range2.default(new _position2.default(root, [3]), new _position2.default(root, [3]))]);
				expect(Array.from(selection.getAttributes())).to.deep.equal([['b', true]]);

				// If there are none,
				// Look from the selection position to the beginning of node looking for character to take attributes from.
				selection.setRanges([new _range2.default(new _position2.default(root, [6]), new _position2.default(root, [6]))]);
				expect(Array.from(selection.getAttributes())).to.deep.equal([['c', true]]);

				// If there are none,
				// Look from the selection position to the end of node looking for character to take attributes from.
				selection.setRanges([new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [0]))]);
				expect(Array.from(selection.getAttributes())).to.deep.equal([['a', true]]);

				// If there are no characters to copy attributes from, use stored attributes.
				selection.setRanges([new _range2.default(new _position2.default(root, [0, 0]), new _position2.default(root, [0, 0]))]);
				expect(Array.from(selection.getAttributes())).to.deep.equal([]);
			});

			it('should fire change:attribute event', () => {
				let spy = sinon.spy();
				selection.on('change:attribute', spy);

				selection.setRanges([new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [5]))]);

				expect(spy.called).to.be.true;
			});
		});

		describe('_getStoredAttributes', () => {
			it('should return no values if there are no ranges in selection', () => {
				let values = Array.from(selection._getStoredAttributes());

				expect(values).to.deep.equal([]);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
