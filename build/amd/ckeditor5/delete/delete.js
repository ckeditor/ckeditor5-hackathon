define(['exports', '../feature.js', './deletecommand.js', './deleteobserver.js'], function (exports, _feature, _deletecommand, _deleteobserver) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _deletecommand2 = _interopRequireDefault(_deletecommand);

	var _deleteobserver2 = _interopRequireDefault(_deleteobserver);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The delete and backspace feature. Handles <kbd>Delete</kbd> and <kbd>Backspace</kbd> keys in the editor.
  *
  * @memberOf delete
  * @extends ckeditor5.Feature
  */
	class Delete extends _feature2.default {
		init() {
			const editor = this.editor;
			const editingView = editor.editing.view;

			editingView.addObserver(_deleteobserver2.default);

			editor.commands.set('forwardDelete', new _deletecommand2.default(editor, 'FORWARD'));
			editor.commands.set('delete', new _deletecommand2.default(editor, 'BACKWARD'));

			this.listenTo(editingView, 'delete', (evt, data) => {
				editor.execute(data.direction == 'FORWARD' ? 'forwardDelete' : 'delete');
				data.preventDefault();
			});
		}
	}
	exports.default = Delete;
});