define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/rootelement.js'], function (_document, _element, _rootelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _rootelement2 = _interopRequireDefault(_rootelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Element', () => {
		describe('constructor', () => {
			it('should create root element without attributes', () => {
				let doc = new _document2.default();
				let root = new _rootelement2.default(doc);

				expect(root).to.be.an.instanceof(_element2.default);
				expect(root).to.have.property('document').that.equals(doc);
				expect(root._attrs.size).to.equal(0);
				expect(root.getChildCount()).to.equal(0);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
