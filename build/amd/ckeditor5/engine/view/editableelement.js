define(['exports', './containerelement.js', '../../utils/mix.js', '../../utils/observablemixin.js'], function (exports, _containerelement, _mix, _observablemixin) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _mix2 = _interopRequireDefault(_mix);

	var _observablemixin2 = _interopRequireDefault(_observablemixin);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Editable element which can be a {@link view.engine.RootEditableElement root} or nested editable area in the editor.
  *
  * @memberOf engine.view
  * @extends engine.view.ContainerElement
  * @mixes utils.ObservaleMixin
  */
	class EditableElement extends _containerelement2.default {
		/**
   * Creates an editable element.
   */
		constructor(document, name, attrs, children) {
			super(name, attrs, children);

			/**
    * {@link engine.view.Document} that is an owner of this root.
    *
    * @private
    * @member {engine.view.Document} engine.view.RootEditableElement#_document
    */
			this._document = document;

			/**
    * Whether the editable is in read-write or read-only mode.
    *
    * @observable
    * @member {Boolean} engine.view.EditableElement#isReadOnly
    */
			this.set('isReadOnly', false);

			/**
    * Whether the editable is focused.
    *
    * This property updates when {@link engine.view.Document#focusedEditable} changes.
    *
    * @readonly
    * @observable
    * @member {Boolean} engine.view.RootEditableElement#isFocused
    */
			this.bind('isFocused').to(document, 'focusedEditable', focusedEditable => focusedEditable == this);
		}

		/**
   * Gets the {@link engine.view.Document} reference.
   *
   * @returns {engine.view.Document|null} View Document of the node or `null`.
   */
		getDocument() {
			return this._document;
		}
	}

	exports.default = EditableElement;
	(0, _mix2.default)(EditableElement, _observablemixin2.default);
});