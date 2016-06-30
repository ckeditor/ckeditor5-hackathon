define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/operation/nooperation.js', '/tests/engine/model/_utils/utils.js'], function (_document, _nooperation, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('NoOperation', () => {
		let noop, doc, root;

		beforeEach(() => {
			noop = new _nooperation2.default(0);
			doc = new _document2.default();
			root = doc.createRoot('root');
		});

		it('should not throw an error when applied', () => {
			expect(() => doc.applyOperation(noop)).to.not.throw(Error);
		});

		it('should create a NoOperation as a reverse', () => {
			const reverse = noop.getReversed();

			expect(reverse).to.be.an.instanceof(_nooperation2.default);
			expect(reverse.baseVersion).to.equal(1);
		});

		it('should create a do-nothing operation having same parameters when cloned', () => {
			const clone = noop.clone();

			expect(clone).to.be.an.instanceof(_nooperation2.default);
			expect(clone.baseVersion).to.equal(0);
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const serialized = (0, _utils.jsonParseStringify)(noop);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.NoOperation',
					baseVersion: 0
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper NoOperation from json object', () => {
				const serialized = (0, _utils.jsonParseStringify)(noop);
				const deserialized = _nooperation2.default.fromJSON(serialized, doc);

				expect(deserialized).to.deep.equal(noop);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
