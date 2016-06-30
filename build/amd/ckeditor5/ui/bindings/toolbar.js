define(['exports', '../toolbar/toolbar.js'], function (exports, _toolbar) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _toolbar2 = _interopRequireDefault(_toolbar);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The editor toolbar controller class.
  *
  * @memberOf ui.bindings
  * @extends ui.toolbar.Toolbar
  */

	class Toolbar extends _toolbar2.default {
		/**
   * Creates a new toolbar instance.
   *
   * @param {ui.Model} model
   * @param {ui.View} view
   * @param {ckeditor5.Editor} editor
   */
		constructor(model, view, editor) {
			super(model, view);

			this.editor = editor;
		}

		/**
   * Adds buttons to the toolbar. Buttons are taken from the {@link ui.editorUI.EditorUI#featureComponents}
   * factory.
   *
   * @param {String[]} buttons The name of the buttons to add to the toolbar.
   */
		addButtons(buttons) {
			for (let button of buttons) {
				this.add('buttons', this.editor.ui.featureComponents.create(button));
			}
		}
	}
	exports.default = Toolbar;
});