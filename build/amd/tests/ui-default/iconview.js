define('tests', ['/ckeditor5/ui/icon/iconview.js', '/ckeditor5/ui/model.js'], function (_iconview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, icon */

	'use strict';

	var _iconview2 = _interopRequireDefault(_iconview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('IconView', () => {
		let model, view;

		beforeEach(() => {
			model = new _model2.default({
				icon: 'foo',
				align: undefined
			});
			view = new _iconview2.default(model);
		});

		describe('constructor', () => {
			it('creates element from template', () => {
				expect(view.element.tagName).to.be.equal('svg');
				expect(view.element.getAttribute('class')).to.be.equal('ck-icon');
			});
		});

		describe('<svg> bindings', () => {
			describe('xlink:href', () => {
				it('reacts to model.icon', () => {
					const svgUseElement = view.element.firstChild;
					const svgHrefNs = 'http://www.w3.org/1999/xlink';

					expect(svgUseElement.getAttributeNS(svgHrefNs, 'href')).to.be.equal('#ck-icon-foo');

					model.icon = 'abc';

					expect(svgUseElement.getAttributeNS(svgHrefNs, 'href')).to.be.equal('#ck-icon-abc');
				});

				it('reacts to model.align', () => {
					expect(view.element.getAttribute('class')).to.be.equal('ck-icon');

					model.align = 'RIGHT';

					expect(view.element.classList.contains('ck-icon-right')).to.be.true;
					expect(view.element.classList.contains('ck-icon-left')).to.be.false;

					model.align = 'LEFT';

					expect(view.element.classList.contains('ck-icon-right')).to.be.false;
					expect(view.element.classList.contains('ck-icon-left')).to.be.true;
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
