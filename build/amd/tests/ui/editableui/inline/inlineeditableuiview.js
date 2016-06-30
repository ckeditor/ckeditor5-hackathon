define('tests', ['/ckeditor5/ui/editableui/inline/inlineeditableuiview.js', '/ckeditor5/ui/model.js', '/ckeditor5/utils/locale.js'], function (_inlineeditableuiview, _model, _locale) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: editable */

	'use strict';

	var _inlineeditableuiview2 = _interopRequireDefault(_inlineeditableuiview);

	var _model2 = _interopRequireDefault(_model);

	var _locale2 = _interopRequireDefault(_locale);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('InlineEditableUIView', () => {
		let model, view, editableElement, locale;

		beforeEach(() => {
			model = new _model2.default({ isEditable: true, isFocused: false, name: 'foo' });
			locale = new _locale2.default('en');
			view = new _inlineeditableuiview2.default(model, locale);
			editableElement = document.createElement('div');

			return view.init();
		});

		describe('constructor', () => {
			it('accepts model', () => {
				expect(view.model).to.equal(model);
			});

			it('accepts locale', () => {
				expect(view.locale).to.equal(locale);
			});

			it('accepts editableElement', () => {
				view = new _inlineeditableuiview2.default(model, locale, editableElement);

				expect(view.element).to.equal(editableElement);
			});

			it('creates view#element from template when no editableElement provided', () => {
				expect(view.template).to.be.an('object');
			});
		});

		describe('editableElement', () => {
			const ariaLabel = 'Rich Text Editor, foo';

			it('has proper accessibility role', () => {
				expect(view.element.attributes.getNamedItem('role').value).to.equal('textbox');
			});

			it('has proper ARIA label', () => {
				expect(view.element.getAttribute('aria-label')).to.equal(ariaLabel);
			});

			it('has proper title', () => {
				expect(view.element.getAttribute('title')).to.equal(ariaLabel);
			});

			it('has proper class name', () => {
				expect(view.element.classList.contains('ck-editor__editable')).to.be.true;
				expect(view.element.classList.contains('ck-editor__editable_inline')).to.be.true;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
