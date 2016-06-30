define(['exports', '../../editorui/editoruiview.js', '../../../utils/uid.js'], function (exports, _editoruiview, _uid) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _editoruiview2 = _interopRequireDefault(_editoruiview);

	var _uid2 = _interopRequireDefault(_uid);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Boxed editor UI view.
  *
  * @member ui.editorUI.boxed
  * @extends ui.editorUI.EditorUIView
  */
	class BoxedEditorUIView extends _editoruiview2.default {
		/**
   * Creates a BoxedEditorUIView instance.
   *
   * @param {utils.Observable} model (View)Model of this view.
   * @param {utils.Locale} [locale] The {@link ckeditor5.Editor#locale editor's locale} instance.
   */
		constructor(model, locale) {
			super(model, locale);

			const t = this.t;
			const ariaLabelUid = (0, _uid2.default)();

			this.template = {
				tag: 'div',

				attributes: {
					class: ['ck-reset', 'ck-editor', 'ck-rounded-corners'],
					role: 'application',
					dir: 'ltr',
					lang: locale.lang,
					'aria-labelledby': `cke-editor__aria-label_${ ariaLabelUid }`
				},

				children: [{
					tag: 'span',
					attributes: {
						id: `cke-editor__aria-label_${ ariaLabelUid }`,
						class: 'cke-voice-label',
						children: [
						// TODO: Editor name?
						t('Rich Text Editor')]
					}
				}, {
					tag: 'div',
					attributes: {
						class: 'ck-editor__top ck-reset-all',
						role: 'presentation'
					}
				}, {
					tag: 'div',
					attributes: {
						class: 'ck-editor__main',
						role: 'presentation'
					}
				}]
			};

			this.register('top', '.ck-editor__top');
			this.register('main', '.ck-editor__main');
		}
	}
	exports.default = BoxedEditorUIView;
});