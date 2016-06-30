define('tests', ['/ckeditor5/plugin.js', '/ckeditor5/editor/editor.js'], function (_plugin, _editor) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _plugin2 = _interopRequireDefault(_plugin);

	var _editor2 = _interopRequireDefault(_editor);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	let editor;

	before(() => {
		editor = new _editor2.default();
	});

	describe('constructor', () => {
		it('should set the `editor` property', () => {
			let plugin = new _plugin2.default(editor);

			expect(plugin).to.have.property('editor').to.equal(editor);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
