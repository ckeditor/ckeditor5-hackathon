define(['exports', './text.js', './element.js', './position.js', './filler.js', '../../utils/mix.js', '../../utils/diff.js', '../../utils/dom/insertat.js', '../../utils/dom/remove.js', '../../utils/observablemixin.js', '../../utils/ckeditorerror.js'], function (exports, _text, _element, _position, _filler, _mix, _diff, _insertat, _remove, _observablemixin, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _text2 = _interopRequireDefault(_text);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _mix2 = _interopRequireDefault(_mix);

	var _diff2 = _interopRequireDefault(_diff);

	var _insertat2 = _interopRequireDefault(_insertat);

	var _remove2 = _interopRequireDefault(_remove);

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Renderer updates DOM structure and selection, to make them a reflection of the view structure and selection.
  *
  * View nodes which may need to be rendered needs to be {@link engine.view.Renderer#markToSync marked}.
  * Then, on {@link engine.view.Renderer#render render}, renderer compares the view nodes with the DOM nodes
  * in order to check which ones really need to be refreshed. Finally, it creates DOM nodes from these view nodes,
  * {@link engine.view.DomConverter#bindElements binds} them and inserts into the DOM tree.
  *
  * Every time {@link engine.view.Renderer#render render} is called, renderer additionally checks if
  * {@link engine.view.Renderer#selection selection} needs update and updates it if so.
  *
  * Renderer uses {@link engine.view.DomConverter} to transform and bind nodes.
  *
  * @memberOf engine.view
  */
	class Renderer {
		/**
   * Creates a renderer instance.
   *
   * @param {engine.view.DomConverter} domConverter Converter instance.
   * @param {engine.view.Selection} selection View selection.
   */
		constructor(domConverter, selection) {
			/**
    * Converter instance.
    *
    * @readonly
    * @member {engine.view.DomConverter} engine.view.Renderer#domConverter
    */
			this.domConverter = domConverter;

			/**
    * Set of nodes which attributes changed and may need to be rendered.
    *
    * @readonly
    * @member {Set.<engine.view.Node>} engine.view.Renderer#markedAttributes
    */
			this.markedAttributes = new Set();

			/**
    * Set of elements which child lists changed and may need to be rendered.
    *
    * @readonly
    * @member {Set.<engine.view.Node>} engine.view.Renderer#markedChildren
    */
			this.markedChildren = new Set();

			/**
    * Set of text nodes which text data changed and may need to be rendered.
    *
    * @readonly
    * @member {Set.<engine.view.Node>} engine.view.Renderer#markedTexts
    */
			this.markedTexts = new Set();

			/**
    * View selection. Renderer updates DOM Selection to make it match this one.
    *
    * @readonly
    * @member {engine.view.Selection} engine.view.Renderer#selection
    */
			this.selection = selection;

			/**
    * Position of the inline {@link engine.view.filler filler}.
    * It should always be put BEFORE the text which contains filler.
    *
    * @private
    * @member {engine.view.Position} engine.view.Renderer#_inlineFillerPosition
    */
			this._inlineFillerPosition = null;

			/**
    * {@link engine.view.EditableElement} in which selection is allowed to be rendered.
    * If it is null, then selection will not be rendered.
    *
    * @readonly
    * @member {engine.view.EditableElement|null} engine.view.Renderer#focusedEditable
    */
			this.focusedEditable = null;
		}

		/**
   * Mark node to be synchronized.
   *
   * Note that only view nodes which parents have corresponding DOM elements need to be marked to be synchronized.
   *
   * @see engine.view.Renderer#markedAttributes
   * @see engine.view.Renderer#markedChildren
   * @see engine.view.Renderer#markedTexts
   *
   * @param {engine.view.ChangeType} type Type of the change.
   * @param {engine.view.Node} node Node to be marked.
   */
		markToSync(type, node) {
			if (type === 'text') {
				if (this.domConverter.getCorrespondingDom(node.parent)) {
					this.markedTexts.add(node);
				}
			} else {
				// If the node has no DOM element it is not rendered yet,
				// its children/attributes do not need to be marked to be sync.
				if (!this.domConverter.getCorrespondingDom(node)) {
					return;
				}

				if (type === 'attributes') {
					this.markedAttributes.add(node);
				} else if (type === 'children') {
					this.markedChildren.add(node);
				} else {
					/**
      * Unknown type passed to Renderer.markToSync.
      *
      * @error renderer-unknown-type
      */
					throw new _ckeditorerror2.default('renderer-unknown-type: Unknown type passed to Renderer.markToSync.');
				}
			}
		}

		/**
   * Render method checks {@link engine.view.Renderer#markedAttributes},
   * {@link engine.view.Renderer#markedChildren} and {@link engine.view.Renderer#markedTexts} and updats all
   * nodes which need to be updated. Then it clears all three sets. Also, every time render is called it compares and
   * if needed updates the selection.
   *
   * Renderer tries not to break text composition (e.g. IME) and x-index of the selection,
   * so it does as little as it is needed to update the DOM.
   *
   * For attributes it adds new attributes to DOM elements, updates values and removes
   * attributes which do not exist in the view element.
   *
   * For text nodes it updates the text string if it is different. Note that if parent element is marked as an element
   * which changed child list, text node update will not be done, because it may not be possible do find a
   * {@link engine.view.DomConverter#getCorrespondingDomText corresponding DOM text}. The change will be handled
   * in the parent element.
   *
   * For elements, which child lists have changed, it calculates a {@link diff} and adds or removs children which have changed.
   *
   * Rendering also handles {@link engine.view.filler fillers}. Especially, it checks if the inline filler is needed
   * at selection position and adds or removes it. To prevent breaking text composition inline filler will not be
   * removed as long selection is in the text node which needed it at first.
   */
		render() {
			if (!this._isInlineFillerAtSelection()) {
				this._removeInlineFiller();

				if (this._needAddInlineFiller()) {
					this._inlineFillerPosition = this.selection.getFirstPosition();
					// Do not use `markToSync` so it will be added even if the parent is already added.
					this.markedChildren.add(this._inlineFillerPosition.parent);
				} else {
					this._inlineFillerPosition = null;
				}
			}

			for (let node of this.markedTexts) {
				if (!this.markedChildren.has(node.parent) && this.domConverter.getCorrespondingDom(node.parent)) {
					this._updateText(node);
				}
			}

			for (let element of this.markedAttributes) {
				this._updateAttrs(element);
			}

			for (let element of this.markedChildren) {
				this._updateChildren(element);
			}

			this._updateSelection();

			this.markedTexts.clear();
			this.markedAttributes.clear();
			this.markedChildren.clear();
		}

		/**
   * Returns `true` if the inline filler and selection are in the same place.
   * If it is true it means filler had been added for a reason and selection does not
   * left text node, user can be in the middle of the composition so it should not be touched.
   *
   * @private
   * @returns {Boolean} True if the inline filler and selection are in the same place.
   */
		_isInlineFillerAtSelection() {
			if (this.selection.rangeCount != 1 || !this.selection.isCollapsed) {
				return false;
			}

			const selectionPosition = this.selection.getFirstPosition();
			const fillerPosition = this._inlineFillerPosition;

			if (!fillerPosition) {
				return false;
			}

			if (fillerPosition.isEqual(selectionPosition)) {
				return true;
			}

			if (selectionPosition.parent instanceof _text2.default) {
				if (fillerPosition.isEqual(_position2.default.createBefore(selectionPosition.parent))) {
					return true;
				}
			}

			return false;
		}

		/**
   * Removes inline filler.
   *
   * @private
   */
		_removeInlineFiller() {
			if (!this._inlineFillerPosition) {
				// Nothing to remove.
				return;
			}

			const domFillerPosition = this.domConverter.viewPositionToDom(this._inlineFillerPosition);
			const domFillerNode = domFillerPosition.parent;

			// If there is no filler viewPositionToDom will return parent node, so domFillerNode will be an element.
			if (!(domFillerNode instanceof Text) || !(0, _filler.startsWithFiller)(domFillerNode)) {
				/**
     * No inline filler on expected position.
     *
     * @error renderer-render-no-inline-filler.
     */
				throw new _ckeditorerror2.default('renderer-render-no-inline-filler: No inline filler on expected position.');
			}

			if ((0, _filler.isInlineFiller)(domFillerNode)) {
				domFillerNode.parentNode.removeChild(domFillerNode);
			} else {
				domFillerNode.data = domFillerNode.data.substr(_filler.INLINE_FILLER_LENGTH);
			}
		}

		/**
   * Checks if the inline {@link engine.view.filler fillers} should be added.
   *
   * @private
   * @returns {Boolean} True if the inline fillers should be added.
   */
		_needAddInlineFiller() {
			if (this.selection.rangeCount != 1 || !this.selection.isCollapsed) {
				return false;
			}

			const selectionPosition = this.selection.getFirstPosition();
			const selectionParent = selectionPosition.parent;
			const selectionOffset = selectionPosition.offset;

			// If there is no DOM root we do not care about fillers.
			if (!this.domConverter.getCorrespondingDomElement(selectionParent.getRoot())) {
				return false;
			}

			if (!(selectionParent instanceof _element2.default)) {
				return false;
			}

			// We have block filler, we do not need inline one.
			if (selectionOffset === selectionParent.getFillerOffset()) {
				return false;
			}

			const nodeBefore = selectionPosition.nodeBefore;
			const nodeAfter = selectionPosition.nodeAfter;

			if (nodeBefore instanceof _text2.default || nodeAfter instanceof _text2.default) {
				return false;
			}

			return true;
		}

		/**
   * Checks if text needs to be updated and possibly updates it.
   *
   * @private
   * @param {engine.view.Text} viewText View text to update.
   */
		_updateText(viewText) {
			const domText = this.domConverter.getCorrespondingDom(viewText);

			const actualText = domText.data;
			let expectedText = viewText.data;

			const filler = this._inlineFillerPosition;

			if (filler && filler.parent == viewText.parent && filler.offset == viewText.getIndex()) {
				expectedText = _filler.INLINE_FILLER + expectedText;
			}

			if (actualText != expectedText) {
				domText.data = expectedText;
			}
		}

		/**
   * Checks if attributes list needs to be updated and possibly updates it.
   *
   * @private
   * @param {engine.view.Element} viewElement View element to update.
   */
		_updateAttrs(viewElement) {
			const domElement = this.domConverter.getCorrespondingDom(viewElement);
			const domAttrKeys = Array.from(domElement.attributes).map(attr => attr.name);
			const viewAttrKeys = viewElement.getAttributeKeys();

			// Add or overwrite attributes.
			for (let key of viewAttrKeys) {
				domElement.setAttribute(key, viewElement.getAttribute(key));
			}

			// Remove from DOM attributes which do not exists in the view.
			for (let key of domAttrKeys) {
				if (!viewElement.hasAttribute(key)) {
					domElement.removeAttribute(key);
				}
			}
		}

		/**
   * Checks if elements child list needs to be updated and possibly updates it.
   *
   * @private
   * @param {engine.view.Element} viewElement View element to update.
   */
		_updateChildren(viewElement) {
			const domConverter = this.domConverter;
			const domElement = domConverter.getCorrespondingDom(viewElement);
			const domDocument = domElement.ownerDocument;

			const filler = this._inlineFillerPosition;

			const actualDomChildren = domElement.childNodes;
			const expectedDomChildren = Array.from(domConverter.viewChildrenToDom(viewElement, domDocument, { bind: true }));

			if (filler && filler.parent == viewElement) {
				const expectedNodeAfterFiller = expectedDomChildren[filler.offset];

				if (expectedNodeAfterFiller instanceof Text) {
					expectedNodeAfterFiller.data = _filler.INLINE_FILLER + expectedNodeAfterFiller.data;
				} else {
					expectedDomChildren.splice(filler.offset, 0, domDocument.createTextNode(_filler.INLINE_FILLER));
				}
			}

			const actions = (0, _diff2.default)(actualDomChildren, expectedDomChildren, sameNodes);

			let i = 0;

			for (let action of actions) {
				if (action === 'INSERT') {
					(0, _insertat2.default)(domElement, i, expectedDomChildren[i]);
					i++;
				} else if (action === 'DELETE') {
					(0, _remove2.default)(actualDomChildren[i]);
				} else {
					// 'EQUAL'
					i++;
				}
			}

			function sameNodes(actualDomChild, expectedDomChild) {
				// Elements.
				if (actualDomChild === expectedDomChild) {
					return true;
				}
				// Texts.
				else if (actualDomChild instanceof Text && expectedDomChild instanceof Text) {
						return actualDomChild.data === expectedDomChild.data;
					}
					// Block fillers.
					else if ((0, _filler.isBlockFiller)(actualDomChild, domConverter.blockFiller) && (0, _filler.isBlockFiller)(expectedDomChild, domConverter.blockFiller)) {
							return true;
						}

				// Not matching types.
				return false;
			}
		}

		/**
   * Checks if selection needs to be updated and possibly updates it.
   *
   * @private
   */
		_updateSelection() {
			if (!this.focusedEditable) {
				return;
			}

			const domRoot = this.domConverter.getCorrespondingDomElement(this.focusedEditable);

			if (!domRoot) {
				return;
			}

			const domSelection = domRoot.ownerDocument.defaultView.getSelection();
			const oldViewSelection = domSelection && this.domConverter.domSelectionToView(domSelection);

			if (oldViewSelection && this.selection.isEqual(oldViewSelection)) {
				return;
			}

			domSelection.removeAllRanges();

			for (let range of this.selection.getRanges()) {
				// Update ranges only in currently focused editable.
				if (range.start.parent.getRoot() == this.focusedEditable) {
					const domRangeStart = this.domConverter.viewPositionToDom(range.start);
					const domRangeEnd = this.domConverter.viewPositionToDom(range.end);
					const domRange = new Range();
					domRange.setStart(domRangeStart.parent, domRangeStart.offset);
					domRange.setEnd(domRangeEnd.parent, domRangeEnd.offset);
					domSelection.addRange(domRange);
				}
			}
		}
	}

	exports.default = Renderer;
	(0, _mix2.default)(Renderer, _observablemixin2.default);
});