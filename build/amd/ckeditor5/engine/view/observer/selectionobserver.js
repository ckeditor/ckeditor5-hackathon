define(['exports', './observer.js', './mutationobserver.js'], function (exports, _observer, _mutationobserver) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _observer2 = _interopRequireDefault(_observer);

	var _mutationobserver2 = _interopRequireDefault(_mutationobserver);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Selection observer class observes selection changes in the document. If selection changes on the document this
  * observer checks if there are any mutations and if DOM selection is different than the
  * {@link engine.view.Document#selection view selection}. Selection observer fires
  * {@link engine.view.Document#selectionChange} event only if selection change was the only change in the document
  * and DOM selection is different then the view selection.
  *
  * Note that this observer is attached by the {@link engine.EditingController} and is available by default.
  *
  * @see engine.view.MutationObserver
  * @memberOf engine.view.observer
  * @extends engine.view.observer.Observer
  */
	class SelectionObserver extends _observer2.default {
		constructor(document) {
			super(document);

			/**
    * Instance of the mutation observer. Selection observer calls
    * {@link engine.view.observer.MutationObserver#flush} to ensure that the mutations will be handled before the
    * {@link engine.view.Document#selectionChange} event is fired.
    *
    * @readonly
    * @member {engine.view.observer.MutationObserver} engine.view.observer.SelectionObserver#mutationObserver
    */
			this.mutationObserver = document.getObserver(_mutationobserver2.default);

			/**
    * Reference to the {@link engine.view.Document} object.
    *
    * @readonly
    * @member {engine.view.Document} engine.view.observer.SelectionObserver#document
    */
			this.document = document;

			/**
    * Reference to the view {@link engine.view.Selection} object used to compare new selection with it.
    *
    * @readonly
    * @member {engine.view.Document} engine.view.observer.SelectionObserver#selection
    */
			this.selection = document.selection;

			/**
    * Reference to the {@link engine.view.Document#domConverter}.
    *
    * @readonly
    * @member {engine.view.DomConverter} engine.view.observer.SelectionObserver#domConverter
    */
			this.domConverter = document.domConverter;

			/**
    * Set of documents which have added "selectionchange" listener to avoid adding listener twice to the same
    * document.
    *
    * @private
    * @member {WeakSet.<Document>} engine.view.observer.SelectionObserver#_documents
    */
			this._documents = new WeakSet();
		}

		/**
   * @inheritDoc
   */
		observe(domElement) {
			const domDocument = domElement.ownerDocument;

			// Add listener once per each document.
			if (this._documents.has(domDocument)) {
				return;
			}

			domDocument.addEventListener('selectionchange', () => this._handleSelectionChange(domDocument));

			this._documents.add(domDocument);
		}

		/**
   * Selection change listener. {@link engine.view.observer.MutationObserver#flush Flush} mutations, check if
   * selection changes and fires {@link engine.view.Document#selectionChange} event.
   *
   * @private
   * @param {Document} domDocument DOM document.
   */
		_handleSelectionChange(domDocument) {
			if (!this.isEnabled) {
				return;
			}

			if (!this.document.focusedEditable) {
				return;
			}

			// Ensure the mutation event will be before selection event on all browsers.
			this.mutationObserver.flush();

			// If there were mutations then the view will be re-rendered by the mutation observer and selection
			// will be updated, so selections will equal and event will not be fired, as expected.
			const domSelection = domDocument.defaultView.getSelection();

			const newViewSelection = this.domConverter.domSelectionToView(domSelection);

			if (this.selection.isEqual(newViewSelection)) {
				return;
			}

			// Should be fired only when selection change was the only document change.
			this.document.fire('selectionChange', {
				oldSelection: this.selection,
				newSelection: newViewSelection,
				domSelection: domSelection
			});

			this.document.render();
		}
	}

	exports.default = SelectionObserver;
});