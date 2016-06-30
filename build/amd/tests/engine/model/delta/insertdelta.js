define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/delta/insertdelta.js', '/ckeditor5/engine/model/delta/removedelta.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (_document, _element, _position, _insertoperation, _insertdelta, _removedelta, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _removedelta2 = _interopRequireDefault(_removedelta);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, batch, p, ul, chain;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			root.insertChildren(0, 'abc');

			batch = doc.batch();

			p = new _element2.default('p');
			ul = new _element2.default('ul');

			chain = batch.insert(new _position2.default(root, [2]), [p, ul]);
		});

		describe('insert', () => {
			it('should insert given nodes at given position', () => {
				expect(root.getChildCount()).to.equal(5);
				expect(root.getChild(2)).to.equal(p);
				expect(root.getChild(3)).to.equal(ul);
			});

			it('should be chainable', () => {
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch.insert(new _position2.default(root, [2]), [p, ul]);

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('InsertDelta', () => {
		let insertDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			insertDelta = new _insertdelta2.default();
		});

		describe('constructor', () => {
			it('should create insert delta with no operations added', () => {
				expect(insertDelta.operations.length).to.equal(0);
			});
		});

		describe('position', () => {
			it('should be null if there are no operations in delta', () => {
				expect(insertDelta.position).to.be.null;
			});

			it('should be equal to the position where node is inserted', () => {
				insertDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 2, 3]), new _element2.default('x'), 0));

				expect(insertDelta.position.root).to.equal(root);
				expect(insertDelta.position.path).to.deep.equal([1, 2, 3]);
			});
		});

		describe('nodeList', () => {
			it('should be null if there are no operations in delta', () => {
				expect(insertDelta.nodeList).to.be.null;
			});

			it('should be equal to the node list inserted by the delta', () => {
				let elementX = new _element2.default('x');
				insertDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 2, 3]), elementX, 0));

				expect(insertDelta.nodeList.length).to.equal(1);
				expect(insertDelta.nodeList.get(0)).to.equal(elementX);
			});
		});

		describe('getReversed', () => {
			it('should return empty RemoveDelta if there are no operations in delta', () => {
				let reversed = insertDelta.getReversed();

				expect(reversed).to.be.instanceof(_removedelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct RemoveDelta', () => {
				let position = new _position2.default(root, [1, 2, 3]);
				let elementX = new _element2.default('x');
				insertDelta.operations.push(new _insertoperation2.default(position, elementX, 0));

				let reversed = insertDelta.getReversed();

				expect(reversed).to.be.instanceof(_removedelta2.default);
				expect(reversed.operations.length).to.equal(1);

				expect(reversed.operations[0]).to.be.instanceof(_removeoperation2.default);
				expect(reversed.operations[0].sourcePosition.isEqual(position)).to.be.true;
				expect(reversed.operations[0].howMany).to.equal(1);
			});
		});

		it('should provide proper className', () => {
			expect(_insertdelta2.default.className).to.equal('engine.model.delta.InsertDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
