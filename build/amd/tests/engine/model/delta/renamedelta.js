define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/delta/renamedelta.js'], function (_document, _element, _renamedelta) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _renamedelta2 = _interopRequireDefault(_renamedelta);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, batch, chain;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			const p = new _element2.default('p', null, 'abc');
			root.appendChildren(p);

			batch = doc.batch();

			chain = batch.rename('h', p);
		});

		describe('rename', () => {
			it('should rename given element', () => {
				expect(root.getChildCount()).to.equal(1);
				expect(root.getChild(0)).to.have.property('name', 'h');
				expect(root.getChild(0).getText()).to.equal('abc');
			});

			it('should be chainable', () => {
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch.rename('p', root.getChild(0));

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.alwaysCalledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('RenameDelta', () => {
		let renameDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			renameDelta = new _renamedelta2.default();
		});

		describe('constructor', () => {
			it('should create rename delta with no operations added', () => {
				expect(renameDelta.operations.length).to.equal(0);
			});
		});

		describe('getReversed', () => {
			it('should return instance of RenameDelta', () => {
				let reversed = renameDelta.getReversed();

				expect(reversed).to.be.instanceof(_renamedelta2.default);
			});

			it('should return correct RenameDelta', () => {
				root.appendChildren(new _element2.default('p', null, 'abc'));

				const batch = doc.batch();

				batch.rename('h', root.getChild(0));

				const reversed = batch.deltas[0].getReversed();

				reversed.operations.forEach(operation => {
					doc.applyOperation(operation);
				});

				expect(root.getChildCount()).to.equal(1);
				expect(root.getChild(0)).to.have.property('name', 'p');
				expect(root.getChild(0).getText()).to.equal('abc');
			});
		});

		it('should provide proper className', () => {
			expect(_renamedelta2.default.className).to.equal('engine.model.delta.RenameDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
