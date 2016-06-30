define(['exports', './characterproxy.js', './textproxy.js', './element.js', './position.js', '../../utils/ckeditorerror.js'], function (exports, _characterproxy, _textproxy, _element, _position, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _characterproxy2 = _interopRequireDefault(_characterproxy);

	var _textproxy2 = _interopRequireDefault(_textproxy);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Position iterator class. It allows to iterate forward and backward over the document.
  *
  * @memberOf engine.model
  */
	class TreeWalker {
		/**
   * Creates a range iterator. All parameters are optional, but you have to specify either `boundaries` or `startPosition`.
   *
   * @constructor
   * @param {Object} options Object with configuration.
   * @param {engine.model.Position} [options.startPosition] Starting position.
   * @param {engine.model.Range} [options.boundaries=null] Range to define boundaries of the iterator.
   * @param {engine.model.Position} [options.startPosition] Starting position.
   * @param {'FORWARD'|'BACKWARD'} [options.direction='FORWARD'] Walking direction.
   * @param {Boolean} [options.singleCharacters=false] Flag indicating whether all consecutive characters with the same attributes
   * should be returned one by one as multiple {@link engine.model.CharacterProxy} (`true`) objects or as one
   * {@link engine.model.TextProxy} (`false`).
   * @param {Boolean} [options.shallow=false] Flag indicating whether iterator should enter elements or not. If the
   * iterator is shallow child nodes of any iterated node will not be returned along with `ELEMENT_END` tag.
   * @param {Boolean} [options.ignoreElementEnd=false] Flag indicating whether iterator should ignore `ELEMENT_END`
   * tags. If the option is true walker will not return a parent node of start position. If this option is `true`
   * each {@link engine.model.Element} will be returned once, while if the option is `false` they might be returned
   * twice: for `'ELEMENT_START'` and `'ELEMENT_END'`.
   */
		constructor({
			boundaries = null,
			startPosition,
			direction = 'FORWARD',
			singleCharacters = false,
			shallow = false,
			ignoreElementEnd = false
		} = {}) {
			if (!boundaries && !startPosition) {
				/**
     * Neither boundaries nor starting position have been defined.
     *
     * @error tree-walker-no-start-position
     */
				throw new _ckeditorerror2.default('tree-walker-no-start-position: Neither boundaries nor starting position have been defined.');
			}

			if (direction != 'FORWARD' && direction != 'BACKWARD') {
				throw new _ckeditorerror2.default('tree-walker-unknown-direction: Only `BACKWARD` and `FORWARD` direction allowed.', { direction });
			}

			/**
    * Iterator boundaries.
    *
    * When the {@link #next} method is called on the end boundary or the {@link #previous} method
    * on the start boundary, then `{ done: true }` is returned.
    *
    * If boundaries are not defined they are set before first and after last child of the root node.
    *
    * @readonly
    * @member {engine.model.Range} engine.model.TreeWalker#boundaries
    */
			this.boundaries = boundaries;

			/**
    * Iterator position. This is always static position, even if the initial position was a
    * {@link engine.model.LivePosition live position}.
    *
    * @readonly
    * @member {engine.model.Position} engine.model.TreeWalker#position
    */
			if (startPosition) {
				this.position = _position2.default.createFromPosition(startPosition);
			} else {
				this.position = _position2.default.createFromPosition(boundaries[direction == 'BACKWARD' ? 'end' : 'start']);
			}

			/**
    * Walking direction. Defaults `FORWARD`.
    *
    * @readonly
    * @member {'BACKWARD'|'FORWARD'} engine.model.TreeWalker#direction
    */
			this.direction = direction;

			/**
    * Flag indicating whether all consecutive characters with the same attributes should be
    * returned as one {@link engine.model.CharacterProxy} (`true`) or one by one (`false`).
    *
    * @readonly
    * @member {Boolean} engine.model.TreeWalker#singleCharacters
    */
			this.singleCharacters = !!singleCharacters;

			/**
    * Flag indicating whether iterator should enter elements or not. If the iterator is shallow child nodes of any
    * iterated node will not be returned along with `ELEMENT_END` tag.
    *
    * @readonly
    * @member {Boolean} engine.model.TreeWalker#shallow
    */
			this.shallow = !!shallow;

			/**
    * Flag indicating whether iterator should ignore `ELEMENT_END` tags. If the option is true walker will not
    * return a parent node of the start position. If this option is `true` each {@link engine.model.Element} will
    * be returned once, while if the option is `false` they might be returned twice:
    * for `'ELEMENT_START'` and `'ELEMENT_END'`.
    *
    * @readonly
    * @member {Boolean} engine.model.TreeWalker#ignoreElementEnd
    */
			this.ignoreElementEnd = !!ignoreElementEnd;

			/**
    * Start boundary cached for optimization purposes.
    *
    * @private
    * @member {engine.model.Element} engine.model.TreeWalker#_boundaryStartParent
    */
			this._boundaryStartParent = this.boundaries ? this.boundaries.start.parent : null;

			/**
    * End boundary cached for optimization purposes.
    *
    * @private
    * @member {engine.model.Element} engine.model.TreeWalker#_boundaryEndParent
    */
			this._boundaryEndParent = this.boundaries ? this.boundaries.end.parent : null;

			/**
    * Parent of the most recently visited node. Cached for optimization purposes.
    *
    * @private
    * @member {engine.model.Element|engine.model.DocumentFragment} engine.model.TreeWalker#_visitedParent
    */
			this._visitedParent = this.position.parent;
		}

		/**
   * Iterator interface.
   */
		[Symbol.iterator]() {
			return this;
		}

		/**
   * Iterator interface method.
   * Detects walking direction and makes step forward or backward.
   *
   * @returns {Object} Object implementing iterator interface, returning information about taken step.
   */
		next() {
			if (this.direction == 'FORWARD') {
				return this._next();
			} else {
				return this._previous();
			}
		}

		/**
   * Makes a step forward in model. Moves the {@link #position} to the next position and returns the encountered value.
   *
   * @private
   * @returns {Object}
   * @returns {Boolean} return.done True if iterator is done.
   * @returns {engine.model.TreeWalkerValue} return.value Information about taken step.
   */
		_next() {
			const previousPosition = this.position;
			const position = _position2.default.createFromPosition(this.position);
			const parent = this._visitedParent;

			// We are at the end of the root.
			if (parent.parent === null && position.offset === parent.getChildCount()) {
				return { done: true };
			}

			// We reached the walker boundary.
			if (parent === this._boundaryEndParent && position.offset == this.boundaries.end.offset) {
				return { done: true };
			}

			const node = parent.getChild(position.offset);

			if (node instanceof _element2.default) {
				if (!this.shallow) {
					// Manual operations on path internals for optimization purposes. Here and in the rest of the method.
					position.path.push(0);
					this._visitedParent = node;
				} else {
					position.offset++;
				}

				this.position = position;

				return formatReturnValue('ELEMENT_START', node, previousPosition, position, 1);
			} else if (node instanceof _characterproxy2.default) {
				if (this.singleCharacters) {
					position.offset++;
					this.position = position;

					return formatReturnValue('CHARACTER', node, previousPosition, position, 1);
				} else {
					let charactersCount = node._nodeListText.text.length - node._index;
					let offset = position.offset + charactersCount;

					if (this._boundaryEndParent == parent && this.boundaries.end.offset < offset) {
						offset = this.boundaries.end.offset;
						charactersCount = offset - position.offset;
					}

					let textProxy = new _textproxy2.default(node, charactersCount);

					position.offset = offset;
					this.position = position;

					return formatReturnValue('TEXT', textProxy, previousPosition, position, charactersCount);
				}
			} else {
				// `node` is not set, we reached the end of current `parent`.
				position.path.pop();
				position.offset++;
				this.position = position;
				this._visitedParent = parent.parent;

				if (this.ignoreElementEnd) {
					return this._next();
				} else {
					return formatReturnValue('ELEMENT_END', parent, previousPosition, position);
				}
			}
		}

		/**
   * Makes a step backward in model. Moves the {@link #position} to the previous position and returns the encountered value.
   *
   * @private
   * @returns {Object}
   * @returns {Boolean} return.done True if iterator is done.
   * @returns {core.model.TreeWalkerValue} return.value Information about taken step.
   */
		_previous() {
			const previousPosition = this.position;
			const position = _position2.default.createFromPosition(this.position);
			const parent = this._visitedParent;

			// We are at the beginning of the root.
			if (parent.parent === null && position.offset === 0) {
				return { done: true };
			}

			// We reached the walker boundary.
			if (parent == this._boundaryStartParent && position.offset == this.boundaries.start.offset) {
				return { done: true };
			}

			// Get node just before current position
			const node = parent.getChild(position.offset - 1);

			if (node instanceof _element2.default) {
				position.offset--;

				if (!this.shallow) {
					position.path.push(node.getChildCount());
					this.position = position;
					this._visitedParent = node;

					if (this.ignoreElementEnd) {
						return this._previous();
					} else {
						return formatReturnValue('ELEMENT_END', node, previousPosition, position);
					}
				} else {
					this.position = position;

					return formatReturnValue('ELEMENT_START', node, previousPosition, position, 1);
				}
			} else if (node instanceof _characterproxy2.default) {
				if (this.singleCharacters) {
					position.offset--;
					this.position = position;

					return formatReturnValue('CHARACTER', node, previousPosition, position, 1);
				} else {
					let charactersCount = node._index + 1;
					let offset = position.offset - charactersCount;

					if (this._boundaryStartParent == parent && this.boundaries.start.offset > offset) {
						offset = this.boundaries.start.offset;
						charactersCount = position.offset - offset;
					}

					let textFragment = new _textproxy2.default(parent.getChild(offset), charactersCount);

					position.offset = offset;
					this.position = position;

					return formatReturnValue('TEXT', textFragment, previousPosition, position, charactersCount);
				}
			} else {
				position.path.pop();
				this.position = position;
				this._visitedParent = parent.parent;

				return formatReturnValue('ELEMENT_START', parent, previousPosition, position, 1);
			}
		}
	}

	exports.default = TreeWalker;
	function formatReturnValue(type, item, previousPosition, nextPosition, length) {
		return {
			done: false,
			value: {
				type: type,
				item: item,
				previousPosition: previousPosition,
				nextPosition: nextPosition,
				length: length
			}
		};
	}

	/**
  * Type of the step made by {@link engine.model.TreeWalker}.
  * Possible values: `'ELEMENT_START'` if walker is at the beginning of a node, `'ELEMENT_END'` if walker is at the end of node,
  * `'CHARACTER'` if walker traversed over a character, or `'TEXT'` if walker traversed over multiple characters (available in
  * character merging mode, see {@link engine.model.TreeWalker#constructor}).
  *
  * @typedef {String} engine.model.TreeWalkerValueType
  */

	/**
  * Object returned by {@link engine.model.TreeWalker} when traversing tree model.
  *
  * @typedef {Object} engine.model.TreeWalkerValue
  * @property {engine.model.TreeWalkerValueType} type
  * @property {engine.model.Item} item Item between old and new positions of {@link engine.model.TreeWalker}.
  * @property {engine.model.Position} previousPosition Previous position of the iterator.
  * * Forward iteration: For `'ELEMENT_END'` it is the last position inside the element. For all other types it is the
  * position before the item. Note that it is more efficient to use this position then calculate the position before
  * the node using {@link engine.model.Position.createBefore}. It is also more efficient to get the
  * position after node by shifting `previousPosition` by `length`, using {@link engine.model.Position#getShiftedBy},
  * then calculate the position using {@link engine.model.Position.createAfter}.
  * * Backward iteration: For `'ELEMENT_START'` it is the first position inside the element. For all other types it is
  * the position after item.
  * @property {engine.model.Position} nextPosition Next position of the iterator.
  * * Forward iteration: For `'ELEMENT_START'` it is the first position inside the element. For all other types it is
  * the position after the item.
  * * Backward iteration: For `'ELEMENT_END'` it is last position inside element. For all other types it is the position
  * before the item.
  * @property {Number} [length] Length of the item. For `'ELEMENT_START'` and `'CHARACTER'` it is 1. For `'TEXT'` it is
  * the length of the text. For `'ELEMENT_END'` it is undefined.
  */

	/**
  * Tree walking directions.
  *
  * @typedef {'FORWARD'|'BACKWARD'} core.model.TreeWalkerDirection
  */
});