define('tests', ['/ckeditor5/editor/editor.js', '/ckeditor5/ui/editorui/boxed/boxededitorui.js', '/ckeditor5/ui/controllercollection.js'], function (_editor, _boxededitorui, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _editor2 = _interopRequireDefault(_editor);

	var _boxededitorui2 = _interopRequireDefault(_boxededitorui);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('BoxedEditorUI', () => {
		let editor, boxedEditorUI;

		beforeEach(() => {
			editor = new _editor2.default(null, {
				ui: {
					width: 100,
					height: 200
				}
			});
			boxedEditorUI = new _boxededitorui2.default(editor);
		});

		describe('constructor', () => {
			it('adds controller collections', () => {
				expect(boxedEditorUI.collections.get('top')).to.be.instanceof(_controllercollection2.default);
				expect(boxedEditorUI.collections.get('main')).to.be.instanceof(_controllercollection2.default);
			});

			it('sets "width" and "height" attributes', () => {
				expect(boxedEditorUI.width).to.equal(editor.config.get('ui.width'));
				expect(boxedEditorUI.height).to.equal(editor.config.get('ui.height'));
			});
		});

		describe('viewModel', () => {
			it('points to the BoxedEditorUI instance', () => {
				expect(boxedEditorUI.viewModel).to.equal(boxedEditorUI);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
