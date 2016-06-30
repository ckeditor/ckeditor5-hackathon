define('tests', ['/ckeditor5/engine/view/document.js', '/ckeditor5/engine/view/observer/keyobserver.js'], function (_document, _keyobserver) {
  /**
   * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  /* global console:false */

  'use strict';

  var _document2 = _interopRequireDefault(_document);

  var _keyobserver2 = _interopRequireDefault(_keyobserver);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const viewDocument = new _document2.default();

  viewDocument.on('keydown', (evt, data) => console.log('keydown', data));

  viewDocument.addObserver(_keyobserver2.default);

  viewDocument.createRoot(document.getElementById('editable'), 'editable');
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
