define(['exports', './rootelement.js', './position.js', './range.js', '../../utils/emittermixin.js', '../../utils/mix.js', '../../utils/ckeditorerror.js'], function (exports, _rootelement, _position, _range, _emittermixin, _mix, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _rootelement2 = _interopRequireDefault(_rootelement);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _mix2 = _interopRequireDefault(_mix);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * LivePosition is a position in {@link engine.model.Document Document} that updates itself as Document is changed
  * through operations. It may be used as a bookmark in the Document.
  * **Note:** Contrary to {@link engine.model.Position}, LivePosition works only in roots that are
  * {@link engine.model.RootElement}. If {@link engine.model.DocumentFragment} is passed, error will be thrown.
  * **Note:** Be very careful when dealing with LivePosition. Each LivePosition instance bind events that might
  * have to be unbound. Use {@link engine.model.LivePosition#detach} whenever you don't need LivePosition anymore.
  *
  * @memberOf engine.model
  * @extends engine.model.Position
  */
	class LivePosition extends _position2.default {
		/**
   * Creates a live position.
   *
   * @see engine.model.Position
   * @param {engine.model.RootElement} root
   * @param {Array.<Number>} path
   * @param {engine.model.PositionStickiness} [stickiness] Defaults to `'STICKS_TO_NEXT'`.
   * See {@link engine.model.LivePosition#stickiness}.
   */
		constructor(root, path, stickiness) {
			if (!(root instanceof _rootelement2.default)) {
				/**
     * LivePosition root has to be an instance of RootElement.
     *
     * @error liveposition-root-not-rootelement
     */
				throw new _ckeditorerror2.default('liveposition-root-not-rootelement: LivePosition root has to be an instance of RootElement.');
			}

			super(root, path);

			/**
    * Flag representing LivePosition stickiness. LivePosition might be sticking to previous node or next node.
    * Whenever some nodes are inserted at the same position as LivePosition, `stickiness` is checked to decide if
    * LivePosition should be moved. Similar applies when a range of nodes is moved and one of it's boundary
    * position is same as LivePosition.
    *
    * Examples:
    *
    *		Insert:
    *		Position is at | and we insert at the same position, marked as ^:
    *		- | sticks to previous node: `<p>f|^oo</p>` => `<p>f|baroo</p>`
    *		- | sticks to next node: `<p>f^|oo</p>` => `<p>fbar|oo</p>`
    *
    *		Move:
    *		Position is at | and range [ ] is moved to position ^:
    *		- | sticks to previous node: `<p>f|[oo]</p><p>b^ar</p>` => `<p>f|</p><p>booar</p>`
    *		- | sticks to next node: `<p>f|[oo]</p><p>b^ar</p>` => `<p>f</p><p>b|ooar</p>`
    *
    * @member {engine.model.PositionStickiness} engine.model.LivePosition#stickiness
    */
			this.stickiness = stickiness || 'STICKS_TO_NEXT';

			bindWithDocument.call(this);
		}

		/**
   * Unbinds all events previously bound by LivePosition. Use it whenever you don't need LivePosition instance
   * anymore (i.e. when leaving scope in which it was declared or before re-assigning variable that was
   * referring to it).
   */
		detach() {
			this.stopListening();
		}

		/**
   * @static
   * @method engine.model.LivePosition.createAfter
   * @see engine.model.Position.createAfter
   * @param {engine.model.Node} node
   * @returns {engine.model.LivePosition}
   */

		/**
   * @static
   * @method engine.model.LivePosition.createBefore
   * @see engine.model.Position.createBefore
   * @param {engine.model.Node} node
   * @returns {engine.model.LivePosition}
   */

		/**
   * @static
   * @method engine.model.LivePosition.createFromParentAndOffset
   * @see engine.model.Position.createFromParentAndOffset
   * @param {engine.model.Element} parent
   * @param {Number} offset
   * @returns {engine.model.LivePosition}
   */

		/**
   * @static
   * @method engine.model.LivePosition.createFromPosition
   * @see engine.model.Position.createFromPosition
   * @param {engine.model.Position} position
   * @returns {engine.model.LivePosition}
   */
	}

	exports.default = LivePosition;
	/**
  * Binds this LivePosition to the {@link engine.model.Document} that owns this position {@link engine.model.RootElement root}.
  *
  * @ignore
  * @private
  * @method engine.model.LivePosition.bindWithDocument
  */
	function bindWithDocument() {
		/*jshint validthis: true */

		this.listenTo(this.root.document, 'change', (event, type, changes) => {
			transform.call(this, type, changes.range, changes.sourcePosition);
		}, this);
	}

	/**
  * Updates this position accordingly to the updates applied to the Tree Model. Bases on change events.
  *
  * @ignore
  * @private
  * @method transform
  * @param {String} type Type of changes applied to the Tree Model.
  * @param {engine.model.Range} range Range containing the result of applied change.
  * @param {engine.model.Position} [position] Additional position parameter provided by some change events.
  */
	function transform(type, range, position) {
		/*jshint validthis: true */

		let howMany = range.end.offset - range.start.offset;
		let transformed;

		switch (type) {
			case 'insert':
				let insertBefore = this.stickiness == 'STICKS_TO_NEXT';
				transformed = this.getTransformedByInsertion(range.start, howMany, insertBefore);
				break;

			case 'move':
			case 'remove':
			case 'reinsert':
				let originalRange = _range2.default.createFromPositionAndShift(position, howMany);

				let gotMoved = originalRange.containsPosition(this) || originalRange.start.isEqual(this) && this.stickiness == 'STICKS_TO_NEXT' || originalRange.end.isEqual(this) && this.stickiness == 'STICKS_TO_PREVIOUS';

				// We can't use .getTransformedByMove() because we have a different if-condition.
				if (gotMoved) {
					transformed = this._getCombined(position, range.start);
				} else {
					let insertBefore = this.stickiness == 'STICKS_TO_NEXT';
					transformed = this.getTransformedByMove(position, range.start, howMany, insertBefore);
				}
				break;
			default:
				return;
		}

		this.path = transformed.path;
		this.root = transformed.root;
	}

	(0, _mix2.default)(LivePosition, _emittermixin2.default);

	/**
  * Enum representing how position is "sticking" with their neighbour nodes.
  * Possible values: `'STICKS_TO_NEXT'`, `'STICKS_TO_PREVIOUS'`.
  *
  * @typedef {String} engine.model.PositionStickiness
  */
});