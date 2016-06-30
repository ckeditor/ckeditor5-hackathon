define('tests', ['/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/operation/operation.js', '/tests/engine/model/_utils/utils.js'], function (_delta, _operation, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _delta2 = _interopRequireDefault(_delta);

	var _operation2 = _interopRequireDefault(_operation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Operation', () => {
		it('should save its base version', () => {
			let op = new _operation2.default(4);

			expect(op.baseVersion).to.equal(4);
		});

		it('should be correctly transformed to JSON', () => {
			let delta = new _delta2.default();
			let opInDelta = new _operation2.default(0);
			delta.addOperation(opInDelta);

			let opOutsideDelta = new _operation2.default(0);

			let parsedOutside = (0, _utils.jsonParseStringify)(opOutsideDelta);

			expect(parsedOutside.delta).to.be.undefined;
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const op = new _operation2.default(4);

				const serialized = (0, _utils.jsonParseStringify)(op);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.Operation',
					baseVersion: 4
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper Operation from json object', () => {
				const op = new _operation2.default(4);

				const serialized = (0, _utils.jsonParseStringify)(op);
				const deserialized = _operation2.default.fromJSON(serialized);

				expect(deserialized).to.deep.equal(op);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
