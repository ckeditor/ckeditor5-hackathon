define('tests', ['/ckeditor5/engine/view/domconverter.js', '/ckeditor5/engine/view/filler.js'], function (_domconverter, _filler) {
	/**
  * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: view, domconverter */

	'use strict';

	var _domconverter2 = _interopRequireDefault(_domconverter);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('DomConverter', () => {
		let converter;

		before(() => {
			converter = new _domconverter2.default();
		});

		describe('constructor', () => {
			it('should create converter with BR block filler by default', () => {
				converter = new _domconverter2.default();
				expect(converter.blockFiller).to.equal(_filler.BR_FILLER);
			});

			it('should create converter with defined block filler', () => {
				converter = new _domconverter2.default({ blockFiller: _filler.NBSP_FILLER });
				expect(converter.blockFiller).to.equal(_filler.NBSP_FILLER);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
