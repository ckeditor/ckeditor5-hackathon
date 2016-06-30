define(['exports', '../view.js'], function (exports, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @memberOf ui.editableUI
  * @extends ui.View
  */
	class EditableUIView extends _view2.default {
		/**
   * Creates an instance of the EditableUIView class.
   *
   * @param {utils.Observable} model (View)Model of this View.
   * @param {utils.Locale} [locale] The {@link ckeditor5.Editor#locale editor's locale} instance.
   * @param {HTMLElement} [editableElement] The editable element. If not specified, this view
   * should create it. Otherwise, the existing element should be used.
   */
		constructor(model, locale, editableElement) {
			super(model, locale);

			const bind = this.attributeBinder;

			if (editableElement) {
				this.element = this.editableElement = editableElement;
			}

			this.template = {
				tag: 'div',
				attributes: {
					class: [bind.to('isFocused', value => value ? 'ck-focused' : 'ck-blurred'), 'ck-editor__editable'],
					contenteditable: bind.to('isReadOnly', value => !value)
				}
			};

			/**
    * The element which is the main editable element (usually the one with `contentEditable="true"`).
    *
    * @readonly
    * @member {HTMLElement} ui.editableUI.EditableUIView#editableElement
    */
		}

		/**
   * Initializes the View by either applying the {@link template} to the existing
   * {@link editableElement} or assigns {@link element} as {@link editableElement}.
   */
		init() {
			if (this.editableElement) {
				this.applyTemplateToElement(this.editableElement, this.template);
			} else {
				this.editableElement = this.element;
			}

			super.init();
		}

		destroy() {
			super.destroy();

			this.editableElement.contentEditable = false;
		}
	}
	exports.default = EditableUIView;
});