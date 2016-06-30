define(['exports', '../model/position.js', '../view/position.js', '../model/range.js', '../view/range.js', '../view/text.js', '../model/element.js'], function (exports, _position, _position3, _range, _range3, _text, _element) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _position2 = _interopRequireDefault(_position);

	var _position4 = _interopRequireDefault(_position3);

	var _range2 = _interopRequireDefault(_range);

	var _range4 = _interopRequireDefault(_range3);

	var _text2 = _interopRequireDefault(_text);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Maps elements and positions between {@link engine.view.Document view} and {@link engine.model model}.
  *
  * Mapper use binded elements to find corresponding elements and positions, so, to get proper results,
  * all Tree Model elements should be {@link engine.conversion.Mapper#bindElements binded}.
  *
  * @memberOf engine.conversion
  */
	class Mapper {
		/**
   * Creates an instance of the mapper.
   */
		constructor() {
			/**
    * Model element to View element mapping.
    *
    * @private
    * @member {WeakMap} engine.conversion.Mapper#_modelToViewMapping
    */
			this._modelToViewMapping = new WeakMap();

			/**
    * View element to Model element mapping.
    *
    * @private
    * @member {WeakMap} engine.conversion.Mapper#_viewToModelMapping
    */
			this._viewToModelMapping = new WeakMap();
		}

		/**
   * Marks model and view elements as corresponding. Corresponding elements can be retrieved by using
   * the {@link engine.conversion.Mapper#toModelElement toModelElement} and
   * {@link engine.conversion.Mapper#toViewElement toViewElement} methods.
   * The information that elements are bound is also used to translate positions.
   *
   * @param {engine.model.Element} modelElement Model element.
   * @param {engine.view.Element} viewElement View element.
   */
		bindElements(modelElement, viewElement) {
			this._modelToViewMapping.set(modelElement, viewElement);
			this._viewToModelMapping.set(viewElement, modelElement);
		}

		/**
   * Removes all model to view and view to model bindings.
   */
		clearBindings() {
			this._modelToViewMapping = new WeakMap();
			this._viewToModelMapping = new WeakMap();
		}

		/**
   * Gets the corresponding model element.
   *
   * @param {engine.view.Element} viewElement View element.
   * @returns {engine.model.Element|null} Corresponding model element or `null` if not found.
   */
		toModelElement(viewElement) {
			return this._viewToModelMapping.get(viewElement);
		}

		/**
   * Gets the corresponding view element.
   *
   * @param {engine.model.Element} modelElement Model element.
   * @returns {engine.view.Element|null} Corresponding view element or `null` if not found.
   */
		toViewElement(modelElement) {
			return this._modelToViewMapping.get(modelElement);
		}

		/**
   * Gets the corresponding model range.
   *
   * @param {engine.view.Range} viewRange View range.
   * @returns {engine.model.Range} Corresponding model range.
   */
		toModelRange(viewRange) {
			return new _range2.default(this.toModelPosition(viewRange.start), this.toModelPosition(viewRange.end));
		}

		/**
   * Gets the corresponding view range.
   *
   * @param {engine.model.Range} modelRange Model range.
   * @returns {engine.view.Range} Corresponding view range.
   */
		toViewRange(modelRange) {
			const start = this.toViewPosition(modelRange.start);
			const end = this.toViewPosition(modelRange.end);

			if (start && end) {
				return new _range4.default(start, end);
			} else {
				return null;
			}
		}

		/**
   * Gets the corresponding model position.
   *
   * @param {engine.view.Position} viewPosition View position.
   * @returns {engine.model.Position} Corresponding model position.
   */
		toModelPosition(viewPosition) {
			let viewBlock = viewPosition.parent;
			let modelParent = this._viewToModelMapping.get(viewBlock);

			while (!modelParent) {
				viewBlock = viewBlock.parent;
				modelParent = this._viewToModelMapping.get(viewBlock);
			}

			let modelOffset = this._toModelOffset(viewPosition.parent, viewPosition.offset, viewBlock);

			return _position2.default.createFromParentAndOffset(modelParent, modelOffset);
		}

		/**
   * Gets the corresponding view position.
   *
   * @param {engine.model.Position} modelPosition Model position.
   * @returns {engine.view.Position} Corresponding view position.
   */
		toViewPosition(modelPosition) {
			let viewContainer = this._modelToViewMapping.get(modelPosition.parent);

			if (!viewContainer) {
				return null;
			}

			return this._findPositionIn(viewContainer, modelPosition.offset, modelPosition.parent);
		}

		/**
   * Calculates model offset based on the view position and the block element.
   *
   * Example:
   *
   *		<p>foo<b>ba|r</b></p> // _toModelOffset( b, 2, p ) -> 5
   *
   * Is a sum of:
   *
   *		<p>foo|<b>bar</b></p> // _toModelOffset( p, 3, p ) -> 3
   *		<p>foo<b>ba|r</b></p> // _toModelOffset( b, 2, b ) -> 2
   *
   * @private
   * @param {engine.view.Element} viewParent Position parent.
   * @param {Number} viewOffset Position offset.
   * @param {engine.view.Element} viewBlock Block used as a base to calculate offset.
   * @returns {Number} Offset in the model.
   */
		_toModelOffset(viewParent, viewOffset, viewBlock) {
			if (viewBlock != viewParent) {
				// See example.
				const offsetToParentBegging = this._toModelOffset(viewParent.parent, viewParent.getIndex(), viewBlock);
				const offsetInParent = this._toModelOffset(viewParent, viewOffset, viewParent);

				return offsetToParentBegging + offsetInParent;
			}

			// viewBlock == viewParent, so we need to calculate the offset in the parent element.

			// If the position is a text it is simple ("ba|r" -> 2).
			if (viewParent instanceof _text2.default) {
				return viewOffset;
			}

			// If the position is in an element we need to sum lengths of siblings ( <b> bar </b> foo | -> 3 + 3 = 6 ).
			let modelOffset = 0;

			for (let i = 0; i < viewOffset; i++) {
				modelOffset += this._getModelLength(viewParent.getChild(i));
			}

			return modelOffset;
		}

		/**
   * Gets the length of the view element in the model.
   *
   * Examples:
   *
   *		foo          -> 3 // Length of the text is the length of data.
   *		<b>foo</b>   -> 3 // Length the element which has no corresponding model element is a length of its children.
   *		<p>foo</p>   -> 1 // Length the element which has corresponding model element is always 1.
   *
   * @private
   * @param {engine.view.Element} viewNode View node.
   * @returns {Number} Length of the node in the tree model.
   */
		_getModelLength(viewNode) {
			// If we need mapping to be more flexible this method may fire event, so every feature may define the relation
			// between length in the model to the length in the view, for example if one element in the model creates two
			// elements in the view. Now I can not find any example where such feature would be useful.
			if (this._viewToModelMapping.has(viewNode)) {
				return 1;
			} else if (viewNode instanceof _text2.default) {
				return viewNode.data.length;
			} else {
				let len = 0;

				for (let child of viewNode.getChildren()) {
					len += this._getModelLength(child);
				}

				return len;
			}
		}

		/**
   * Finds the position in the view node (or its children) with the expected model offset.
   *
   * Example:
   *
   *		<p>fo<b>bar</b>bom</p> -> expected offset: 4
   *
   *		_findPositionIn( p, 4 ):
   *		<p>|fo<b>bar</b>bom</p> -> expected offset: 4, actual offset: 0
   *		<p>fo|<b>bar</b>bom</p> -> expected offset: 4, actual offset: 2
   *		<p>fo<b>bar</b>|bom</p> -> expected offset: 4, actual offset: 5 -> we are too far
   *
   *		_findPositionIn( b, 4 - ( 5 - 3 ) ):
   *		<p>fo<b>|bar</b>bom</p> -> expected offset: 2, actual offset: 0
   *		<p>fo<b>bar|</b>bom</p> -> expected offset: 2, actual offset: 3 -> we are too far
   *
   *		_findPositionIn( bar, 2 - ( 3 - 3 ) ):
   *		We are in the text node so we can simple find the offset.
   *		<p>fo<b>ba|r</b>bom</p> -> expected offset: 2, actual offset: 2 -> position found
   *
   * @private
   * @param {engine.view.Element} viewParent Tree view element in which we are looking for the position.
   * @param {Number} expectedOffset Expected offset.
   * @returns {engine.view.Position} Found position.
   */
		_findPositionIn(viewParent, expectedOffset, modelParent) {
			// Last scanned view node.
			let viewNode;
			// Length of the last scanned view node.
			let lastLength = 0;

			let modelOffset = 0;
			let viewOffset = 0;

			// In the text node it is simple: offset in the model equals offset in the text.
			if (viewParent instanceof _text2.default) {
				return new _position4.default(viewParent, expectedOffset);
			}

			// In other cases we add lengths of child nodes to find the proper offset.

			// If it is smaller we add the length.
			while (modelOffset < expectedOffset) {
				const modelChild = modelParent.getChild(modelOffset);

				if (modelChild instanceof _element2.default && !this.toViewElement(modelChild)) {
					modelOffset++;
				} else {
					viewNode = viewParent.getChild(viewOffset);
					lastLength = this._getModelLength(viewNode);
					modelOffset += lastLength;
					viewOffset++;
				}
			}

			// If it equals we found the position.
			if (modelOffset == expectedOffset) {
				return this._moveViewPositionToTextNode(new _position4.default(viewParent, viewOffset));
			}
			// If it is higher we need to enter last child.
			else {
					// ( modelOffset - lastLength ) is the offset to the child we enter,
					// so we subtract it from the expected offset to fine the offset in the child.
					return this._findPositionIn(viewNode, expectedOffset - (modelOffset - lastLength), modelParent);
				}
		}

		/**
   * Because we prefer positions in text nodes over positions next to text node moves view position to the text node
   * if it was next to it.
   *
   *		<p>[]<b>foo</b></p> -> <p>[]<b>foo</b></p> // do not touch if position is not directly next to text
   *		<p>foo[]<b>foo</b></p> -> <p>foo{}<b>foo</b></p> // move to text node
   *		<p><b>[]foo</b></p> -> <p><b>{}foo</b></p> // move to text node
   *
   * @private
   * @param {engine.view.Position} viewPosition Position potentially next to text node.
   * @returns {engine.view.Position} Position in text node if possible.
   */
		_moveViewPositionToTextNode(viewPosition) {
			// If the position is just after text node, put it at the end of that text node.
			// If the position is just before text node, put it at the beginning of that text node.
			const nodeBefore = viewPosition.nodeBefore;
			const nodeAfter = viewPosition.nodeAfter;

			if (nodeBefore instanceof _text2.default) {
				return new _position4.default(nodeBefore, nodeBefore.data.length);
			} else if (nodeAfter instanceof _text2.default) {
				return new _position4.default(nodeAfter, 0);
			}

			// Otherwise, just return the given position.
			return viewPosition;
		}
	}
	exports.default = Mapper;
});