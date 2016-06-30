define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/delta/weakinsertdelta.js'], function (_document, _position, _weakinsertdelta) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _weakinsertdelta2 = _interopRequireDefault(_weakinsertdelta);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, batch, chain, attrs;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			root.insertChildren(0, 'abc');

			batch = doc.batch();

			attrs = [['bold', true], ['foo', 'bar']];

			doc.selection.setAttributesTo(attrs);

			chain = batch.weakInsert(new _position2.default(root, [2]), 'xyz');
		});

		describe('weakInsert', () => {
			it('should insert given nodes at given position', () => {
				expect(root.getChildCount()).to.equal(6);
				expect(root.getChild(2).character).to.equal('x');
				expect(root.getChild(3).character).to.equal('y');
				expect(root.getChild(4).character).to.equal('z');
			});

			it('should set inserted nodes attributes to same as current selection attributes', () => {
				expect(Array.from(root.getChild(2)._attrs)).to.deep.equal(attrs);
				expect(Array.from(root.getChild(3)._attrs)).to.deep.equal(attrs);
				expect(Array.from(root.getChild(4)._attrs)).to.deep.equal(attrs);
			});

			it('should be chainable', () => {
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch.weakInsert(new _position2.default(root, [2]), 'xyz');

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('WeakInsertDelta', () => {
		it('should provide proper className', () => {
			expect(_weakinsertdelta2.default.className).to.equal('engine.model.delta.WeakInsertDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
