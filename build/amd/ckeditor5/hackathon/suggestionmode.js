define(['exports', '../feature.js', '../ui/button/button.js', '../ui/button/buttonview.js', '../ui/model.js', './suggestionmodeengine.js'], function (exports, _feature, _button, _buttonview, _model, _suggestionmodeengine) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _button2 = _interopRequireDefault(_button);

	var _buttonview2 = _interopRequireDefault(_buttonview);

	var _model2 = _interopRequireDefault(_model);

	var _suggestionmodeengine2 = _interopRequireDefault(_suggestionmodeengine);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class SuggestionMode extends _feature2.default {
		static get requires() {
			return [_suggestionmodeengine2.default];
		}

		init() {
			const editor = this.editor;
			const t = editor.t;
			const command = editor.commands.get('suggestionMode');

			// Create button model.
			const buttonModel = new _model2.default({
				isEnabled: true,
				isOn: false,
				label: t('Suggestion Mode'),
				iconAlign: 'LEFT'
			});

			// Bind button model to command.
			buttonModel.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute command.
			this.listenTo(buttonModel, 'execute', () => editor.execute('suggestionMode'));

			// Add suggestionMode button to feature components.
			editor.ui.featureComponents.add('suggestionMode', _button2.default, _buttonview2.default, buttonModel);
		}
	}
	exports.default = SuggestionMode;
});