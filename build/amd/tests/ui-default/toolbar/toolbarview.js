define('tests', ['/ckeditor5/ui/toolbar/toolbarview.js', '/ckeditor5/ui/model.js'], function (_toolbarview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, toolbar */

	'use strict';

	var _toolbarview2 = _interopRequireDefault(_toolbarview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ToolbarView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default();
			view = new _toolbarview2.default(model);

			return view.init();
		});

		describe('the main element bindings', () => {
			it('is fine', () => {
				expect(view.element.classList.contains('ck-toolbar'));
			});
		});

		describe('buttons region', () => {
			it('is bound to the main element', () => {
				expect(view.regions.get('buttons').element).to.equal(view.element);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
