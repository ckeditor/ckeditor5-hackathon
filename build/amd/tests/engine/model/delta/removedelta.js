define('tests', ['/tests/engine/model/_utils/utils.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/delta/removedelta.js'], function (_utils, _document, _position, _range, _element, _removedelta) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _element2 = _interopRequireDefault(_element);

	var _removedelta2 = _interopRequireDefault(_removedelta);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, div, p, batch, chain, range;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			div = new _element2.default('div', [], 'foobar');
			p = new _element2.default('p', [], 'abcxyz');

			div.insertChildren(4, [new _element2.default('p', [], 'gggg')]);
			div.insertChildren(2, [new _element2.default('p', [], 'hhhh')]);

			root.insertChildren(0, [div, p]);

			batch = doc.batch();

			// Range starts in ROOT > DIV > P > gg|gg.
			// Range ends in ROOT > DIV > ...|ar.
			range = new _range2.default(new _position2.default(root, [0, 2, 2]), new _position2.default(root, [0, 6]));
		});

		describe('remove', () => {
			it('should remove specified node', () => {
				batch.remove(div);

				expect(root.getChildCount()).to.equal(1);
				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(0)))).to.equal('abcxyz');
			});

			it('should move any range of nodes', () => {
				batch.remove(range);

				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(0)))).to.equal('foPhhPar');
				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(1)))).to.equal('abcxyz');
			});

			it('should create minimal number of operations when removing a range', () => {
				batch.remove(range);

				expect(batch.deltas.length).to.equal(1);
				expect(batch.deltas[0].operations.length).to.equal(2);
			});

			it('should be chainable', () => {
				chain = batch.remove(range);

				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch.remove(div);

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('RemoveDelta', () => {
		it('should provide proper className', () => {
			expect(_removedelta2.default.className).to.equal('engine.model.delta.RemoveDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
