define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/composer/composer.js', '/tests/engine/_utils/model.js'], function (_document, _composer, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, composer */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _composer2 = _interopRequireDefault(_composer);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Composer', () => {
		let document, composer;

		beforeEach(() => {
			document = new _document2.default();
			document.createRoot('main', '$root');

			composer = new _composer2.default();
		});

		describe('constructor', () => {
			it('attaches deleteContents default listener', () => {
				(0, _model.setData)(document, '<p>f<selection>oo</p><p>ba</selection>r</p>');

				const batch = document.batch();

				composer.fire('deleteContents', { batch, selection: document.selection });

				expect((0, _model.getData)(document)).to.equal('<p>f<selection /></p><p>r</p>');
				expect(batch.deltas).to.not.be.empty;
			});

			it('attaches deleteContents default listener which passes options', () => {
				(0, _model.setData)(document, '<p>f<selection>oo</p><p>ba</selection>r</p>');

				const batch = document.batch();

				composer.fire('deleteContents', {
					batch,
					selection: document.selection,
					options: { merge: true }
				});

				expect((0, _model.getData)(document)).to.equal('<p>f<selection />r</p>');
			});

			it('attaches modifySelection default listener', () => {
				(0, _model.setData)(document, '<p>foo<selection />bar</p>');

				composer.fire('modifySelection', {
					selection: document.selection,
					options: {
						direction: 'BACKWARD'
					}
				});

				expect((0, _model.getData)(document)).to.equal('<p>fo<selection backward>o</selection>bar</p>');
			});
		});

		describe('deleteContents', () => {
			it('fires deleteContents event', () => {
				const spy = sinon.spy();
				const batch = document.batch();

				composer.on('deleteContents', spy);

				composer.deleteContents(batch, document.selection);

				const data = spy.args[0][1];

				expect(data.batch).to.equal(batch);
				expect(data.selection).to.equal(document.selection);
			});
		});

		describe('modifySelection', () => {
			it('fires deleteContents event', () => {
				const spy = sinon.spy();
				const opts = { direction: 'backward' };

				composer.on('modifySelection', spy);

				composer.modifySelection(document.selection, opts);

				const data = spy.args[0][1];

				expect(data.selection).to.equal(document.selection);
				expect(data.options).to.equal(opts);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
