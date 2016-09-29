define('tests', ['/ckeditor5/engine/model/delta/basic-deltas.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/batch.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/operation/operation.js', '/ckeditor5/utils/ckeditorerror.js'], function (_basicDeltas, _document, _batch, _delta, _operation, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _basicDeltas2 = _interopRequireDefault(_basicDeltas);

	var _document2 = _interopRequireDefault(_document);

	var _batch2 = _interopRequireDefault(_batch);

	var _delta2 = _interopRequireDefault(_delta);

	var _operation2 = _interopRequireDefault(_operation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// jshint ignore:line

	describe('Batch', () => {
		it('should have registered basic methods', () => {
			const batch = new _batch2.default(new _document2.default());

			expect(batch.setAttr).to.be.a('function');
			expect(batch.removeAttr).to.be.a('function');
		});

		describe('register', () => {
			afterEach(() => {
				delete _batch2.default.prototype.foo;
			});

			it('should register function to the batch prototype', () => {
				const spy = sinon.spy();

				(0, _batch.register)('foo', spy);

				const batch = new _batch2.default(new _document2.default());

				batch.foo();

				expect(spy.calledOnce).to.be.true;
			});

			it('should throw if one try to register the same batch twice', () => {
				(0, _batch.register)('foo', () => {});

				expect(() => {
					(0, _batch.register)('foo', () => {});
				}).to.throw(_ckeditorerror2.default, /^batch-register-taken/);
			});
		});

		describe('addDelta', () => {
			it('should add delta to the batch', () => {
				const batch = new _batch2.default(new _document2.default());
				const deltaA = new _delta2.default();
				const deltaB = new _delta2.default();
				batch.addDelta(deltaA);
				batch.addDelta(deltaB);

				expect(batch.deltas.length).to.equal(2);
				expect(batch.deltas[0]).to.equal(deltaA);
				expect(batch.deltas[1]).to.equal(deltaB);
			});
		});

		describe('getOperations', () => {
			it('should return collection of operations from all deltas', () => {
				const doc = new _document2.default();
				const batch = new _batch2.default(doc);
				const deltaA = new _delta2.default();
				const deltaB = new _delta2.default();
				const ops = [new _operation2.default(doc.version), new _operation2.default(doc.version + 1), new _operation2.default(doc.version + 2)];

				batch.addDelta(deltaA);
				deltaA.addOperation(ops[0]);
				batch.addDelta(deltaB);
				deltaA.addOperation(ops[1]);
				deltaA.addOperation(ops[2]);

				expect(Array.from(batch.getOperations())).to.deep.equal(ops);
				expect(batch.getOperations()).to.have.property('next');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
