define('tests', ['/ckeditor5/ui/dropdown/dropdownpanel.js', '/ckeditor5/ui/controllercollection.js'], function (_dropdownpanel, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, dropdown */

	'use strict';

	var _dropdownpanel2 = _interopRequireDefault(_dropdownpanel);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DropdownPanel', () => {
		let panel;

		beforeEach(() => {
			panel = new _dropdownpanel2.default(null);
		});

		describe('constructor', () => {
			it('creates "content" collection', () => {
				expect(panel.collections.get('content')).to.be.instanceof(_controllercollection2.default);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
