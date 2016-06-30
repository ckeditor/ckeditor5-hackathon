define('tests', ['/ckeditor5/creator-classic/classiceditorui.js', '/ckeditor5/ui/editorui/boxed/boxededitoruiview.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/ckeditor5/creator-classic/classic.js', '/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/count.js'], function (_classiceditorui, _boxededitoruiview, _htmldataprocessor, _classic, _utils, _count) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editor, browser-only */

	'use strict';

	var _classiceditorui2 = _interopRequireDefault(_classiceditorui);

	var _boxededitoruiview2 = _interopRequireDefault(_boxededitoruiview);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _classic2 = _interopRequireDefault(_classic);

	var _utils2 = _interopRequireDefault(_utils);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('ClassicEditor', () => {
		let editor, editorElement;

		beforeEach(() => {
			editorElement = document.createElement('div');
			editorElement.innerHTML = '<p><strong>foo</strong> bar</p>';

			document.body.appendChild(editorElement);
		});

		afterEach(() => {
			editorElement.remove();
		});

		describe('constructor', () => {
			beforeEach(() => {
				editor = new _classic2.default(editorElement);
			});

			it('creates a single div editable root in the view', () => {
				expect(editor.editing.view.getRoot()).to.have.property('name', 'div');
			});

			it('creates a single document root', () => {
				expect((0, _count2.default)(editor.document.rootNames)).to.equal(1);
				expect(editor.document.getRoot()).to.have.property('name', '$root');
			});

			it('creates the UI using BoxedEditorUI classes', () => {
				expect(editor.ui).to.be.instanceof(_classiceditorui2.default);
				expect(editor.ui.view).to.be.instanceof(_boxededitoruiview2.default);
			});

			it('uses HTMLDataProcessor', () => {
				expect(editor.data.processor).to.be.instanceof(_htmldataprocessor2.default);
			});
		});

		describe('create', () => {
			beforeEach(function () {
				return _classic2.default.create(editorElement, {
					features: ['paragraph', 'basic-styles/bold']
				}).then(newEditor => {
					editor = newEditor;
				});
			});

			it('creates an instance which inherits from the ClassicEditor', () => {
				expect(editor).to.be.instanceof(_classic2.default);
			});

			it('inserts editor UI next to editor element', () => {
				expect(editor.ui.view.element.previousSibling).to.equal(editorElement);
			});

			it('attaches editable UI as view\'s DOM root', () => {
				expect(editor.editing.view.getDomRoot()).to.equal(editor.ui.editable.view.element);
			});

			it('loads data from the editor element', () => {
				expect(editor.getData()).to.equal('<p><strong>foo</strong> bar</p>');
			});
		});

		describe('destroy', () => {
			beforeEach(function () {
				return _classic2.default.create(editorElement, { features: ['paragraph'] }).then(newEditor => {
					editor = newEditor;
				});
			});

			it('sets the data back to the editor element', () => {
				editor.setData('<p>foo</p>');

				return editor.destroy().then(() => {
					expect(editorElement.innerHTML).to.equal('<p>foo</p>');
				});
			});

			it('restores the editor element', () => {
				expect(editor.element.style.display).to.equal('none');

				return editor.destroy().then(() => {
					expect(editor.element.style.display).to.equal('');
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
