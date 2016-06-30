define('tests', ['/ckeditor5/ui/toolbar/toolbar.js', '/ckeditor5/ui/controllercollection.js'], function (_toolbar, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, toolbar */

	'use strict';

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Toolbar', () => {
		let toolbar;

		beforeEach(() => {
			toolbar = new _toolbar2.default();
		});

		describe('constructor', () => {
			it('creates buttons collection', () => {
				expect(toolbar.collections.get('buttons')).to.be.instanceof(_controllercollection2.default);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
