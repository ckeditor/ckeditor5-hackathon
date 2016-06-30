define('tests', ['/ckeditor5/editor/standardeditor.js', '/ckeditor5/ui/editableui/editableui.js', '/ckeditor5/ui/model.js', '/tests/utils/_utils/utils.js'], function (_standardeditor, _editableui, _model, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editable */

	'use strict';

	var _standardeditor2 = _interopRequireDefault(_standardeditor);

	var _editableui2 = _interopRequireDefault(_editableui);

	var _model2 = _interopRequireDefault(_model);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EditableUI', () => {
		let editable, editableUI, editor;

		beforeEach(() => {
			editor = new _standardeditor2.default();
			editable = editor.editing.view.createRoot(document.createElement('div'));
			editableUI = new _editableui2.default(editor, editable);
		});

		describe('constructor', () => {
			it('sets all properties', () => {
				expect(editableUI.editor).to.equal(editor);
				expect(editableUI.viewModel).to.be.instanceof(_model2.default);
			});
		});

		describe('viewModel', () => {
			it('constains observable attributes', () => {
				expect(editableUI.viewModel).to.have.property('isReadOnly', false);
				expect(editableUI.viewModel).to.have.property('isFocused', false);
			});

			it('binds isFocused to editable.isFocused', () => {
				_utils2.default.assertBinding(editableUI.viewModel, { isFocused: false }, [[editable, { isFocused: true }]], { isFocused: true });
			});

			it('binds isReadOnly to editable.isReadOnly', () => {
				_utils2.default.assertBinding(editableUI.viewModel, { isReadOnly: false }, [[editable, { isReadOnly: true }]], { isReadOnly: true });
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
