define(['exports', '../controller.js', '../button/button.js', '../controllercollection.js', './dropdownbuttonview.js', './dropdownpanel.js', './dropdownpanelview.js'], function (exports, _controller, _button, _controllercollection, _dropdownbuttonview, _dropdownpanel, _dropdownpanelview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _controller2 = _interopRequireDefault(_controller);

	var _button2 = _interopRequireDefault(_button);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _dropdownbuttonview2 = _interopRequireDefault(_dropdownbuttonview);

	var _dropdownpanel2 = _interopRequireDefault(_dropdownpanel);

	var _dropdownpanelview2 = _interopRequireDefault(_dropdownpanelview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The basic dropdown controller class.
  *
  * @memberOf ui.dropdown
  * @extends ui.Controller
  */
	class Dropdown extends _controller2.default {
		/**
   * Creates a Dropdown instance.
   *
   * @param {utils.Observable} model
   * @param {ui.View} view
   */
		constructor(model, view) {
			super(model, view);

			this.collections.add(new _controllercollection2.default('main'));

			/**
    * Button of this Dropdown.
    *
    * @readonly
    * @member {ui.button.Button} ui.dropdown.Dropdown#button
    */
			this.button = new _button2.default(model, new _dropdownbuttonview2.default(model));

			/**
    * Panel of this Dropdown.
    *
    * @readonly
    * @member {ui.dropdown.DropdownPanel} ui.dropdown.Dropdown#panel
    */
			this.panel = new _dropdownpanel2.default(model, new _dropdownpanelview2.default(model));

			// Execute event comes from the button.
			this.listenTo(model, 'execute', () => {
				if (this.model.isEnabled) {
					this.model.isOn = !this.model.isOn;
				}
			});

			this.add('main', this.button);
			this.add('main', this.panel);
		}
	}

	exports.default = Dropdown;
});