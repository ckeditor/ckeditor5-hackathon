define('tests', ['/tests/engine/view/_utils/createdocumentmock.js'], function (_createdocumentmock) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view */

	'use strict';

	var _createdocumentmock2 = _interopRequireDefault(_createdocumentmock);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('createDocumentMock', () => {
		it('should create document mock', done => {
			const docMock = (0, _createdocumentmock2.default)();
			const rootMock = {};

			docMock.on('change:focusedEditable', (evt, key, value) => {
				expect(value).to.equal(rootMock);
				done();
			});

			docMock.focusedEditable = rootMock;
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
