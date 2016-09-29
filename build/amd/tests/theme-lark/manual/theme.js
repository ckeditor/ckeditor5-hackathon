define('tests', ['/tests/ui/_utils/utils.js', '/ckeditor5/utils/collection.js', '/ckeditor5/ui/iconmanagerview.js', '/ckeditor5/ui/model.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/view.js', '/theme/iconmanagermodel.js', '/ckeditor5/ui/icon/iconview.js', '/ckeditor5/ui/button/button.js', '/ckeditor5/ui/button/buttonview.js', '/ckeditor5/ui/dropdown/list/listdropdown.js', '/ckeditor5/ui/dropdown/list/listdropdownview.js', '/ckeditor5/ui/toolbar/toolbar.js', '/ckeditor5/ui/toolbar/toolbarview.js'], function (_utils, _collection, _iconmanagerview, _model, _controller, _view, _iconmanagermodel, _iconview, _button, _buttonview, _listdropdown, _listdropdownview, _toolbar, _toolbarview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _collection2 = _interopRequireDefault(_collection);

	var _iconmanagerview2 = _interopRequireDefault(_iconmanagerview);

	var _model2 = _interopRequireDefault(_model);

	var _controller2 = _interopRequireDefault(_controller);

	var _view2 = _interopRequireDefault(_view);

	var _iconmanagermodel2 = _interopRequireDefault(_iconmanagermodel);

	var _iconview2 = _interopRequireDefault(_iconview);

	var _button2 = _interopRequireDefault(_button);

	var _buttonview2 = _interopRequireDefault(_buttonview);

	var _listdropdown2 = _interopRequireDefault(_listdropdown);

	var _listdropdownview2 = _interopRequireDefault(_listdropdownview);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _toolbarview2 = _interopRequireDefault(_toolbarview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createTestUIController({
		'icon-plain-1': '#icon-plain-1',
		'icon-plain-2': '#icon-plain-2',
		'icon-color-1': '#icon-color-1',
		'icon-color-2': '#icon-color-2',
		'icon-availability': '#icon-availability',
		'icon-availability-color': '#icon-availability-color',

		'button-states': '#button-states',
		'button-types': '#button-types',
		'button-icon': '#button-icon',
		'button-custom': '#button-custom',
		'button-icon-custom': '#button-icon-custom',
		'button-icon-states': '#button-icon-states',
		'button-responsive-1': '#button-responsive-1',
		'button-responsive-2': '#button-responsive-2',
		'button-responsive-3': '#button-responsive-3',

		dropdown: '#dropdown',

		'toolbar-text': '#toolbar-text',
		'toolbar-button': '#toolbar-button',
		'toolbar-rounded': '#toolbar-rounded',
		'toolbar-wrap': '#toolbar-wrap',
		'toolbar-separator': '#toolbar-separator',
		'toolbar-multi-row': '#toolbar-multi-row',

		body: 'div#body'
	}).then(ui => {
		renderIcon(ui);
		renderButton(ui);
		renderDropdown(ui);
		renderToolbar(ui);
	});

	function renderIcon(ui) {
		// --- IconManager ------------------------------------------------------------

		ui.add('body', new _controller2.default(null, new _iconmanagerview2.default(_iconmanagermodel2.default)));

		// --- In-text ------------------------------------------------------------

		ui.add('icon-plain-1', icon('bold'));
		ui.add('icon-plain-2', icon('quote'));

		ui.add('icon-color-1', icon('bold'));
		ui.add('icon-color-2', icon('quote'));

		// --- Availability ------------------------------------------------------------

		_iconmanagermodel2.default.icons.forEach(i => {
			ui.add('icon-availability', icon(i));
			ui.add('icon-availability-color', icon(i));
		});
	}

	function renderButton(ui) {
		// --- States ------------------------------------------------------------

		ui.add('button-states', button({
			label: 'State: normal (none)'
		}));

		ui.add('button-states', button({
			label: 'State: disabled',
			isEnabled: false
		}));

		ui.add('button-states', button({
			label: 'State: on',
			isOn: true
		}));

		// --- Types ------------------------------------------------------------

		const actionButton = button({ label: 'Action button' });
		const roundedButton = button({ label: 'Rounded corners' });
		const boldButton = button({ label: 'Bold text' });

		// TODO: It requires model interface.
		actionButton.view.element.classList.add('ck-button-action');

		// TODO: It requires model interface.
		roundedButton.view.element.classList.add('ck-rounded-corners');

		// TODO: It requires model interface.
		boldButton.view.element.classList.add('ck-button-bold');

		ui.add('button-types', actionButton);
		ui.add('button-types', roundedButton);
		ui.add('button-types', boldButton);

		// --- Icon ------------------------------------------------------------

		_iconmanagermodel2.default.icons.forEach(i => {
			ui.add('button-icon', button({
				label: i,
				icon: i,
				iconAlign: 'LEFT'
			}));
		});

		ui.add('button-icon-custom', button({
			label: 'Icon to the left',
			icon: 'bold',
			iconAlign: 'LEFT'
		}));

		ui.add('button-icon-custom', button({
			label: 'Icon to the right (RTL)',
			icon: 'bold',
			iconAlign: 'RIGHT'
		}));

		const styledButton = button({
			label: 'Button with icon and custom styles',
			icon: 'italic',
			iconAlign: 'LEFT'
		});

		// TODO: It probably requires model interface.
		styledButton.view.element.setAttribute('style', 'border-radius: 100px; border: 0');

		ui.add('button-icon-custom', styledButton);

		ui.add('button-icon-states', button({
			label: 'Disabled',
			icon: 'bold',
			iconAlign: 'LEFT',
			isEnabled: false
		}));

		const notextButton = button({
			label: '',
			icon: 'bold',
			iconAlign: 'LEFT'
		});

		// TODO: It requires model interface.
		notextButton.view.element.classList.add('ck-button-notext');

		ui.add('button-icon-states', notextButton);

		const colChangeButton = button({
			label: 'Icon follows text color',
			icon: 'bold',
			iconAlign: 'LEFT'
		});

		// TODO: It requires model interface.
		colChangeButton.view.element.id = 'icon-color-change';

		ui.add('button-icon-states', colChangeButton);

		// --- Responsive ------------------------------------------------------------

		for (let i = 1; i < 4; i++) {
			ui.add(`button-responsive-${ i }`, button({
				label: 'A button',
				isEnabled: true
			}));

			ui.add(`button-responsive-${ i }`, button({
				label: 'Bold',
				icon: 'bold',
				iconAlign: 'LEFT',
				isEnabled: true
			}));

			const notextButton = button({
				label: '',
				icon: 'link',
				iconAlign: 'LEFT'
			});

			// TODO: It requires model interface.
			notextButton.view.element.classList.add('ck-button-notext');
			notextButton.view.element.classList.add('ck-button-action');

			ui.add(`button-responsive-${ i }`, notextButton);
		}
	}

	function renderDropdown(ui) {
		// --- ListDropdown ------------------------------------------------------------

		const collection = new _collection2.default({ idProperty: 'label' });

		['Arial', 'Tahoma', 'Georgia'].forEach(font => {
			collection.add(new _model2.default({
				label: font,
				style: `font-family: ${ font }`
			}));
		});

		const itemListModel = new _model2.default({
			items: collection
		});

		const enabledModel = new _model2.default({
			label: 'Normal state',
			isEnabled: true,
			isOn: false,
			content: itemListModel
		});

		const disabledModel = new _model2.default({
			label: 'Disabled',
			isEnabled: false,
			isOn: false,
			content: itemListModel
		});

		ui.add('dropdown', new _listdropdown2.default(enabledModel, new _listdropdownview2.default(enabledModel)));
		ui.add('dropdown', new _listdropdown2.default(disabledModel, new _listdropdownview2.default(disabledModel)));
	}

	function renderToolbar(ui) {
		// --- Text ------------------------------------------------------------

		ui.add('toolbar-text', toolbar([icon('bold'), text()]));

		// --- Button ------------------------------------------------------------

		ui.add('toolbar-button', toolbar([button(), text(), button({
			label: 'Button with icon',
			icon: 'bold',
			iconAlign: 'LEFT'
		})]));

		// --- Rounded ------------------------------------------------------------

		ui.add('toolbar-rounded', toolbar([button({
			label: 'A button which corners are also rounded because of toolbar class'
		}), button({
			label: 'Button with icon',
			icon: 'bold',
			iconAlign: 'LEFT'
		})]));

		// --- Wrap ------------------------------------------------------------

		const wrapToolbar = toolbar([button(), button(), button()]);

		wrapToolbar.view.element.style.width = '150px';

		ui.add('toolbar-wrap', wrapToolbar);

		// --- Separator ------------------------------------------------------------

		ui.add('toolbar-separator', toolbar([button(), button(), toolbarSeparator(), button({
			label: 'Link',
			icon: 'link',
			iconAlign: 'LEFT'
		}), toolbarSeparator(), button({
			label: 'Unlink RTL',
			icon: 'unlink',
			iconAlign: 'RIGHT'
		})]));

		// --- Multi row ------------------------------------------------------------

		ui.add('toolbar-multi-row', toolbar([button(), button(), toolbarNewLine(), button({
			label: 'Link',
			icon: 'link',
			iconAlign: 'LEFT'
		}), button({
			label: 'Unlink RTL',
			icon: 'unlink',
			iconAlign: 'RIGHT'
		}), button({
			label: 'Link',
			icon: 'link',
			iconAlign: 'LEFT'
		})]));
	}

	const TextView = class extends _view2.default {
		constructor() {
			super();

			this.element = document.createTextNode('Sample text');
		}
	};

	function text() {
		return new _controller2.default(null, new TextView(null));
	}

	function icon(name) {
		return new _controller2.default(null, new _iconview2.default(new _model2.default({ icon: name })));
	}

	function button({ label = 'Button', isEnabled = true, isOn = false, icon, iconAlign } = {}) {
		const model = new _model2.default({ label, isEnabled, isOn, icon, iconAlign });

		return new _button2.default(model, new _buttonview2.default(model));
	}

	function toolbar(children = []) {
		const toolbar = new _toolbar2.default(null, new _toolbarview2.default(null));

		children.forEach(c => {
			toolbar.add('buttons', c);
		});

		return toolbar;
	}

	const ToolbarSeparatorView = class extends _view2.default {
		constructor() {
			super();

			this.template = {
				tag: 'span',
				attributes: {
					class: 'ck-toolbar-separator'
				}
			};
		}
	};

	function toolbarSeparator() {
		return new _controller2.default(null, new ToolbarSeparatorView(null));
	}

	const ToolbarNewlineView = class extends _view2.default {
		constructor() {
			super();

			this.template = {
				tag: 'span',
				attributes: {
					class: 'ck-toolbar-newline'
				}
			};
		}
	};

	function toolbarNewLine() {
		return new _controller2.default(null, new ToolbarNewlineView(null));
	}
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
