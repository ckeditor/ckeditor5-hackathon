define(['exports', '../feature.js', './entercommand.js', './enterobserver.js'], function (exports, _feature, _entercommand, _enterobserver) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _entercommand2 = _interopRequireDefault(_entercommand);

	var _enterobserver2 = _interopRequireDefault(_enterobserver);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The enter feature. Handles the <kbd>Enter</kbd> and <kbd>Shift + Enter</kbd> keys in the editor.
  *
  * @memberOf enter
  * @extends ckeditor5.Feature
  */
	class Enter extends _feature2.default {
		init() {
			const editor = this.editor;
			const editingView = editor.editing.view;

			editingView.addObserver(_enterobserver2.default);

			editor.commands.set('enter', new _entercommand2.default(editor));

			// TODO We may use keystroke handler for that.
			this.listenTo(editingView, 'enter', (evt, data) => {
				editor.execute('enter');
				data.preventDefault();
			});
		}
	}
	exports.default = Enter;
});