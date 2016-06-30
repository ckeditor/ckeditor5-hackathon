define('tests', ['/ckeditor5/utils/count.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/operation/operation.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/nooperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/rootattributeoperation.js', '/ckeditor5/engine/model/delta/deltafactory.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/tests/engine/model/_utils/utils.js'], function (_count, _delta, _operation, _attributeoperation, _insertoperation, _moveoperation, _nooperation, _reinsertoperation, _removeoperation, _rootattributeoperation, _deltafactory, _document, _position, _range, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _count2 = _interopRequireDefault(_count);

	var _delta2 = _interopRequireDefault(_delta);

	var _operation2 = _interopRequireDefault(_operation);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _rootattributeoperation2 = _interopRequireDefault(_rootattributeoperation);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// Some test examples of operations.
	class FooOperation extends _operation2.default {
		constructor(string, baseVersion) {
			super(baseVersion);
			this.string = string;
		}

		getReversed() {
			/* jshint ignore:start */
			return new BarOperation(this.string, this.baseVersion);
			/* jshint ignore:end */
		}
	}

	class BarOperation extends FooOperation {
		getReversed() {
			return new FooOperation(this.string, this.baseVersion);
		}
	}

	class FooDelta extends _delta2.default {
		static get className() {
			return 'tets.delta.foo';
		}
	}

	describe('Delta', () => {
		describe('constructor', () => {
			it('should create an delta with empty properties', () => {
				const delta = new _delta2.default();

				expect(delta).to.have.property('batch').that.is.null;
				expect(delta).to.have.property('operations').that.a('array').and.have.length(0);
			});
		});

		describe('baseVersion', () => {
			it('should return baseVersion of first operation in the delta', () => {
				const delta = new _delta2.default();

				delta.addOperation({ baseVersion: 0 });
				delta.addOperation({ baseVersion: 1 });
				delta.addOperation({ baseVersion: 2 });

				expect(delta.baseVersion).to.equal(0);
			});

			it('should change baseVersion of it\'s operations', () => {
				const delta = new _delta2.default();

				delta.addOperation({ baseVersion: 0 });
				delta.addOperation({ baseVersion: 1 });
				delta.addOperation({ baseVersion: 2 });

				delta.baseVersion = 10;

				expect(delta.operations[0].baseVersion).to.equal(10);
				expect(delta.operations[1].baseVersion).to.equal(11);
				expect(delta.operations[2].baseVersion).to.equal(12);
			});
		});

		describe('addOperation', () => {
			it('should add operation to the delta', () => {
				const delta = new _delta2.default();
				const operation = {};

				delta.addOperation(operation);

				expect(delta.operations).to.have.length(1);
				expect(delta.operations[0]).to.equal(operation);
			});

			it('should add delta property to the operation', () => {
				const delta = new _delta2.default();
				const operation = {};

				delta.addOperation(operation);

				expect(operation.delta).to.equal(delta);
			});
		});

		describe('iterator', () => {
			it('should iterate over delta operations', () => {
				const delta = new _delta2.default();

				delta.addOperation({});
				delta.addOperation({});
				delta.addOperation({});

				const totalNumber = (0, _count2.default)(delta.operations);

				expect(totalNumber).to.equal(3);
			});
		});

		describe('getReversed', () => {
			it('should return empty Delta if there are no operations in delta', () => {
				const delta = new _delta2.default();
				let reversed = delta.getReversed();

				expect(reversed).to.be.instanceof(_delta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return Delta with all operations reversed and their order reversed', () => {
				const delta = new _delta2.default();
				delta.addOperation(new FooOperation('a', 1));
				delta.addOperation(new BarOperation('b', 2));

				let reversed = delta.getReversed();

				expect(reversed).to.be.instanceof(_delta2.default);
				expect(reversed.operations.length).to.equal(2);

				expect(reversed.operations[0]).to.be.instanceOf(FooOperation);
				expect(reversed.operations[0].string).to.equal('b');
				expect(reversed.operations[1]).to.be.instanceOf(BarOperation);
				expect(reversed.operations[1].string).to.equal('a');
			});
		});

		describe('toJSON', () => {
			let delta, root, doc;

			before(() => {
				_deltafactory2.default.register(FooDelta);
			});

			beforeEach(() => {
				delta = new FooDelta();

				doc = new _document2.default();
				root = doc.createRoot('root');
			});

			it('should return JSON representation for empty delta', () => {
				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: []
				});
			});

			it('should create delta with AttributeOperation', () => {
				let operation = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'foo', true, null, doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with InsertOperation', () => {
				let operation = new _insertoperation2.default(new _position2.default(root, [0]), 'x', doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with MoveOperation', () => {
				let operation = new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with NoOperation', () => {
				let operation = new _nooperation2.default(0);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with ReinsertOperation', () => {
				let operation = new _reinsertoperation2.default(new _position2.default(doc.graveyard, [0]), 2, new _position2.default(root, [0]), doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with RemoveOperation', () => {
				let operation = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should create delta with RootAttributeOperation', () => {
				let operation = new _rootattributeoperation2.default(root, 'key', null, 'newValue', doc.version);

				delta.addOperation(operation);

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: [(0, _utils.jsonParseStringify)(operation)]
				});
			});

			it('should remove batch reference', () => {
				delta.batch = { foo: 'bar' };

				expect((0, _utils.jsonParseStringify)(delta)).to.deep.equal({
					__className: FooDelta.className,
					operations: []
				});
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
