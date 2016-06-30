define('tests', ['/ckeditor5/ui/editorui/boxed/boxededitoruiview.js', '/ckeditor5/ui/model.js', '/ckeditor5/utils/locale.js'], function (_boxededitoruiview, _model, _locale) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _boxededitoruiview2 = _interopRequireDefault(_boxededitoruiview);

	var _model2 = _interopRequireDefault(_model);

	var _locale2 = _interopRequireDefault(_locale);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('BoxedEditorUIView', () => {
		let boxedEditorUIView, element, topRegionEl, mainRegionEl;

		beforeEach(() => {
			boxedEditorUIView = new _boxededitoruiview2.default(new _model2.default(), new _locale2.default('en'));
			boxedEditorUIView.init();

			element = boxedEditorUIView.element;

			const regions = boxedEditorUIView.regions;
			topRegionEl = regions.get('top').element;
			mainRegionEl = regions.get('main').element;
		});

		describe('constructor', () => {
			it('creates the regions', () => {
				expect(topRegionEl.parentNode).to.equal(boxedEditorUIView.element);
				expect(mainRegionEl.parentNode).to.equal(boxedEditorUIView.element);
			});

			it('bootstraps the view element from template', () => {
				expect(boxedEditorUIView.element.classList.contains('ck-editor')).to.be.true;
			});

			it('setups accessibility of the view element', () => {
				expect(element.attributes.getNamedItem('aria-labelledby').value).to.equal(boxedEditorUIView.element.firstChild.id);
				expect(element.attributes.getNamedItem('role').value).to.equal('application');
				expect(element.attributes.getNamedItem('lang').value).to.equal('en');
			});

			it('bootstraps the view region elements from template', () => {
				expect(topRegionEl.classList.contains('ck-editor__top')).to.be.true;
				expect(mainRegionEl.classList.contains('ck-editor__main')).to.be.true;
			});

			it('setups accessibility of the view region elements', () => {
				expect(topRegionEl.attributes.getNamedItem('role').value).to.equal('presentation');
				expect(mainRegionEl.attributes.getNamedItem('role').value).to.equal('presentation');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
