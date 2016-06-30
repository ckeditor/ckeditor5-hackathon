define(['exports', '../feature.js', '../engine/view/observer/domeventdata.js', './deletecommand.js', '../utils/keyboard.js'], function (exports, _feature, _domeventdata, _deletecommand, _keyboard) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _domeventdata2 = _interopRequireDefault(_domeventdata);

	var _deletecommand2 = _interopRequireDefault(_deletecommand);

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

			editor.commands.set('forwardDelete', new _deletecommand2.default(editor, 'FORWARD'));
			editor.commands.set('delete', new _deletecommand2.default(editor, 'BACKWARD'));

			this.listenTo(editingView, 'keydown', (evt, data) => {
				const deleteData = {};

				if (data.keyCode == _keyboard.keyCodes.delete) {
					deleteData.direction = 'FORWARD';
				} else if (data.keyCode == _keyboard.keyCodes.backspace) {
					deleteData.direction = 'BACKWARD';
				} else {
					return;
				}

				deleteData.unit = data.altKey ? 'WORD' : 'CHARACTER';

				editingView.fire('delete', new _domeventdata2.default(editingView, data.domEvent, deleteData));
			});

			this.listenTo(editingView, 'delete', (evt, data) => {
				editor.execute(data.direction == 'FORWARD' ? 'forwardDelete' : 'delete');
				data.preventDefault();
			});
		}
	}

	exports.default = Delete;
});