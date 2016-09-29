define('tests', ['/tests/ui/_utils/utils.js', '/ckeditor5/ui/model.js', '/ckeditor5/utils/collection.js', '/ckeditor5/ui/dropdown/dropdown.js', '/ckeditor5/ui/dropdown/dropdownview.js', '/ckeditor5/ui/dropdown/list/listdropdown.js', '/ckeditor5/ui/dropdown/list/listdropdownview.js'], function (_utils, _model, _collection, _dropdown, _dropdownview, _listdropdown, _listdropdownview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _model2 = _interopRequireDefault(_model);

	var _collection2 = _interopRequireDefault(_collection);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _dropdownview2 = _interopRequireDefault(_dropdownview);

	var _listdropdown2 = _interopRequireDefault(_listdropdown);

	var _listdropdownview2 = _interopRequireDefault(_listdropdownview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createTestUIController({
		dropdown: 'div#dropdown',
		listDropdown: 'div#list-dropdown'
	}).then(ui => {
		createEmptyDropdown(ui);
		createListDropdown(ui);
	});

	function createEmptyDropdown(ui) {
		const model = new _model2.default({
			label: 'Dropdown',
			isEnabled: true,
			isOn: false
		});

		const dropdown = new _dropdown2.default(model, new _dropdownview2.default(model));

		ui.add('dropdown', dropdown);

		dropdown.panel.view.element.innerHTML = 'Empty panel. There is no child view in this DropdownPanelView.';
	}

	function createListDropdown(ui) {
		const collection = new _collection2.default({ idProperty: 'label' });

		['0.8em', '1em', '1.2em', '1.5em', '2.0em', '3.0em'].forEach(font => {
			collection.add(new _model2.default({
				label: font,
				style: `font-size: ${ font }`
			}));
		});

		const itemListModel = new _model2.default({
			items: collection
		});

		itemListModel.on('execute', (evtInfo, itemModel) => {
			/* global console */
			console.log('ListItem#execute', itemModel);
		});

		const model = new _model2.default({
			label: 'ListDropdown',
			isEnabled: true,
			isOn: false,
			content: itemListModel
		});

		const dropdown = new _listdropdown2.default(model, new _listdropdownview2.default(model));

		ui.add('listDropdown', dropdown);

		window.listDropdownModel = model;
		window.listDropdownCollection = collection;
		window.Model = _model2.default;
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
