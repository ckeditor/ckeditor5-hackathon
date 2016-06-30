define('tests', ['/ckeditor5/ui/editableui/editableuiview.js', '/ckeditor5/ui/model.js', '/ckeditor5/utils/locale.js'], function (_editableuiview, _model, _locale) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editable */

	'use strict';

	var _editableuiview2 = _interopRequireDefault(_editableuiview);

	var _model2 = _interopRequireDefault(_model);

	var _locale2 = _interopRequireDefault(_locale);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('EditableUIView', () => {
		let model, view, editableElement, locale;

		beforeEach(() => {
			model = new _model2.default({ isReadOnly: false, isFocused: false });
			locale = new _locale2.default('en');
			view = new _editableuiview2.default(model, locale);
			editableElement = document.createElement('div');

			view.init();
		});

		describe('constructor', () => {
			it('renders element from template when no editableElement', () => {
				view = new _editableuiview2.default(model, locale);
				view.init();

				expect(view.element).to.equal(view.editableElement);
				expect(view.element.classList.contains('ck-editor__editable')).to.be.true;
			});

			it('accepts editableElement as an argument', () => {
				view = new _editableuiview2.default(model, locale, editableElement);
				view.init();

				expect(view.element).to.equal(editableElement);
				expect(view.element).to.equal(view.editableElement);
				expect(view.element.classList.contains('ck-editor__editable')).to.be.true;
			});
		});

		describe('View bindings', () => {
			describe('class', () => {
				it('has initial value set', () => {
					expect(view.element.classList.contains('ck-blurred')).to.be.true;
					expect(view.element.classList.contains('ck-focused')).to.be.false;
				});

				it('reacts on model.isFocused', () => {
					model.isFocused = true;

					expect(view.element.classList.contains('ck-blurred')).to.be.false;
					expect(view.element.classList.contains('ck-focused')).to.be.true;
				});
			});

			describe('contenteditable', () => {
				it('has initial value set', () => {
					expect(view.element.getAttribute('contenteditable')).to.equal('true');
				});

				it('reacts on model.isReadOnly', () => {
					model.isReadOnly = true;

					expect(view.element.getAttribute('contenteditable')).to.equal('false');
				});
			});
		});

		describe('destroy', () => {
			it('updates contentEditable property of editableElement', () => {
				view = new _editableuiview2.default(model, locale, editableElement);
				view.init();

				expect(view.editableElement.contentEditable).to.equal('true');

				view.destroy();

				expect(view.editableElement.contentEditable).to.equal('false');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
