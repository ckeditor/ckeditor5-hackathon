define('tests', ['/ckeditor5/creator-classic/classic.js', '/ckeditor5/hackathon/link.js', '/ckeditor5/hackathon/texttransformator.js'], function (_classic, _link, _texttransformator) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  var _classic2 = _interopRequireDefault(_classic);

  var _link2 = _interopRequireDefault(_link);

  var _texttransformator2 = _interopRequireDefault(_texttransformator);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // import AutoLinker from '/ckeditor5/hackathon/autolinker.js';

  _classic2.default.create(document.querySelector('#editor'), {
    features: ['delete', 'enter', 'typing', 'paragraph', 'undo', _link2.default, _texttransformator2.default],
    /* AutoLinker */toolbar: ['undo', 'redo']
  });
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
