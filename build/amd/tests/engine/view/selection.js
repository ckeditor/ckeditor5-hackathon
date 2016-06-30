define('tests', ['/ckeditor5/engine/view/selection.js', '/ckeditor5/engine/view/range.js', '/ckeditor5/engine/view/element.js', '/ckeditor5/utils/ckeditorerror.js'], function (_selection, _range, _element, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _selection2 = _interopRequireDefault(_selection);

	var _range2 = _interopRequireDefault(_range);

	var _element2 = _interopRequireDefault(_element);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Selection', () => {
		let selection;
		let el;
		let range1, range2, range3;

		beforeEach(() => {
			selection = new _selection2.default();
			el = new _element2.default('p');
			range1 = _range2.default.createFromParentsAndOffsets(el, 5, el, 10);
			range2 = _range2.default.createFromParentsAndOffsets(el, 1, el, 2);
			range3 = _range2.default.createFromParentsAndOffsets(el, 12, el, 14);
		});

		describe('anchor', () => {
			it('should return null if no ranges in selection', () => {
				expect(selection.anchor).to.be.null;
			});

			it('should return start of single range in selection', () => {
				selection.addRange(range1);
				const anchor = selection.anchor;

				expect(anchor.isEqual(range1.start)).to.be.true;
				expect(anchor).to.not.equal(range1.start);
			});

			it('should return end of single range in selection when added as backward', () => {
				selection.addRange(range1, true);
				const anchor = selection.anchor;

				expect(anchor.isEqual(range1.end)).to.be.true;
				expect(anchor).to.not.equal(range1.end);
			});

			it('should get anchor from last inserted range', () => {
				selection.addRange(range1);
				selection.addRange(range2);

				expect(selection.anchor.isEqual(range2.start)).to.be.true;
			});
		});

		describe('focus', () => {
			it('should return null if no ranges in selection', () => {
				expect(selection.focus).to.be.null;
			});

			it('should return end of single range in selection', () => {
				selection.addRange(range1);
				const focus = selection.focus;

				expect(focus.isEqual(range1.end)).to.be.true;
			});

			it('should return start of single range in selection when added as backward', () => {
				selection.addRange(range1, true);
				const focus = selection.focus;

				expect(focus.isEqual(range1.start)).to.be.true;
				expect(focus).to.not.equal(range1.start);
			});

			it('should get focus from last inserted range', () => {
				selection.addRange(range1);
				selection.addRange(range2);

				expect(selection.focus.isEqual(range2.end)).to.be.true;
			});
		});

		describe('isCollapsed', () => {
			it('should return true when there is single collapsed range', () => {
				const range = _range2.default.createFromParentsAndOffsets(el, 5, el, 5);
				selection.addRange(range);

				expect(selection.isCollapsed).to.be.true;
			});

			it('should return false when there are multiple ranges', () => {
				const range1 = _range2.default.createFromParentsAndOffsets(el, 5, el, 5);
				const range2 = _range2.default.createFromParentsAndOffsets(el, 15, el, 15);
				selection.addRange(range1);
				selection.addRange(range2);

				expect(selection.isCollapsed).to.be.false;
			});

			it('should return false when there is not collapsed range', () => {
				const range = _range2.default.createFromParentsAndOffsets(el, 15, el, 16);
				selection.addRange(range);

				expect(selection.isCollapsed).to.be.false;
			});
		});

		describe('rangeCount', () => {
			it('should return proper range count', () => {
				expect(selection.rangeCount).to.equal(0);

				selection.addRange(range1);

				expect(selection.rangeCount).to.equal(1);

				selection.addRange(range2);

				expect(selection.rangeCount).to.equal(2);
			});
		});

		describe('isBackward', () => {
			it('is defined by the last added range', () => {
				const range1 = _range2.default.createFromParentsAndOffsets(el, 5, el, 10);
				const range2 = _range2.default.createFromParentsAndOffsets(el, 15, el, 16);

				selection.addRange(range1, true);
				expect(selection).to.have.property('isBackward', true);

				selection.addRange(range2);
				expect(selection).to.have.property('isBackward', false);
			});

			it('is false when last range is collapsed', () => {
				const range = _range2.default.createFromParentsAndOffsets(el, 5, el, 5);

				selection.addRange(range, true);

				expect(selection.isBackward).to.be.false;
			});
		});

		describe('addRange', () => {
			it('should add range to selection ranges', () => {
				selection.addRange(range1);
				expect(selection._ranges[0].isEqual(range1)).to.be.true;
			});

			it('should fire change event', done => {
				selection.once('change', () => {
					expect(selection._ranges[0].isEqual(range1)).to.be.true;
					done();
				});

				selection.addRange(range1);
			});

			it('should throw when range is intersecting with already added range', () => {
				const range2 = _range2.default.createFromParentsAndOffsets(el, 7, el, 15);
				selection.addRange(range1);
				expect(() => {
					selection.addRange(range2);
				}).to.throw(_ckeditorerror2.default, 'view-selection-range-intersects');

				expect(() => {
					selection.addRange(range1);
				}).to.throw(_ckeditorerror2.default, 'view-selection-range-intersects');
			});
		});

		describe('getRanges', () => {
			it('should return iterator with copies of all ranges', () => {
				selection.addRange(range1);
				selection.addRange(range2);

				const iterable = selection.getRanges();
				const ranges = Array.from(iterable);

				expect(ranges.length).to.equal(2);
				expect(ranges[0].isEqual(range1)).to.be.true;
				expect(ranges[0]).to.not.equal(range1);
				expect(ranges[1].isEqual(range2)).to.be.true;
				expect(ranges[1]).to.not.equal(range2);
			});
		});

		describe('getFirstRange', () => {
			it('should return copy of range with first position', () => {
				selection.addRange(range1);
				selection.addRange(range2);
				selection.addRange(range3);

				const range = selection.getFirstRange();

				expect(range.isEqual(range2)).to.be.true;
				expect(range).to.not.equal(range2);
			});

			it('should return null if no ranges are present', () => {
				expect(selection.getFirstRange()).to.be.null;
			});
		});

		describe('getLastRange', () => {
			it('should return copy of range with last position', () => {
				selection.addRange(range1);
				selection.addRange(range2);
				selection.addRange(range3);

				const range = selection.getLastRange();

				expect(range.isEqual(range3)).to.be.true;
				expect(range).to.not.equal(range3);
			});

			it('should return null if no ranges are present', () => {
				expect(selection.getLastRange()).to.be.null;
			});
		});

		describe('getFirstPosition', () => {
			it('should return copy of first position', () => {
				selection.addRange(range1);
				selection.addRange(range2);
				selection.addRange(range3);

				const position = selection.getFirstPosition();

				expect(position.isEqual(range2.start)).to.be.true;
				expect(position).to.not.equal(range2.start);
			});

			it('should return null if no ranges are present', () => {
				expect(selection.getFirstPosition()).to.be.null;
			});
		});

		describe('getLastPosition', () => {
			it('should return copy of range with last position', () => {
				selection.addRange(range1);
				selection.addRange(range2);
				selection.addRange(range3);

				const position = selection.getLastPosition();

				expect(position.isEqual(range3.end)).to.be.true;
				expect(position).to.not.equal(range3.end);
			});

			it('should return null if no ranges are present', () => {
				expect(selection.getLastPosition()).to.be.null;
			});
		});

		describe('isEqual', () => {
			it('should return true if selections equal', () => {
				selection.addRange(range1);
				selection.addRange(range2);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range1);
				otherSelection.addRange(range2);

				expect(selection.isEqual(otherSelection)).to.be.true;
			});

			it('should return true if backward selections equal', () => {
				selection.addRange(range1, true);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range1, true);

				expect(selection.isEqual(otherSelection)).to.be.true;
			});

			it('should return false if ranges count does not equal', () => {
				selection.addRange(range1);
				selection.addRange(range2);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range1);

				expect(selection.isEqual(otherSelection)).to.be.false;
			});

			it('should return false if ranges do not equal', () => {
				selection.addRange(range1);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range2);

				expect(selection.isEqual(otherSelection)).to.be.false;
			});

			it('should return false if directions do not equal', () => {
				selection.addRange(range1);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range2, true);

				expect(selection.isEqual(otherSelection)).to.be.false;
			});
		});

		describe('removeAllRanges', () => {
			it('should remove all ranges and fire change event', done => {
				selection.addRange(range1);
				selection.addRange(range2);

				selection.once('change', () => {
					expect(selection.rangeCount).to.equal(0);
					done();
				});

				selection.removeAllRanges();
			});

			it('should do nothing when no ranges are present', () => {
				const fireSpy = sinon.spy(selection, 'fire');
				selection.removeAllRanges();

				fireSpy.restore();
				expect(fireSpy.notCalled).to.be.true;
			});
		});

		describe('setRanges', () => {
			it('should add ranges and fire change event', done => {
				selection.addRange(range1);

				selection.once('change', () => {
					expect(selection.rangeCount).to.equal(2);
					expect(selection._ranges[0].isEqual(range2)).to.be.true;
					expect(selection._ranges[0]).is.not.equal(range2);
					expect(selection._ranges[1].isEqual(range3)).to.be.true;
					expect(selection._ranges[1]).is.not.equal(range3);
					done();
				});

				selection.setRanges([range2, range3]);
			});
		});

		describe('setTo', () => {
			it('should return true if selections equal', () => {
				selection.addRange(range1);

				const otherSelection = new _selection2.default();
				otherSelection.addRange(range2);
				otherSelection.addRange(range3, true);

				selection.setTo(otherSelection);

				expect(selection.rangeCount).to.equal(2);
				expect(selection._ranges[0].isEqual(range2)).to.be.true;
				expect(selection._ranges[0]).is.not.equal(range2);
				expect(selection._ranges[1].isEqual(range3)).to.be.true;
				expect(selection._ranges[1]).is.not.equal(range3);

				expect(selection.anchor.isEqual(range3.end)).to.be.true;
			});
		});

		describe('collapseToStart', () => {
			it('should collapse to start position and fire change event', done => {
				selection.setRanges([range1, range2, range3]);
				selection.once('change', () => {
					expect(selection.rangeCount).to.equal(1);
					expect(selection.isCollapsed).to.be.true;
					expect(selection._ranges[0].start.isEqual(range2.start)).to.be.true;
					done();
				});

				selection.collapseToStart();
			});

			it('should do nothing if no ranges present', () => {
				const fireSpy = sinon.spy(selection, 'fire');

				selection.collapseToStart();

				fireSpy.restore();
				expect(fireSpy.notCalled).to.be.true;
			});
		});

		describe('collapseToEnd', () => {
			it('should collapse to end position and fire change event', done => {
				selection.setRanges([range1, range2, range3]);
				selection.once('change', () => {
					expect(selection.rangeCount).to.equal(1);
					expect(selection.isCollapsed).to.be.true;
					expect(selection._ranges[0].end.isEqual(range3.end)).to.be.true;
					done();
				});

				selection.collapseToEnd();
			});

			it('should do nothing if no ranges present', () => {
				const fireSpy = sinon.spy(selection, 'fire');

				selection.collapseToEnd();

				fireSpy.restore();
				expect(fireSpy.notCalled).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
