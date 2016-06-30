define('tests', ['/ckeditor5/ui/editorui/editoruiview.js', '/ckeditor5/ui/model.js'], function (_editoruiview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _editoruiview2 = _interopRequireDefault(_editoruiview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EditorUIView', () => {
		let editorUIView;

		beforeEach(() => {
			editorUIView = new _editoruiview2.default(new _model2.default());

			return editorUIView.init();
		});

		describe('constructor', () => {
			it('creates the body region', () => {
				const el = editorUIView.regions.get('body').element;

				expect(el.parentNode).to.equal(document.body);
				expect(el.nextSibling).to.be.null;
			});
		});

		describe('destroy', () => {
			it('removes the body region container', () => {
				const el = editorUIView.regions.get('body').element;

				editorUIView.destroy();

				expect(el.parentNode).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
