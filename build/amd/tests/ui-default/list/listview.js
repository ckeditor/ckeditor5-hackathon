define('tests', ['/ckeditor5/ui/list/listview.js'], function (_listview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, list */

	'use strict';

	var _listview2 = _interopRequireDefault(_listview);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ListView', () => {
		let view;

		beforeEach(() => {
			view = new _listview2.default();
		});

		describe('constructor', () => {
			it('registers "list" region', () => {
				expect(view.regions).to.have.length(1);
				expect(view.regions.get(0).name).to.be.equal('list');

				view.init();

				expect(view.regions.get(0).element).to.equal(view.element);
			});

			it('creates element from template', () => {
				expect(view.element.classList.contains('ck-reset')).to.be.true;
				expect(view.element.classList.contains('ck-list')).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
