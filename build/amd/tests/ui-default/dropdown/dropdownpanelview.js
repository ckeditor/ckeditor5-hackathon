define('tests', ['/ckeditor5/ui/dropdown/dropdownpanelview.js', '/ckeditor5/ui/model.js'], function (_dropdownpanelview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _dropdownpanelview2 = _interopRequireDefault(_dropdownpanelview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DropdownPanelView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default({
				isOn: false
			});

			view = new _dropdownpanelview2.default(model);
		});

		describe('constructor', () => {
			it('registers "content" region', () => {
				expect(view.regions).to.have.length(1);
				expect(view.regions.get(0).name).to.equal('content');

				view.init();

				expect(view.regions.get(0).element).to.equal(view.element);
			});

			it('creates element from template', () => {
				expect(view.element.classList.contains('ck-reset')).to.be.true;
				expect(view.element.classList.contains('ck-dropdown__panel')).to.be.true;
			});
		});

		describe('panel bindings', () => {
			describe('class', () => {
				it('reacts on model.isOn', () => {
					expect(view.element.classList.contains('ck-dropdown__panel-active')).to.be.false;

					model.isOn = true;
					expect(view.element.classList.contains('ck-dropdown__panel-active')).to.be.true;

					model.isOn = false;
					expect(view.element.classList.contains('ck-dropdown__panel-active')).to.be.false;
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
