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
  * Undo feature.
  *
  * Undo features brings in possibility to undo and re-do changes done in Tree Model by deltas through Batch API.
  *
  * @memberOf undo
  */
	class Undo extends _feature2.default {
		static get requires() {
			return [_undoengine2.default];
		}

		/**
   * @inheritDoc
   */
		init() {
			const editor = this.editor;
			const t = editor.t;

			this._initFeature('undo', t('Undo'));
			this._initFeature('redo', t('Redo'));

			editor.keystrokes.set('ctrl + z', 'undo');
			editor.keystrokes.set('ctrl + y', 'redo');
			editor.keystrokes.set('ctrl + shift + z', 'redo');
		}

		_initFeature(name, label) {
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