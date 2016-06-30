define('tests', ['/ckeditor5/creator-classic/classiceditorui.js', '/ckeditor5/ui/editorui/boxed/boxededitoruiview.js', '/ckeditor5/ui/toolbar/toolbar.js', '/ckeditor5/ui/stickytoolbar/stickytoolbarview.js', '/ckeditor5/ui/editableui/editableui.js', '/ckeditor5/ui/editableui/inline/inlineeditableuiview.js', '/tests/ckeditor5/_utils/classictesteditor.js'], function (_classiceditorui, _boxededitoruiview, _toolbar, _stickytoolbarview, _editableui, _inlineeditableuiview, _classictesteditor) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editor, browser-only */

	'use strict';

	var _classiceditorui2 = _interopRequireDefault(_classiceditorui);

	var _boxededitoruiview2 = _interopRequireDefault(_boxededitoruiview);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _stickytoolbarview2 = _interopRequireDefault(_stickytoolbarview);

	var _editableui2 = _interopRequireDefault(_editableui);

	var _inlineeditableuiview2 = _interopRequireDefault(_inlineeditableuiview);

	var _classictesteditor2 = _interopRequireDefault(_classictesteditor);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ClassicEditorUI', () => {
		let editorElement, editor, editorUI;

		beforeEach(() => {
			editorElement = document.createElement('div');
			document.body.appendChild(editorElement);

			editor = new _classictesteditor2.default(editorElement);
			editorUI = new _classiceditorui2.default(editor);
			editorUI.view = new _boxededitoruiview2.default(editorUI.viewModel, editor.locale);
		});

		describe('constructor', () => {
			it('creates toolbar', () => {
				expect(editorUI.toolbar).to.be.instanceof(_toolbar2.default);
				expect(editorUI.toolbar.view).to.be.instanceof(_stickytoolbarview2.default);
			});

			it('creates editable', () => {
				expect(editorUI.editable).to.be.instanceof(_editableui2.default);
				expect(editorUI.editable.view).to.be.instanceof(_inlineeditableuiview2.default);
			});
		});

		describe('editableElement', () => {
			it('returns editable\'s view element', () => {
				document.body.appendChild(editorUI.view.element);

				return editorUI.init().then(() => {
					expect(editorUI.editableElement.getAttribute('contentEditable')).to.equal('true');
				});
			});
		});

		describe('init', () => {
			it('adds buttons', () => {
				editor.config.set('toolbar', ['foo', 'bar']);

				document.body.appendChild(editorUI.view.element);

				const spy = sinon.stub(editorUI.toolbar, 'addButtons');

				return editorUI.init().then(() => {
					expect(spy.calledOnce).to.be.true;
					expect(spy.args[0][0]).to.deep.equal(['foo', 'bar']);
				});
			});

			it('returns a promise', () => {
				document.body.appendChild(editorUI.view.element);

				expect(editorUI.init()).to.be.instanceof(Promise);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
