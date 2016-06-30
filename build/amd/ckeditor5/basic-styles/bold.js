define(['exports', '../feature.js', './boldengine.js', '../ui/button/button.js', '../ui/button/buttonview.js', '../ui/model.js'], function (exports, _feature, _boldengine, _button, _buttonview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _boldengine2 = _interopRequireDefault(_boldengine);

	var _button2 = _interopRequireDefault(_button);

	var _buttonview2 = _interopRequireDefault(_buttonview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class Bold extends _feature2.default {
		static get requires() {
			return [_boldengine2.default];
		}

		init() {
			const editor = this.editor;
			const t = editor.t;
			const command = editor.commands.get('bold');

			// Create button model.
			const buttonModel = new _model2.default({
				isEnabled: true,
				isOn: false,
				label: t('Bold'),
				icon: 'bold',
				iconAlign: 'LEFT'
			});

			// Bind button model to command.
			buttonModel.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute command.
			this.listenTo(buttonModel, 'execute', () => editor.execute('bold'));

			// Add bold button to feature components.
			editor.ui.featureComponents.add('bold', _button2.default, _buttonview2.default, buttonModel);

			// Set the CTRL+B keystroke.
			editor.keystrokes.set('CTRL+B', 'bold');
		}
	}
	exports.default = Bold;
});