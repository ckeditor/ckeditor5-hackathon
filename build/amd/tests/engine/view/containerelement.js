define('tests', ['/ckeditor5/engine/view/containerelement.js', '/ckeditor5/engine/view/element.js', '/tests/engine/_utils/view.js'], function (_containerelement, _element, _view) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, browser-only */

	'use strict';

	var _containerelement2 = _interopRequireDefault(_containerelement);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ContainerElement', () => {
		describe('constructor', () => {
			it('should create element with default priority', () => {
				const el = new _containerelement2.default('p');

				expect(el).to.be.an.instanceof(_containerelement2.default);
				expect(el).to.be.an.instanceof(_element2.default);
				expect(el).to.have.property('name').that.equals('p');
			});
		});

		describe('getFillerOffset', () => {
			it('should return position 0 if element is empty', () => {
				expect((0, _view.parse)('<container:p></container:p>').getFillerOffset()).to.equals(0);
			});

			it('should return null if element is not empty', () => {
				expect((0, _view.parse)('<container:p>foo</container:p>').getFillerOffset()).to.be.null;
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
