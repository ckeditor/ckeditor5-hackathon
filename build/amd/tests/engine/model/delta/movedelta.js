define('tests', ['/tests/engine/model/_utils/utils.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/movedelta.js', '/ckeditor5/engine/model/operation/moveoperation.js'], function (_utils, _document, _position, _range, _element, _ckeditorerror, _movedelta, _moveoperation) {
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

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _movedelta2 = _interopRequireDefault(_movedelta);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, div, p, batch, chain;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			div = new _element2.default('div', [], 'foobar');
			p = new _element2.default('p', [], 'abcxyz');

			div.insertChildren(4, [new _element2.default('p', [], 'gggg')]);
			div.insertChildren(2, [new _element2.default('p', [], 'hhhh')]);

			root.insertChildren(0, [div, p]);

			batch = doc.batch();
		});

		describe('move', () => {
			it('should move specified node', () => {
				batch.move(div, new _position2.default(root, [2]));

				expect(root.getChildCount()).to.equal(2);
				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(0)))).to.equal('abcxyz');
				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(1)))).to.equal('foPhhhhPobPggggPar');
			});

			it('should move flat range of nodes', () => {
				let range = new _range2.default(new _position2.default(root, [0, 3]), new _position2.default(root, [0, 7]));
				batch.move(range, new _position2.default(root, [1, 3]));

				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(0)))).to.equal('foPhhhhPr');
				expect((0, _utils.getNodesAndText)(_range2.default.createFromElement(root.getChild(1)))).to.equal('abcobPggggPaxyz');
			});

			it('should throw if given range is not flat', () => {
				let notFlatRange = new _range2.default(new _position2.default(root, [0, 2, 2]), new _position2.default(root, [0, 6]));

				expect(() => {
					doc.batch().move(notFlatRange, new _position2.default(root, [1, 3]));
				}).to.throw(_ckeditorerror2.default, /^batch-move-range-not-flat/);
			});

			it('should be chainable', () => {
				chain = batch.move(div, new _position2.default(root, [1, 3]));

				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch.move(div, new _position2.default(root, [2]));

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('MoveDelta', () => {
		let moveDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			moveDelta = new _movedelta2.default();
		});

		describe('constructor', () => {
			it('should create move delta with no operations added', () => {
				expect(moveDelta.operations.length).to.equal(0);
			});
		});

		describe('sourcePosition', () => {
			it('should be null if there are no operations in delta', () => {
				expect(moveDelta.sourcePosition).to.be.null;
			});

			it('should be equal to the position where node is inserted', () => {
				moveDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 2, new _position2.default(root, [2, 2]), 0));

				expect(moveDelta.sourcePosition.root).to.equal(root);
				expect(moveDelta.sourcePosition.path).to.deep.equal([1, 1]);
			});
		});

		describe('howMany', () => {
			it('should be null if there are no operations in delta', () => {
				expect(moveDelta.howMany).to.be.null;
			});

			it('should be equal to the position where node is inserted', () => {
				moveDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 2, new _position2.default(root, [2, 2]), 0));

				expect(moveDelta.howMany).to.equal(2);
			});
		});

		describe('targetPosition', () => {
			it('should be null if there are no operations in delta', () => {
				expect(moveDelta.targetPosition).to.be.null;
			});

			it('should be equal to the move operation\'s target position', () => {
				moveDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 2, new _position2.default(root, [2, 2]), 0));

				expect(moveDelta.targetPosition.root).to.equal(root);
				expect(moveDelta.targetPosition.path).to.deep.equal([2, 2]);
			});
		});

		describe('getReversed', () => {
			it('should return empty MoveDelta if there are no operations in delta', () => {
				let reversed = moveDelta.getReversed();

				expect(reversed).to.be.instanceof(_movedelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct MoveDelta', () => {
				moveDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 2, new _position2.default(root, [2, 2]), 0));

				let reversed = moveDelta.getReversed();

				expect(reversed).to.be.instanceof(_movedelta2.default);
				expect(reversed.operations.length).to.equal(1);

				expect(reversed.operations[0]).to.be.instanceof(_moveoperation2.default);
				expect(reversed.operations[0].sourcePosition.path).to.deep.equal([2, 2]);
				expect(reversed.operations[0].howMany).to.equal(2);
				expect(reversed.operations[0].targetPosition.path).to.deep.equal([1, 1]);
			});
		});

		it('should provide proper className', () => {
			expect(_movedelta2.default.className).to.equal('engine.model.delta.MoveDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
