define('tests', ['/ckeditor5/load.js'], function (_load) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('load()', () => {
		it('loads plugin.js', () => {
			return (0, _load2.default)('ckeditor5/plugin.js').then(PluginModule => {
				expect(PluginModule.default).to.be.a('function');
			});
		});

		it('loads ckeditor5/editor/editor.js', () => {
			return (0, _load2.default)('ckeditor5/editor/editor.js').then(EditorModule => {
				expect(EditorModule.default).to.be.a('function');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
