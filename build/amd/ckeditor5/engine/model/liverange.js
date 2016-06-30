define(['exports', './range.js', '../../utils/emittermixin.js', '../../utils/mix.js'], function (exports, _range, _emittermixin, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _range2 = _interopRequireDefault(_range);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * LiveRange is a Range in the Tree Model that updates itself as the tree changes. It may be used as a bookmark.
  *
  * **Note:** Be very careful when dealing with `LiveRange`. Each `LiveRange` instance bind events that might
  * have to be unbound. Use {@link engine.model.LiveRange#detach detach} whenever you don't need `LiveRange` anymore.
  *
  * @memberOf engine.model
  */
	class LiveRange extends _range2.default {
		/**
   * Creates a live range.
   *
   * @see engine.model.Range
   */
		constructor(start, end) {
			super(start, end);

			bindWithDocument.call(this);
		}

		/**
   * Unbinds all events previously bound by LiveRange. Use it whenever you don't need LiveRange instance
   * anymore (i.e. when leaving scope in which it was declared or before re-assigning variable that was
   * referring to it).
   */
		detach() {
			this.stopListening();
		}

		/**
   * @see engine.model.Range.createFromElement
   * @static
   * @method engine.model.LiveRange.createFromElement
   * @param {engine.model.Element} element
   * @returns {engine.model.LiveRange}
   */

		/**
   * @see engine.model.Range.createFromPositionAndShift
   * @static
   * @method engine.model.LiveRange.createFromPositionAndShift
   * @param {engine.model.Position} position
   * @param {Number} shift
   * @returns {engine.model.LiveRange}
   */

		/**
   * @see engine.model.Range.createFromParentsAndOffsets
   * @static
   * @method engine.model.LiveRange.createFromParentsAndOffsets
   * @param {engine.model.Element} startElement
   * @param {Number} startOffset
   * @param {engine.model.Element} endElement
   * @param {Number} endOffset
   * @returns {engine.model.LiveRange}
   */

		/**
   * @see engine.model.Range.createFromRange
   * @static
   * @method engine.model.LiveRange.createFromRange
   * @param {engine.model.Range} range
   * @returns {engine.model.LiveRange}
   */
	}

	exports.default = LiveRange;
	/**
  * Binds this LiveRange to the {@link engine.model.Document} that owns this range.
  *
  * @ignore
  * @private
  * @method engine.model.LiveRange#bindWithDocument
  */
	function bindWithDocument() {
		/*jshint validthis: true */

		this.listenTo(this.root.document, 'change', (event, type, changes) => {
			fixBoundaries.call(this, type, changes.range, changes.sourcePosition);
		}, this);
	}

	/**
  * LiveRange boundaries are instances of {@link engine.model.LivePosition}, so it is updated thanks to them. This method
  * additionally fixes the results of updating live positions taking into account that those live positions
  * are boundaries of a range. An example case for fixing live positions is end boundary is moved before start boundary.
  *
  * @ignore
  * @private
  * @method fixBoundaries
  * @param {String} type Type of changes applied to the Tree Model.
  * @param {engine.model.Range} range Range containing the result of applied change.
  * @param {engine.model.Position} [position] Additional position parameter provided by some change events.
  */
	function fixBoundaries(type, range, position) {
		/* jshint validthis: true */
		let updated;
		const howMany = range.end.offset - range.start.offset;

		switch (type) {
			case 'insert':
				updated = this.getTransformedByInsertion(range.start, howMany, false, true)[0];
				break;

			case 'move':
			case 'remove':
			case 'reinsert':
				const sourcePosition = position;

				// Range.getTransformedByMove is expecting `targetPosition` to be "before" move
				// (before transformation). `range.start` is already after the move happened.
				// We have to revert `range.start` to the state before the move.
				const targetPosition = range.start.getTransformedByInsertion(sourcePosition, howMany);

				const result = this.getTransformedByMove(sourcePosition, targetPosition, howMany, false, true);

				// First item in the array is the "difference" part, so a part of the range
				// that did not get moved. We use it as reference range and expand if possible.
				updated = result[0];

				// We will check if there is other range and if it is touching the reference range.
				// If it does, we will expand the reference range (at the beginning or at the end).
				// Keep in mind that without settings `spread` flag, `getTransformedByMove` may
				// return maximum two ranges.
				if (result.length > 1) {
					let otherRange = result[1];

					if (updated.start.isTouching(otherRange.end)) {
						updated.start = otherRange.start;
					} else if (updated.end.isTouching(otherRange.start)) {
						updated.end = otherRange.end;
					}
				}

				break;
		}

		if (updated) {
			this.start = updated.start;
			this.end = updated.end;
		}
	}

	(0, _mix2.default)(LiveRange, _emittermixin2.default);
});