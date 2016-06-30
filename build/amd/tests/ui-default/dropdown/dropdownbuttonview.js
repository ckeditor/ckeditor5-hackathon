define('tests', ['/ckeditor5/ui/dropdown/dropdownbuttonview.js'], function (_dropdownbuttonview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _dropdownbuttonview2 = _interopRequireDefault(_dropdownbuttonview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DropdownButtonView', () => {
		let view;

		beforeEach(() => {
			view = new _dropdownbuttonview2.default(null);
		});

		describe('constructor', () => {
			it('creates element from template', () => {
				expect(view.element.classList.contains('ck-dropdown__button')).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
