define(['exports', '../feature.js', './formatsengine.js', '../ui/model.js', '../ui/dropdown/list/listdropdown.js', '../ui/dropdown/list/listdropdownview.js', '../utils/collection.js'], function (exports, _feature, _formatsengine, _model, _listdropdown, _listdropdownview, _collection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _formatsengine2 = _interopRequireDefault(_formatsengine);

	var _model2 = _interopRequireDefault(_model);

	var _listdropdown2 = _interopRequireDefault(_listdropdown);

	var _listdropdownview2 = _interopRequireDefault(_listdropdownview);

	var _collection2 = _interopRequireDefault(_collection);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class Formats extends _feature2.default {
		static get requires() {
			return [_formatsengine2.default];
		}

		init() {
			const editor = this.editor;
			const command = editor.commands.get('format');
			const formats = command.formats;
			const collection = new _collection2.default();

			// Add formats to collection.
			for (let format of formats) {
				collection.add(new _model2.default({
					id: format.id,
					label: format.label
				}));
			}

			// Create item list model.
			const itemListModel = new _model2.default({
				items: collection
			});

			// Create dropdown model.
			const dropdownModel = new _model2.default({
				isEnabled: true,
				isOn: false,
				label: 'Formats',
				content: itemListModel
			});

			// Bind dropdown model to command.
			dropdownModel.bind('isEnabled').to(command, 'isEnabled');
			dropdownModel.bind('label').to(command, 'value', format => format.label);

			// Execute command when item from dropdown is selected.
			this.listenTo(itemListModel, 'execute', (evt, itemModel) => {
				editor.execute('format', itemModel.id);
			});

			editor.ui.featureComponents.add('formats', _listdropdown2.default, _listdropdownview2.default, dropdownModel);
		}
	}
	exports.default = Formats;
});