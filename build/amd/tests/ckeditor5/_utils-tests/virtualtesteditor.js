define('tests', ['/ckeditor5/editor/standardeditor.js', '/tests/ckeditor5/_utils/virtualtesteditor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/tests/ckeditor5/_utils/utils.js'], function (_standardeditor, _virtualtesteditor, _htmldataprocessor, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _standardeditor2 = _interopRequireDefault(_standardeditor);

	var _virtualtesteditor2 = _interopRequireDefault(_virtualtesteditor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('VirtualTestEditor', () => {
		describe('constructor', () => {
			it('creates an instance of editor', () => {
				const editor = new _virtualtesteditor2.default({ foo: 1 });

				expect(editor).to.be.instanceof(_standardeditor2.default);

				expect(editor.config.get('foo')).to.equal(1);
			});

			it('creates model and view roots', () => {
				const editor = new _virtualtesteditor2.default({ foo: 1 });

				expect(editor.document.getRoot()).to.have.property('name', '$root');
				expect(editor.editing.view.getRoot()).to.have.property('name', 'div');
				expect(editor.data.processor).to.be.instanceof(_htmldataprocessor2.default);
			});
		});

		describe('create', () => {
			it('creates an instance of editor', () => {
				return _virtualtesteditor2.default.create({ foo: 1 }).then(editor => {
					expect(editor).to.be.instanceof(_virtualtesteditor2.default);

					expect(editor.config.get('foo')).to.equal(1);
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
