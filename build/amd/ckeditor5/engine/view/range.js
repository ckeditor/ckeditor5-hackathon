define(['exports', './position.js'], function (exports, _position) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Tree view range.
  *
  * @memberOf engine.view
  */
	class Range {
		/**
   * Creates a range spanning from `start` position to `end` position.
   * **Note:** Constructor creates it's own {@link engine.view.Position} instances basing on passed values.
   *
   * @param {engine.view.Position} start Start position.
   * @param {engine.view.Position} end End position.
   */
		constructor(start, end) {
			/**
    * Start position.
    *
    * @member engine.view.Range#start
    * @type {engine.view.Position}
    */
			this.start = _position2.default.createFromPosition(start);

			/**
    * End position.
    *
    * @member engine.view.Range#end
    * @type {engine.view.Position}
    */
			this.end = _position2.default.createFromPosition(end);
		}

		/**
   * Returns whether the range is collapsed, that is it start and end positions are equal.
   *
   * @type {Boolean}
   */
		get isCollapsed() {
			return this.start.isEqual(this.end);
		}

		/**
   * Two ranges equal if their start and end positions equal.
   *
   * @param {engine.view.Range} otherRange Range to compare with.
   * @returns {Boolean} True if ranges equal.
   */
		isEqual(otherRange) {
			return this == otherRange || this.start.isEqual(otherRange.start) && this.end.isEqual(otherRange.end);
		}

		/**
   * Checks and returns whether this range intersects with given range.
   *
   * @param {engine.view.Range} otherRange Range to compare with.
   * @returns {Boolean} True if ranges intersect.
   */
		isIntersecting(otherRange) {
			return this.start.isBefore(otherRange.end) && this.end.isAfter(otherRange.start);
		}

		/**
   * Creates a range from given parents and offsets.
   *
   * @param {engine.view.Element} startElement Start position parent element.
   * @param {Number} startOffset Start position offset.
   * @param {engine.view.Element} endElement End position parent element.
   * @param {Number} endOffset End position offset.
   * @returns {engine.view.Range} Created range.
   */
		static createFromParentsAndOffsets(startElement, startOffset, endElement, endOffset) {
			return new this(new _position2.default(startElement, startOffset), new _position2.default(endElement, endOffset));
		}

		/**
   * Creates and returns a new instance of Range which is equal to passed range.
   *
   * @param {engine.view.Range} range Range to clone.
   * @returns {engine.view.Range}
   */
		static createFromRange(range) {
			return new this(range.start, range.end);
		}
	}
	exports.default = Range;
});