define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/unwrapdelta.js', '/ckeditor5/engine/model/delta/wrapdelta.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js'], function (_document, _element, _position, _ckeditorerror, _unwrapdelta, _wrapdelta, _moveoperation, _removeoperation, _reinsertoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, p;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			p = new _element2.default('p', [], 'xyz');
			root.insertChildren(0, ['a', p, 'b']);
		});

		describe('unwrap', () => {
			it('should unwrap given element', () => {
				doc.batch().unwrap(p);

				expect(root.getChildCount()).to.equal(5);
				expect(root.getChild(0).character).to.equal('a');
				expect(root.getChild(1).character).to.equal('x');
				expect(root.getChild(2).character).to.equal('y');
				expect(root.getChild(3).character).to.equal('z');
				expect(root.getChild(4).character).to.equal('b');
			});

			it('should throw if element to unwrap has no parent', () => {
				let element = new _element2.default('p');

				expect(() => {
					doc.batch().unwrap(element);
				}).to.throw(_ckeditorerror2.default, /^batch-unwrap-element-no-parent/);
			});

			it('should be chainable', () => {
				const batch = doc.batch();

				const chain = batch.unwrap(p);
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				const batch = doc.batch().unwrap(p);

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('UnwrapDelta', () => {
		let unwrapDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			unwrapDelta = new _unwrapdelta2.default();
		});

		describe('constructor', () => {
			it('should create unwrap delta with no operations added', () => {
				expect(unwrapDelta.operations.length).to.equal(0);
			});
		});

		describe('position', () => {
			it('should be null if there are no operations in delta', () => {
				expect(unwrapDelta.position).to.be.null;
			});

			it('should be equal to the position before unwrapped node', () => {
				unwrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 2, 0]), 4, new _position2.default(root, [1, 2])));
				unwrapDelta.operations.push(new _removeoperation2.default(new _position2.default(root, [1, 6]), 1));

				expect(unwrapDelta.position.root).to.equal(root);
				expect(unwrapDelta.position.path).to.deep.equal([1, 2]);
			});
		});

		describe('getReversed', () => {
			it('should return empty WrapDelta if there are no operations in delta', () => {
				let reversed = unwrapDelta.getReversed();

				expect(reversed).to.be.instanceof(_wrapdelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct WrapDelta', () => {
				unwrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 2, 0]), 4, new _position2.default(root, [1, 2])));
				unwrapDelta.operations.push(new _removeoperation2.default(new _position2.default(root, [1, 6]), 1));

				let reversed = unwrapDelta.getReversed();

				expect(reversed).to.be.instanceof(_wrapdelta2.default);
				expect(reversed.operations.length).to.equal(2);

				// WrapDelta which is an effect of reversing UnwrapDelta has ReinsertOperation instead of InsertOperation.
				// This is because we will "wrap" nodes into the element in which they were in the first place.
				// That element has been removed so we reinsert it from the graveyard.
				expect(reversed.operations[0]).to.be.instanceof(_reinsertoperation2.default);
				expect(reversed.operations[0].howMany).to.equal(1);
				expect(reversed.operations[0].targetPosition.path).to.deep.equal([1, 6]);

				expect(reversed.operations[1]).to.be.instanceof(_moveoperation2.default);
				expect(reversed.operations[1].sourcePosition.path).to.deep.equal([1, 2]);
				expect(reversed.operations[1].howMany).to.equal(4);
				expect(reversed.operations[1].targetPosition.path).to.deep.equal([1, 6, 0]);
			});
		});

		it('should provide proper className', () => {
			expect(_unwrapdelta2.default.className).to.equal('engine.model.delta.UnwrapDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
