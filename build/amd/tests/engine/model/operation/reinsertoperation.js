define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/operation/reinsertoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/position.js', '/tests/engine/model/_utils/utils.js'], function (_document, _reinsertoperation, _removeoperation, _moveoperation, _position, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _position2 = _interopRequireDefault(_position);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('ReinsertOperation', () => {
		let doc, root, graveyard, operation, graveyardPosition, rootPosition;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			graveyard = doc.graveyard;

			graveyardPosition = new _position2.default(graveyard, [0]);
			rootPosition = new _position2.default(root, [0]);

			operation = new _reinsertoperation2.default(graveyardPosition, 2, rootPosition, doc.version);
		});

		it('should have position property equal to the position where node will be reinserted', () => {
			expect(operation.position.isEqual(rootPosition)).to.be.true;

			// Setting also works:
			operation.position = new _position2.default(root, [1]);
			expect(operation.position.isEqual(new _position2.default(root, [1]))).to.be.true;
		});

		it('should have proper type', () => {
			expect(operation.type).to.equal('reinsert');
		});

		it('should not be sticky', () => {
			expect(operation.isSticky).to.be.false;
		});

		it('should extend MoveOperation class', () => {
			expect(operation).to.be.instanceof(_moveoperation2.default);
		});

		it('should create ReinsertOperation with same parameters when cloned', () => {
			let clone = operation.clone();

			expect(clone).to.be.instanceof(_reinsertoperation2.default);
			expect(clone.sourcePosition.isEqual(operation.sourcePosition)).to.be.true;
			expect(clone.targetPosition.isEqual(operation.targetPosition)).to.be.true;
			expect(clone.howMany).to.equal(operation.howMany);
			expect(clone.baseVersion).to.equal(operation.baseVersion);
		});

		it('should create a RemoveOperation as a reverse', () => {
			let reverse = operation.getReversed();

			expect(reverse).to.be.an.instanceof(_removeoperation2.default);
			expect(reverse.baseVersion).to.equal(1);
			expect(reverse.howMany).to.equal(2);
			expect(reverse.sourcePosition.isEqual(rootPosition)).to.be.true;
			expect(reverse.targetPosition.isEqual(graveyardPosition)).to.be.true;
		});

		it('should undo reinsert set of nodes by applying reverse operation', () => {
			let reverse = operation.getReversed();

			graveyard.insertChildren(0, 'bar');

			doc.applyOperation(operation);

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(2);

			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(0);
			expect(graveyard.getChildCount()).to.equal(3);

			expect(graveyard.getChild(0).character).to.equal('b');
			expect(graveyard.getChild(1).character).to.equal('a');
			expect(graveyard.getChild(2).character).to.equal('r');
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const serialized = (0, _utils.jsonParseStringify)(operation);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.ReinsertOperation',
					baseVersion: 0,
					howMany: 2,
					isSticky: false,
					movedRangeStart: (0, _utils.jsonParseStringify)(operation.movedRangeStart),
					sourcePosition: (0, _utils.jsonParseStringify)(operation.sourcePosition),
					targetPosition: (0, _utils.jsonParseStringify)(operation.targetPosition)
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper ReinsertOperation from json object', () => {
				const serialized = (0, _utils.jsonParseStringify)(operation);
				const deserialized = _reinsertoperation2.default.fromJSON(serialized, doc);

				expect(deserialized).to.deep.equal(operation);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
