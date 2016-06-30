define('tests', ['/ckeditor5/editor/editor.js', '/tests/ckeditor5/_utils/modeltesteditor.js', '/ckeditor5/engine/dataprocessor/htmldataprocessor.js', '/tests/engine/_utils/model.js', '/tests/ckeditor5/_utils/utils.js'], function (_editor, _modeltesteditor, _htmldataprocessor, _model, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _editor2 = _interopRequireDefault(_editor);

	var _modeltesteditor2 = _interopRequireDefault(_modeltesteditor);

	var _htmldataprocessor2 = _interopRequireDefault(_htmldataprocessor);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('ModelTestEditor', () => {
		describe('constructor', () => {
			it('creates an instance of editor', () => {
				const editor = new _modeltesteditor2.default({ foo: 1 });

				expect(editor).to.be.instanceof(_editor2.default);

				expect(editor.config.get('foo')).to.equal(1);
			});

			it('creates model and view roots', () => {
				const editor = new _modeltesteditor2.default({ foo: 1 });

				expect(editor.document.getRoot()).to.have.property('name', '$root');
				expect(editor.data.processor).to.be.instanceof(_htmldataprocessor2.default);
			});
		});

		describe('create', () => {
			it('creates an instance of editor', () => {
				return _modeltesteditor2.default.create({ foo: 1 }).then(editor => {
					expect(editor).to.be.instanceof(_modeltesteditor2.default);

					expect(editor.config.get('foo')).to.equal(1);
				});
			});
		});

		describe('setData', () => {
			let editor;

			beforeEach(() => {
				return _modeltesteditor2.default.create().then(newEditor => {
					editor = newEditor;

					editor.document.schema.allow({ name: '$text', inside: '$root' });
				});
			});

			it('should set data of the first root', () => {
				editor.document.createRoot('secondRoot');

				editor.setData('foo');

				expect((0, _model.getData)(editor.document, { rootName: 'main', withoutSelection: true })).to.equal('foo');
			});
		});

		describe('getData', () => {
			let editor;

			beforeEach(() => {
				return _modeltesteditor2.default.create().then(newEditor => {
					editor = newEditor;

					editor.document.schema.allow({ name: '$text', inside: '$root' });
				});
			});

			it('should set data of the first root', () => {
				(0, _model.setData)(editor.document, 'foo');

				expect(editor.getData()).to.equal('foo');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
