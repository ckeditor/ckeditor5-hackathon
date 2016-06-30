define('tests', ['/ckeditor5/typing/changebuffer.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/batch.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/delta/insertdelta.js', '/ckeditor5/engine/model/operation/insertoperation.js'], function (_changebuffer, _document, _batch, _position, _insertdelta, _insertoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _changebuffer2 = _interopRequireDefault(_changebuffer);

	var _document2 = _interopRequireDefault(_document);

	var _batch2 = _interopRequireDefault(_batch);

	var _position2 = _interopRequireDefault(_position);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ChangeBuffer', () => {
		const CHANGE_LIMIT = 3;
		let doc, buffer, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('main');
			buffer = new _changebuffer2.default(doc, CHANGE_LIMIT);
		});

		describe('constructor', () => {
			it('sets all properties', () => {
				expect(buffer).to.have.property('document', doc);
				expect(buffer).to.have.property('limit', CHANGE_LIMIT);
				expect(buffer).to.have.property('size', 0);
			});
		});

		describe('batch', () => {
			it('it is set initially', () => {
				expect(buffer).to.have.property('batch');
				expect(buffer.batch).to.be.instanceof(_batch2.default);
			});

			it('is reset once changes reaches the limit', () => {
				const batch1 = buffer.batch;

				buffer.input(CHANGE_LIMIT - 1);

				expect(buffer.batch).to.equal(batch1);

				buffer.input(1);

				const batch2 = buffer.batch;

				expect(batch2).to.be.instanceof(_batch2.default);
				expect(batch2).to.not.equal(batch1);
				expect(buffer.size).to.equal(0);
			});

			it('is reset once changes exceedes the limit', () => {
				const batch1 = buffer.batch;

				// Exceed the limit with one big jump to ensure that >= operator was used.
				buffer.input(CHANGE_LIMIT + 1);

				expect(buffer.batch).to.not.equal(batch1);
				expect(buffer.size).to.equal(0);
			});

			it('is reset once a new batch appears in the document', () => {
				const batch1 = buffer.batch;

				// Ensure that size is reset too.
				buffer.input(1);

				doc.batch().insert(_position2.default.createAt(root, 0), 'a');

				expect(buffer.batch).to.not.equal(batch1);
				expect(buffer.size).to.equal(0);
			});

			it('is not reset when changes are added to the buffer\'s batch', () => {
				const batch1 = buffer.batch;

				buffer.batch.insert(_position2.default.createAt(root, 0), 'a');
				expect(buffer.batch).to.equal(batch1);

				buffer.batch.insert(_position2.default.createAt(root, 0), 'b');
				expect(buffer.batch).to.equal(batch1);
			});

			it('is not reset when changes are added to batch which existed previously', () => {
				const externalBatch = doc.batch();

				externalBatch.insert(_position2.default.createAt(root, 0), 'a');

				const bufferBatch = buffer.batch;

				buffer.batch.insert(_position2.default.createAt(root, 0), 'b');
				expect(buffer.batch).to.equal(bufferBatch);

				doc.batch().insert(_position2.default.createAt(root, 0), 'c');
				expect(buffer.batch).to.not.equal(bufferBatch);
			});

			// See #7.
			it('is not reset when changes are applied without a batch', () => {
				const bufferBatch = buffer.batch;

				const delta = new _insertdelta2.default();
				const insert = new _insertoperation2.default(_position2.default.createAt(root, 0), 'a', doc.version);

				delta.addOperation(insert);
				doc.applyOperation(insert);

				expect(buffer.batch).to.equal(bufferBatch);
			});
		});

		describe('destory', () => {
			it('offs the buffer from the document', () => {
				const batch1 = buffer.batch;

				buffer.destroy();

				doc.batch().insert(_position2.default.createAt(root, 0), 'a');

				expect(buffer.batch).to.equal(batch1);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
