define('tests', ['/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/delta/insertdelta.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/nooperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/rootattributeoperation.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/deltafactory.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/tests/engine/model/_utils/utils.js'], function (_delta, _insertdelta, _attributeoperation, _insertoperation, _moveoperation, _nooperation, _reinsertoperation, _removeoperation, _rootattributeoperation, _ckeditorerror, _deltafactory, _document, _position, _range, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _delta2 = _interopRequireDefault(_delta);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _rootattributeoperation2 = _interopRequireDefault(_rootattributeoperation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class FooDelta extends _delta2.default {
		static get className() {
			return 'tets.delta.foo';
		}
	}

	class BarDelta extends _delta2.default {
		static get className() {
			return 'tets.delta.bar';
		}
	}

	describe('DeltaFactory', () => {
		describe('fromJSON', () => {
			let delta, root, doc;

			before(() => {
				_deltafactory2.default.register(FooDelta);
			});

			beforeEach(() => {
				delta = new FooDelta();

				doc = new _document2.default();
				root = doc.createRoot('root');
			});

			it('should throw error for unregistered delta', () => {
				expect(() => {
					_deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(new BarDelta()), {});
				}).to.throw(_ckeditorerror2.default, /^delta-fromjson-no-deserializer/);
			});

			it('should create delta with AttributeOperation', () => {
				delta.addOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'foo', true, null, doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with InsertOperation', () => {
				delta.addOperation(new _insertoperation2.default(new _position2.default(root, [0]), 'x', doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with MoveOperation', () => {
				delta.addOperation(new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with NoOperation', () => {
				delta.addOperation(new _nooperation2.default(0));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with ReinsertOperation', () => {
				delta.addOperation(new _reinsertoperation2.default(new _position2.default(doc.graveyard, [0]), 2, new _position2.default(root, [0]), doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with RemoveOperation', () => {
				delta.addOperation(new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create delta with RootAttributeOperation', () => {
				delta.addOperation(new _rootattributeoperation2.default(root, 'key', null, 'newValue', doc.version));

				let deserialized = _deltafactory2.default.fromJSON((0, _utils.jsonParseStringify)(delta), doc);

				expect(deserialized).to.deep.equal(delta);
			});

			it('should create InsertDelta instance from serialized JSON object', () => {
				let insertDelta = new _insertdelta2.default();
				let serialized = (0, _utils.jsonParseStringify)(insertDelta);
				let deserialized = _deltafactory2.default.fromJSON(serialized, doc);

				expect(deserialized).to.be.instanceOf(_insertdelta2.default);
				expect(deserialized.operations).to.have.length(0);
			});
		});

		describe('register', () => {
			it('should add delta deserializer', done => {
				class SomeDelta {
					constructor() {
						done();
					}

					static get className() {
						return 'foo';
					}
				}

				_deltafactory2.default.register(SomeDelta);

				_deltafactory2.default.fromJSON({ __className: 'foo', operations: [] });
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
