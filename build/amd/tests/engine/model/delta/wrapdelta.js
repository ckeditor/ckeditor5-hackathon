define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/wrapdelta.js', '/ckeditor5/engine/model/delta/unwrapdelta.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (_document, _position, _range, _element, _ckeditorerror, _wrapdelta, _unwrapdelta, _insertoperation, _moveoperation, _removeoperation) {
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

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, range;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			root.insertChildren(0, 'foobar');

			range = new _range2.default(new _position2.default(root, [2]), new _position2.default(root, [4]));
		});

		describe('wrap', () => {
			it('should wrap flat range with given element', () => {
				let p = new _element2.default('p');
				doc.batch().wrap(range, p);

				expect(root.getChildCount()).to.equal(5);
				expect(root.getChild(0).character).to.equal('f');
				expect(root.getChild(1).character).to.equal('o');
				expect(root.getChild(2)).to.equal(p);
				expect(p.getChild(0).character).to.equal('o');
				expect(p.getChild(1).character).to.equal('b');
				expect(root.getChild(3).character).to.equal('a');
				expect(root.getChild(4).character).to.equal('r');
			});

			it('should wrap flat range with an element of given name', () => {
				doc.batch().wrap(range, 'p');

				expect(root.getChildCount()).to.equal(5);
				expect(root.getChild(0).character).to.equal('f');
				expect(root.getChild(1).character).to.equal('o');
				expect(root.getChild(2).name).to.equal('p');
				expect(root.getChild(2).getChild(0).character).to.equal('o');
				expect(root.getChild(2).getChild(1).character).to.equal('b');
				expect(root.getChild(3).character).to.equal('a');
				expect(root.getChild(4).character).to.equal('r');
			});

			it('should throw if range to wrap is not flat', () => {
				root.insertChildren(6, [new _element2.default('p', [], 'xyz')]);
				let notFlatRange = new _range2.default(new _position2.default(root, [3]), new _position2.default(root, [6, 2]));

				expect(() => {
					doc.batch().wrap(notFlatRange, 'p');
				}).to.throw(_ckeditorerror2.default, /^batch-wrap-range-not-flat/);
			});

			it('should throw if element to wrap with has children', () => {
				let p = new _element2.default('p', [], 'a');

				expect(() => {
					doc.batch().wrap(range, p);
				}).to.throw(_ckeditorerror2.default, /^batch-wrap-element-not-empty/);
			});

			it('should throw if element to wrap with has children', () => {
				let p = new _element2.default('p');
				root.insertChildren(0, p);

				expect(() => {
					doc.batch().wrap(range, p);
				}).to.throw(_ckeditorerror2.default, /^batch-wrap-element-attached/);
			});

			it('should be chainable', () => {
				const batch = doc.batch();

				const chain = batch.wrap(range, 'p');
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				const batch = doc.batch().wrap(range, 'p');

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('WrapDelta', () => {
		let wrapDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			wrapDelta = new _wrapdelta2.default();
		});

		describe('constructor', () => {
			it('should create wrap delta with no operations added', () => {
				expect(wrapDelta.operations.length).to.equal(0);
			});
		});

		describe('range', () => {
			it('should be equal to null if there are no operations in delta', () => {
				expect(wrapDelta.range).to.be.null;
			});

			it('should be equal to wrapped range', () => {
				wrapDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 6]), 1));
				wrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 5, new _position2.default(root, [1, 6, 0])));

				expect(wrapDelta.range.start.isEqual(new _position2.default(root, [1, 1]))).to.be.true;
				expect(wrapDelta.range.end.isEqual(new _position2.default(root, [1, 6]))).to.be.true;
			});
		});

		describe('howMany', () => {
			it('should be equal to 0 if there are no operations in delta', () => {
				expect(wrapDelta.howMany).to.equal(0);
			});

			it('should be equal to the number of wrapped elements', () => {
				let howMany = 5;

				wrapDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 6]), 1));
				wrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), howMany, new _position2.default(root, [1, 6, 0])));

				expect(wrapDelta.howMany).to.equal(5);
			});
		});

		describe('getReversed', () => {
			it('should return empty UnwrapDelta if there are no operations in delta', () => {
				let reversed = wrapDelta.getReversed();

				expect(reversed).to.be.instanceof(_unwrapdelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct UnwrapDelta', () => {
				wrapDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 6]), 1));
				wrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 5, new _position2.default(root, [1, 6, 0])));

				let reversed = wrapDelta.getReversed();

				expect(reversed).to.be.instanceof(_unwrapdelta2.default);
				expect(reversed.operations.length).to.equal(2);

				expect(reversed.operations[0]).to.be.instanceof(_moveoperation2.default);
				expect(reversed.operations[0].sourcePosition.path).to.deep.equal([1, 1, 0]);
				expect(reversed.operations[0].howMany).to.equal(5);
				expect(reversed.operations[0].targetPosition.path).to.deep.equal([1, 1]);

				expect(reversed.operations[1]).to.be.instanceof(_removeoperation2.default);
				expect(reversed.operations[1].sourcePosition.path).to.deep.equal([1, 6]);
				expect(reversed.operations[1].howMany).to.equal(1);
			});
		});

		describe('_insertOperation', () => {
			it('should be null if there are no operations in the delta', () => {
				expect(wrapDelta._insertOperation).to.be.null;
			});

			it('should be equal to the first operation in the delta', () => {
				let insertOperation = new _insertoperation2.default(new _position2.default(root, [1, 6]), 1);

				wrapDelta.operations.push(insertOperation);
				wrapDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1]), 5, new _position2.default(root, [1, 6, 0])));

				expect(wrapDelta._insertOperation).to.equal(insertOperation);
			});
		});

		it('should provide proper className', () => {
			expect(_wrapdelta2.default.className).to.equal('engine.model.delta.WrapDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
