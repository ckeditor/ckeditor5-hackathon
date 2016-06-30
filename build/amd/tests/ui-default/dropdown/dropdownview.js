define('tests', ['/ckeditor5/ui/dropdown/dropdownview.js', '/ckeditor5/ui/model.js'], function (_dropdownview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _dropdownview2 = _interopRequireDefault(_dropdownview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DropdownView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default({
				isOn: false,
				isEnabled: true
			});

			view = new _dropdownview2.default(model);
		});

		describe('constructor', () => {
			it('registers "dropdown" region', () => {
				expect(view.regions.get(0).name).to.equal('main');

				view.init();

				expect(view.regions.get(0).element).to.equal(view.element);
			});

			it('creates element from template', () => {
				expect(view.element.classList.contains('ck-dropdown')).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
