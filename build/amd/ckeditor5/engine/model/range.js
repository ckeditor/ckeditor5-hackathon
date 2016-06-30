define(['exports', './position.js', './treewalker.js', '../../utils/comparearrays.js'], function (exports, _position, _treewalker, _comparearrays) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _position2 = _interopRequireDefault(_position);

	var _treewalker2 = _interopRequireDefault(_treewalker);

	var _comparearrays2 = _interopRequireDefault(_comparearrays);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Range class. Range is iterable.
  *
  * @memberOf engine.model
  */
	class Range {
		/**
   * Creates a range spanning from `start` position to `end` position.
   * **Note:** Constructor creates it's own {@link engine.model.Position} instances basing on passed values.
   *
   * @param {engine.model.Position} start Start position.
   * @param {engine.model.Position} end End position.
   */
		constructor(start, end) {
			/**
    * Start position.
    *
    * @readonly
    * @member {engine.model.Position} engine.model.Range#start
    */
			this.start = _position2.default.createFromPosition(start);

			/**
    * End position.
    *
    * @readonly
    * @member {engine.model.Position} engine.model.Range#end
    */
			this.end = _position2.default.createFromPosition(end);
		}

		/**
   * Returns an iterator that iterates over all {@link engine.model.Item items} that are in this range and returns
   * them together with additional information like length or {@link engine.model.Position positions},
   * grouped as {@link engine.model.TreeWalkerValue}. It iterates over all {@link engine.model.TextProxy texts}
   * that are inside the range and all the {@link engine.model.Element}s we enter into when iterating over this
   * range.
   *
   * **Note:** iterator will not return a parent node of start position. This is in contrary to
   * {@link engine.model.TreeWalker} which will return that node with `'ELEMENT_END'` type. Iterator also
   * returns each {@link engine.model.Element} once, while simply used {@link engine.model.TreeWalker} might
   * return it twice: for `'ELEMENT_START'` and `'ELEMENT_END'`.
   *
   * **Note:** because iterator does not return {@link engine.model.TreeWalkerValue values} with the type of
   * `'ELEMENT_END'`, you can use {@link engine.model.TreeWalkerValue.previousPosition} as a position before the
   * item.
   *
   * @see engine.model.TreeWalker
   * @returns {Iterable.<engine.model.TreeWalkerValue>}
   */
		*[Symbol.iterator]() {
			yield* new _treewalker2.default({ boundaries: this, ignoreElementEnd: true });
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
   * Returns whether this range is flat, that is if start position and end position are in the same parent.
   *
   * @type {Boolean}
   */
		get isFlat() {
			return this.start.parent === this.end.parent;
		}

		/**
   * Returns whether this range has any nodes in it.
   *
   * @type {Boolean}
   */
		get isEmpty() {
			return this.start.isTouching(this.end);
		}

		/**
   * Range root element.
   *
   * Equals to the root of start position (which should be same as root of end position).
   *
   * @type {engine.model.RootElement|engine.model.DocumentFragment}
   */
		get root() {
			return this.start.root;
		}

		/**
   * Checks whether this contains given {@link engine.model.Position position}.
   *
   * @param {engine.model.Position} position Position to check.
   * @returns {Boolean} True if given {@link engine.model.Position position} is contained.
   */
		containsPosition(position) {
			return position.isAfter(this.start) && position.isBefore(this.end);
		}

		/**
   * Checks whether this range contains given {@link engine.model.Range range}.
   *
   * @param {engine.model.Range} otherRange Range to check.
   * @returns {Boolean} True if given {@link engine.model.Range range} boundaries are contained by this range.
   */
		containsRange(otherRange) {
			return this.containsPosition(otherRange.start) && this.containsPosition(otherRange.end);
		}

		/**
   * Gets a part of this {@link engine.model.Range range} which is not a part of given {@link engine.model.Range range}. Returned
   * array contains zero, one or two {@link engine.model.Range ranges}.
   *
   * Examples:
   *
   *		let range = new Range( new Position( root, [ 2, 7 ] ), new Position( root, [ 4, 0, 1 ] ) );
   *		let otherRange = new Range( new Position( root, [ 1 ] ), new Position( root, [ 5 ] ) );
   *		let transformed = range.getDifference( otherRange );
   *		// transformed array has no ranges because `otherRange` contains `range`
   *
   *		otherRange = new Range( new Position( root, [ 1 ] ), new Position( root, [ 3 ] ) );
   *		transformed = range.getDifference( otherRange );
   *		// transformed array has one range: from [ 3 ] to [ 4, 0, 1 ]
   *
   *		otherRange = new Range( new Position( root, [ 3 ] ), new Position( root, [ 4 ] ) );
   *		transformed = range.getDifference( otherRange );
   *		// transformed array has two ranges: from [ 2, 7 ] to [ 3 ] and from [ 4 ] to [ 4, 0, 1 ]
   *
   * @param {engine.model.Range} otherRange Range to differentiate against.
   * @returns {Array.<engine.model.Range>} The difference between ranges.
   */
		getDifference(otherRange) {
			const ranges = [];

			if (this.isIntersecting(otherRange)) {
				// Ranges intersect.

				if (this.containsPosition(otherRange.start)) {
					// Given range start is inside this range. This means that we have to
					// add shrunken range - from the start to the middle of this range.
					ranges.push(new Range(this.start, otherRange.start));
				}

				if (this.containsPosition(otherRange.end)) {
					// Given range end is inside this range. This means that we have to
					// add shrunken range - from the middle of this range to the end.
					ranges.push(new Range(otherRange.end, this.end));
				}
			} else {
				// Ranges do not intersect, return the original range.
				ranges.push(Range.createFromRange(this));
			}

			return ranges;
		}

		/**
   * Returns an intersection of this {@link engine.model.Range range} and given {@link engine.model.Range range}. Intersection
   * is a common part of both of those ranges. If ranges has no common part, returns `null`.
   *
   * Examples:
   *
   *		let range = new Range( new Position( root, [ 2, 7 ] ), new Position( root, [ 4, 0, 1 ] ) );
   *		let otherRange = new Range( new Position( root, [ 1 ] ), new Position( root, [ 2 ] ) );
   *		let transformed = range.getIntersection( otherRange ); // null - ranges have no common part
   *
   *		otherRange = new Range( new Position( root, [ 3 ] ), new Position( root, [ 5 ] ) );
   *		transformed = range.getIntersection( otherRange ); // range from [ 3 ] to [ 4, 0, 1 ]
   *
   * @param {engine.model.Range} otherRange Range to check for intersection.
   * @returns {engine.model.Range|null} A common part of given ranges or null if ranges have no common part.
   */
		getIntersection(otherRange) {
			if (this.isIntersecting(otherRange)) {
				// Ranges intersect, so a common range will be returned.
				// At most, it will be same as this range.
				let commonRangeStart = this.start;
				let commonRangeEnd = this.end;

				if (this.containsPosition(otherRange.start)) {
					// Given range start is inside this range. This means thaNt we have to
					// shrink common range to the given range start.
					commonRangeStart = otherRange.start;
				}

				if (this.containsPosition(otherRange.end)) {
					// Given range end is inside this range. This means that we have to
					// shrink common range to the given range end.
					commonRangeEnd = otherRange.end;
				}

				return new Range(commonRangeStart, commonRangeEnd);
			}

			// Ranges do not intersect, so they do not have common part.
			return null;
		}

		/**
   * Computes and returns the smallest set of {@link #isFlat flat} ranges, that covers this range in whole.
   * Assuming that tree model model structure is ("[" and "]" are range boundaries):
   *
   *		root                                                            root
   *		 |- element DIV                         DIV             P2              P3             DIV
   *		 |   |- element H                   H        P1        f o o           b a r       H         P4
   *		 |   |   |- "fir[st"             fir[st     lorem                               se]cond     ipsum
   *		 |   |- element P1
   *		 |   |   |- "lorem"                                              ||
   *		 |- element P2                                                   ||
   *		 |   |- "foo"                                                    VV
   *		 |- element P3
   *		 |   |- "bar"                                                   root
   *		 |- element DIV                         DIV             [P2             P3]             DIV
   *		 |   |- element H                   H       [P1]       f o o           b a r        H         P4
   *		 |   |   |- "se]cond"            fir[st]    lorem                               [se]cond     ipsum
   *		 |   |- element P4
   *		 |   |   |- "ipsum"
   *
   * As it can be seen, letters contained in the range are stloremfoobarse, spread across different parents.
   * We are looking for minimal set of {@link #isFlat flat} ranges that contains the same nodes.
   *
   * Minimal flat ranges for above range `( [ 0, 0, 3 ], [ 3, 0, 2 ] )` will be:
   *
   *		( [ 0, 0, 3 ], [ 0, 0, 5 ] ) = "st"
   *		( [ 0, 1 ], [ 0, 2 ] ) = element P1 ("lorem")
   *		( [ 1 ], [ 3 ] ) = element P2, element P3 ("foobar")
   *		( [ 3, 0, 0 ], [ 3, 0, 2 ] ) = "se"
   *
   * **Note:** this method is not returning flat ranges that contain no nodes. It may also happen that not-collapsed
   * range will return an empty array of flat ranges.
   *
   * @returns {Array.<engine.model.Range>} Array of flat ranges.
   */
		getMinimalFlatRanges() {
			let ranges = [];

			// We find on which tree-level start and end have the lowest common ancestor
			let cmp = (0, _comparearrays2.default)(this.start.path, this.end.path);
			// If comparison returned string it means that arrays are same.
			let diffAt = typeof cmp == 'string' ? Math.min(this.start.path.length, this.end.path.length) : cmp;

			let pos = _position2.default.createFromPosition(this.start);
			let posParent = pos.parent;

			// Go up.
			while (pos.path.length > diffAt + 1) {
				let howMany = posParent.getChildCount() - pos.offset;

				if (howMany !== 0) {
					ranges.push(new Range(pos, pos.getShiftedBy(howMany)));
				}

				pos.path = pos.path.slice(0, -1);
				pos.offset++;
				posParent = posParent.parent;
			}

			// Go down.
			while (pos.path.length <= this.end.path.length) {
				let offset = this.end.path[pos.path.length - 1];
				let howMany = offset - pos.offset;

				if (howMany !== 0) {
					ranges.push(new Range(pos, pos.getShiftedBy(howMany)));
				}

				pos.offset = offset;
				pos.path.push(0);
			}

			return ranges;
		}

		/**
   * Creates a {@link engine.model.TreeWalker} instance with this range as a boundary.
   *
   * @param {Object} options Object with configuration options. See {@link engine.model.TreeWalker}.
   * @param {engine.model.Position} [options.startPosition]
   * @param {Boolean} [options.singleCharacters=false]
   * @param {Boolean} [options.shallow=false]
   * @param {Boolean} [options.ignoreElementEnd=false]
   */
		getWalker(options = {}) {
			options.boundaries = this;

			return new _treewalker2.default(options);
		}

		/**
   * Returns an iterator that iterates over all {@link engine.model.Item items} that are in this range and returns
   * them. It iterates over all {@link engine.model.CharacterProxy characters} or
   * {@link engine.model.TextProxy texts} that are inside the range and all the {@link engine.model.Element}s
   * we enter into when iterating over this range. Note that it use {@link engine.model.TreeWalker} with the
   * {@link engine.model.TreeWalker#ignoreElementEnd ignoreElementEnd} option set to true.
   *
   * @param {Object} options Object with configuration options. See {@link engine.model.TreeWalker}.
   * @param {engine.model.Position} [options.startPosition]
   * @param {Boolean} [options.singleCharacters=false]
   * @param {Boolean} [options.shallow=false]
   * @returns {Iterable.<engine.model.Item>}
   */
		*getItems(options = {}) {
			options.boundaries = this;
			options.ignoreElementEnd = true;

			const treeWalker = new _treewalker2.default(options);

			for (let value of treeWalker) {
				yield value.item;
			}
		}

		/**
   * Returns an iterator that iterates over all {@link engine.model.Position positions} that are boundaries or
   * contained in this range.
   *
   * @param {Object} options Object with configuration options. See {@link engine.model.TreeWalker}.
   * @param {Boolean} [options.singleCharacters=false]
   * @param {Boolean} [options.shallow=false]
   * @returns {Iterable.<engine.model.Position>}
   */
		*getPositions(options = {}) {
			options.boundaries = this;

			const treeWalker = new _treewalker2.default(options);

			yield treeWalker.position;

			for (let value of treeWalker) {
				yield value.nextPosition;
			}
		}

		/**
   * Returns an array containing one or two {engine.model.Range ranges} that are a result of transforming this
   * {@link engine.model.Range range} by inserting `howMany` nodes at `insertPosition`. Two {@link engine.model.Range ranges} are
   * returned if the insertion was inside this {@link engine.model.Range range} and `spread` is set to `true`.
   *
   * Examples:
   *
   *		let range = new Range( new Position( root, [ 2, 7 ] ), new Position( root, [ 4, 0, 1 ] ) );
   *		let transformed = range.getTransformedByInsertion( new Position( root, [ 1 ] ), 2 );
   *		// transformed array has one range from [ 4, 7 ] to [ 6, 0, 1 ]
   *
   *		transformed = range.getTransformedByInsertion( new Position( root, [ 4, 0, 0 ] ), 4 );
   *		// transformed array has one range from [ 2, 7 ] to [ 4, 0, 5 ]
   *
   *		transformed = range.getTransformedByInsertion( new Position( root, [ 3, 2 ] ), 4 );
   *		// transformed array has one range, which is equal to original range
   *
   *		transformed = range.getTransformedByInsertion( new Position( root, [ 3, 2 ] ), 4, true );
   *		// transformed array has two ranges: from [ 2, 7 ] to [ 3, 2 ] and from [ 3, 6 ] to [ 4, 0, 1 ]
   *
   *		transformed = range.getTransformedByInsertion( new Position( root, [ 4, 0, 1 ] ), 4, false, false );
   *		// transformed array has one range which is equal to original range because insertion is after the range boundary
   *
   *		transformed = range.getTransformedByInsertion( new Position( root, [ 4, 0, 1 ] ), 4, false, true );
   *		// transformed array has one range: from [ 2, 7 ] to [ 4, 0, 5 ] because range was expanded
   *
   * @protected
   * @param {engine.model.Position} insertPosition Position where nodes are inserted.
   * @param {Number} howMany How many nodes are inserted.
   * @param {Boolean} [spread] Flag indicating whether this {engine.model.Range range} should be spread if insertion
   * was inside the range. Defaults to `false`.
   * @param {Boolean} [isSticky] Flag indicating whether insertion should expand a range if it is in a place of
   * range boundary. Defaults to `false`.
   * @returns {Array.<engine.model.Range>} Result of the transformation.
   */
		getTransformedByInsertion(insertPosition, howMany, spread = false, isSticky = false) {
			if (spread && this.containsPosition(insertPosition)) {
				// Range has to be spread. The first part is from original start to the spread point.
				// The other part is from spread point to the original end, but transformed by
				// insertion to reflect insertion changes.

				return [new Range(this.start, insertPosition), new Range(insertPosition.getTransformedByInsertion(insertPosition, howMany, true), this.end.getTransformedByInsertion(insertPosition, howMany, this.isCollapsed))];
			} else {
				const range = Range.createFromRange(this);

				let insertBeforeStart = range.isCollapsed ? isSticky : !isSticky;
				let insertBeforeEnd = isSticky;

				range.start = range.start.getTransformedByInsertion(insertPosition, howMany, insertBeforeStart);
				range.end = range.end.getTransformedByInsertion(insertPosition, howMany, insertBeforeEnd);

				return [range];
			}
		}

		/**
   * Returns an array containing {engine.model.Range ranges} that are a result of transforming this
   * {@link engine.model.Range range} by moving `howMany` nodes from `sourcePosition` to `targetPosition`.
   *
   * @param {engine.model.Position} sourcePosition Position from which nodes are moved.
   * @param {engine.model.Position} targetPosition Position to where nodes are moved.
   * @param {Number} howMany How many nodes are moved.
   * @param {Boolean} [spread] Flag indicating whether this {engine.model.Range range} should be spread if insertion
   * was inside the range. Defaults to `false`.
   * @returns {Array.<engine.model.Range>} Result of the transformation.
   */
		getTransformedByMove(sourcePosition, targetPosition, howMany, spread, isSticky = false) {
			let result;

			const moveRange = new Range(sourcePosition, sourcePosition.getShiftedBy(howMany));

			const differenceSet = this.getDifference(moveRange);
			let difference;

			if (differenceSet.length == 1) {
				difference = new Range(differenceSet[0].start.getTransformedByDeletion(sourcePosition, howMany), differenceSet[0].end.getTransformedByDeletion(sourcePosition, howMany));
			} else if (differenceSet.length == 2) {
				// This means that ranges were moved from the inside of this range.
				// So we can operate on this range positions and we don't have to transform starting position.
				difference = new Range(this.start, this.end.getTransformedByDeletion(sourcePosition, howMany));
			} else {
				// 0.
				difference = null;
			}

			const insertPosition = targetPosition.getTransformedByDeletion(sourcePosition, howMany);

			if (difference) {
				result = difference.getTransformedByInsertion(insertPosition, howMany, spread, isSticky);
			} else {
				result = [];
			}

			const common = this.getIntersection(moveRange);

			// Add common part of the range only if there is any and only if it is not
			// already included in `difference` part.
			if (common && (spread || difference === null || !difference.containsPosition(insertPosition))) {
				result.push(new Range(common.start._getCombined(moveRange.start, insertPosition), common.end._getCombined(moveRange.start, insertPosition)));
			}

			return result;
		}

		/**
   * Two ranges equal if their start and end positions equal.
   *
   * @param {engine.model.Range} otherRange Range to compare with.
   * @returns {Boolean} True if ranges equal.
   */
		isEqual(otherRange) {
			return this.start.isEqual(otherRange.start) && this.end.isEqual(otherRange.end);
		}

		/**
   * Checks and returns whether this range intersects with given range.
   *
   * @param {engine.model.Range} otherRange Range to compare with.
   * @returns {Boolean} True if ranges intersect.
   */
		isIntersecting(otherRange) {
			return this.start.isBefore(otherRange.end) && this.end.isAfter(otherRange.start);
		}

		/**
   * Creates a range inside an element which starts before the first child and ends after the last child.
   *
   * @param {engine.model.Element} element Element which is a parent for the range.
   * @returns {engine.model.Range} Created range.
   */
		static createFromElement(element) {
			return this.createFromParentsAndOffsets(element, 0, element, element.getChildCount());
		}

		/**
   * Creates a range on given element only. The range starts just before the element and ends before the first child of the element.
   *
   * @param {engine.model.Element} element Element on which range should be created.
   * @returns {engine.model.Range} Created range.
   */
		static createOnElement(element) {
			return this.createFromParentsAndOffsets(element.parent, element.getIndex(), element, 0);
		}

		/**
   * Creates a new range spreading from specified position to the same position moved by given shift.
   *
   * @param {engine.model.Position} position Beginning of the range.
   * @param {Number} shift How long the range should be.
   * @returns {engine.model.Range}
   */
		static createFromPositionAndShift(position, shift) {
			return new this(position, position.getShiftedBy(shift));
		}

		/**
   * Creates a range from given parents and offsets.
   *
   * @param {engine.model.Element} startElement Start position parent element.
   * @param {Number} startOffset Start position offset.
   * @param {engine.model.Element} endElement End position parent element.
   * @param {Number} endOffset End position offset.
   * @returns {engine.model.Range} Created range.
   */
		static createFromParentsAndOffsets(startElement, startOffset, endElement, endOffset) {
			return new this(_position2.default.createFromParentAndOffset(startElement, startOffset), _position2.default.createFromParentAndOffset(endElement, endOffset));
		}

		/**
   * Creates and returns a new instance of Range which is equal to passed range.
   *
   * @param {engine.model.Range} range Range to clone.
   * @returns {engine.model.Range}
   */
		static createFromRange(range) {
			return new this(range.start, range.end);
		}

		/**
   * Creates Range from deserilized object, ie. from parsed JSON string.
   *
   * @param {Object} json Deserialized JSON object.
   * @param {engine.model.Document} doc Document on which this operation will be applied.
   * @returns {engine.model.Range}
   */
		static fromJSON(json, doc) {
			return new this(_position2.default.fromJSON(json.start, doc), _position2.default.fromJSON(json.end, doc));
		}
	}
	exports.default = Range;
});