define('tests', ['/ckeditor5/utils/dom/getdatafromelement.js'], function (_getdatafromelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: dom, browser-only */

	'use strict';

	var _getdatafromelement2 = _interopRequireDefault(_getdatafromelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('getDataFromElement', () => {
		['textarea', 'template', 'div'].forEach(elementName => {
			it('should return the content of a ' + elementName, function () {
				const data = (0, _getdatafromelement2.default)(document.getElementById('getData-' + elementName));
				expect(data).to.equal('<b>foo</b>');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
