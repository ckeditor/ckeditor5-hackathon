define(['exports', './view/document.js', './view/observer/mutationobserver.js', './view/observer/selectionobserver.js', './view/observer/focusobserver.js', './view/observer/keyobserver.js', './conversion/mapper.js', './conversion/modelconversiondispatcher.js', './conversion/model-to-view-converters.js', './conversion/view-selection-to-model-converters.js', './conversion/model-selection-to-view-converters.js', '../utils/emittermixin.js'], function (exports, _document, _mutationobserver, _selectionobserver, _focusobserver, _keyobserver, _mapper, _modelconversiondispatcher, _modelToViewConverters, _viewSelectionToModelConverters, _modelSelectionToViewConverters, _emittermixin) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _document2 = _interopRequireDefault(_document);

	var _mutationobserver2 = _interopRequireDefault(_mutationobserver);

	var _selectionobserver2 = _interopRequireDefault(_selectionobserver);

	var _focusobserver2 = _interopRequireDefault(_focusobserver);

	var _keyobserver2 = _interopRequireDefault(_keyobserver);

	var _mapper2 = _interopRequireDefault(_mapper);

	var _modelconversiondispatcher2 = _interopRequireDefault(_modelconversiondispatcher);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Controller for the editing pipeline. The editing pipeline controls {@link engine.EditingController#model model} rendering,
  * including selection handling. It also creates {@link engine.EditingController#view view document} which build a
  * browser-independent virtualization over the DOM elements. Editing controller also attach default converters and
  * observers.
  *
  * Note that the following observers are attached by the controller and are always available:
  *
  * * {@link view.observer.MutationObserver},
  * * {@link view.observer.SelectionObserver},
  * * {@link view.observer.FocusObserver},
  * * {@link view.observer.KeyObserver}.
  *
  * @memberOf engine
  */
	class EditingController {
		/**
   * Creates editing controller instance.
   *
   * @param {engine.model.Document} model Document model.
   */
		constructor(model) {
			/**
    * Document model.
    *
    * @readonly
    * @member {engine.model.document} engine.EditingController#model
    */
			this.model = model;

			/**
    * View document.
    *
    * @readonly
    * @member {engine.view.document} engine.EditingController#view
    */
			this.view = new _document2.default();

			// Attach default observers.
			this.view.addObserver(_mutationobserver2.default);
			this.view.addObserver(_selectionobserver2.default);
			this.view.addObserver(_focusobserver2.default);
			this.view.addObserver(_keyobserver2.default);

			/**
    * Mapper which describes model-view binding.
    *
    * @readonly
    * @member {engine.conversion.Mapper} engine.EditingController#mapper
    */
			this.mapper = new _mapper2.default();

			/**
    * Model to view conversion dispatcher, which converts changes from the model to
    * {@link engine.EditingController#view editing view}.
    *
    * To attach model to view converter to the editing pipeline you need to add lister to this property:
    *
    *		editing.modelToView( 'insert:$element', customInsertConverter );
    *
    * Or use {@link engine.conversion.ModelConverterBuilder}:
    *
    *		BuildModelConverterFor( editing.modelToView ).fromAttribute( 'bold' ).toElement( 'b' );
    *
    * @readonly
    * @member {engine.conversion.ModelConversionDispatcher} engine.EditingController#modelToView
    */
			this.modelToView = new _modelconversiondispatcher2.default({
				writer: this.view.writer,
				mapper: this.mapper,
				viewSelection: this.view.selection
			});

			/**
    * Property keeping all listenters attached by controller on other objects, so it can
    * stop listening on {@link engine.EditingController#destroy}.
    *
    * @private
    * @member {utils.EmitterMixin} engine.EditingController#_listenter
    */
			this._listenter = Object.create(_emittermixin2.default);

			// Convert view selection to model.
			this._listenter.listenTo(this.view, 'selectionChange', (0, _viewSelectionToModelConverters.convertSelectionChange)(model, this.mapper));

			this._listenter.listenTo(this.model, 'change', (evt, type, changes) => {
				this.modelToView.convertChange(type, changes);
			});

			this._listenter.listenTo(this.model, 'changesDone', () => {
				this.modelToView.convertSelection(model.selection);
				this.view.render();
			});

			// Attach default content converters.
			this.modelToView.on('insert:$text', (0, _modelToViewConverters.insertText)());
			this.modelToView.on('remove', (0, _modelToViewConverters.remove)());
			this.modelToView.on('move', (0, _modelToViewConverters.move)());

			// Attach default selection converters.
			this.modelToView.on('selection', (0, _modelSelectionToViewConverters.clearAttributes)());
			this.modelToView.on('selection', (0, _modelSelectionToViewConverters.convertRangeSelection)());
			this.modelToView.on('selection', (0, _modelSelectionToViewConverters.convertCollapsedSelection)());
		}

		/**
   * {@link engine.view.Document#createRoot Creates} a view root and {@link engine.conversion.Mapper#bindElements binds}
   * the model root with view root and and view root with DOM element:
   *
   *		editing.createRoot( document.querySelector( div#editor ) );
   *
   * If the DOM element is not available at the time you want to create a view root, for instance it is iframe body
   * element, it is possible to create view element and bind the DOM element later:
   *
   *		editing.createRoot( 'body' );
   *		editing.view.attachDomRoot( iframe.contentDocument.body );
   *
   * @param {Element|String} domRoot DOM root element or the name of view root element if the DOM element will be
   * attached later.
   * @param {String} [name='main'] Root name.
   * @returns {engine.view.ContainerElement} View root element.
   */
		createRoot(domRoot, name = 'main') {
			const viewRoot = this.view.createRoot(domRoot, name);
			const modelRoot = this.model.getRoot(name);

			this.mapper.bindElements(modelRoot, viewRoot);

			return viewRoot;
		}

		/**
   * Removes all event listeners attached by the EditingController.
   */
		destroy() {
			this._listenter.stopListening();
		}
	}
	exports.default = EditingController;
});