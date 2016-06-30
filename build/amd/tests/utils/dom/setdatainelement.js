define('tests', ['/ckeditor5/utils/dom/setdatainelement.js', '/ckeditor5/utils/dom/getdatafromelement.js'], function (_setdatainelement, _getdatafromelement) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: dom, browser-only */

	'use strict';

	var _setdatainelement2 = _interopRequireDefault(_setdatainelement);

	var _getdatafromelement2 = _interopRequireDefault(_getdatafromelement);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('setDataInElement', () => {
		['textarea', 'template', 'div'].forEach(elementName => {
			it('should set the content of a ' + elementName, () => {
				const el = document.createElement(elementName);
				const expectedData = '<b>foo</b>';

				(0, _setdatainelement2.default)(el, expectedData);

				const actualData = (0, _getdatafromelement2.default)(el);
				expect(actualData).to.equal(expectedData);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
