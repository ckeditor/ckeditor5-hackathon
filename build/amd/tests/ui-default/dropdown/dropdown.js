define('tests', ['/ckeditor5/ui/dropdown/dropdown.js', '/ckeditor5/ui/model.js', '/ckeditor5/ui/button/button.js', '/ckeditor5/ui/dropdown/dropdownbuttonview.js', '/ckeditor5/ui/dropdown/dropdownpanel.js', '/ckeditor5/ui/dropdown/dropdownpanelview.js'], function (_dropdown, _model, _button, _dropdownbuttonview, _dropdownpanel, _dropdownpanelview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _dropdown2 = _interopRequireDefault(_dropdown);

	var _model2 = _interopRequireDefault(_model);

	var _button2 = _interopRequireDefault(_button);

	var _dropdownbuttonview2 = _interopRequireDefault(_dropdownbuttonview);

	var _dropdownpanel2 = _interopRequireDefault(_dropdownpanel);

	var _dropdownpanelview2 = _interopRequireDefault(_dropdownpanelview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Dropdown', () => {
		let model, dropdown;

		beforeEach(() => {
			model = new _model2.default({
				isEnabled: true,
				isOn: false
			});
			dropdown = new _dropdown2.default(model);
		});

		describe('constructor', () => {
			it('creates dropdown button', () => {
				expect(dropdown.button).to.be.instanceof(_button2.default);
				expect(dropdown.button.view).to.be.instanceof(_dropdownbuttonview2.default);
			});

			it('creates dropdown panel', () => {
				expect(dropdown.panel).to.be.instanceof(_dropdownpanel2.default);
				expect(dropdown.panel.view).to.be.instanceof(_dropdownpanelview2.default);
			});

			it('appends button and panel to dropdown collection', () => {
				expect(dropdown.collections.get('main')).to.have.length(2);
				expect(dropdown.collections.get('main').get(0)).to.equal(dropdown.button);
				expect(dropdown.collections.get('main').get(1)).to.equal(dropdown.panel);
			});

			it('listens on model#execute and changes model#isOn', () => {
				model.fire('execute');
				expect(model.isOn).to.be.true;

				model.fire('execute');
				expect(model.isOn).to.be.false;

				model.isEnabled = false;

				model.fire('execute');
				expect(model.isOn).to.be.false;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
