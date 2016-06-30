define(['exports', '../feature.js', './undoengine.js', '../ui/model.js', '../ui/button/button.js', '../ui/button/buttonview.js'], function (exports, _feature, _undoengine, _model, _button, _buttonview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _undoengine2 = _interopRequireDefault(_undoengine);

	var _model2 = _interopRequireDefault(_model);

	var _button2 = _interopRequireDefault(_button);

	var _buttonview2 = _interopRequireDefault(_buttonview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Undo feature. Introduces the "Undo" and "Redo" buttons to the editor.
  *
  * @memberOf undo
  * @extends ckeditor5.Feature
  */
	class Undo extends _feature2.default {
		/**
   * @inheritDoc
   */
		static get requires() {
			return [_undoengine2.default];
		}

		/**
   * @inheritDoc
   */
		init() {
			const editor = this.editor;
			const t = editor.t;

			this._addButton('undo', t('Undo'));
			this._addButton('redo', t('Redo'));

			editor.keystrokes.set('CTRL+Z', 'undo');
			editor.keystrokes.set('CTRL+Y', 'redo');
			editor.keystrokes.set('CTRL+SHIFT+Z', 'redo');
		}

		/**
   * Creates a button for the specified command.
   *
   * @private
   * @param {String} name Command name.
   * @param {String} label Button label.
   */
		_addButton(name, label) {
			const editor = this.editor;

			const command = editor.commands.get(name);

			const model = new _model2.default({
				isOn: false,
				label: label,
				icon: name,
				iconAlign: 'LEFT'
			});

			model.bind('isEnabled').to(command, 'isEnabled');

			this.listenTo(model, 'execute', () => editor.execute(name));

			editor.ui.featureComponents.add(name, _button2.default, _buttonview2.default, model);
		}
	}
	exports.default = Undo;
});