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

	describe('RemoveOperation', () => {
		let doc, root, graveyard;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			graveyard = doc.graveyard;
		});

		it('should have proper type', () => {
			const op = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

			expect(op.type).to.equal('remove');
		});

		it('should not be sticky', () => {
			const op = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

			expect(op.isSticky).to.be.false;
		});

		it('should extend MoveOperation class', () => {
			let operation = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

			expect(operation).to.be.instanceof(_moveoperation2.default);
		});

		it('should remove set of nodes and append them to graveyard root', () => {
			root.insertChildren(0, 'fozbar');

			doc.applyOperation(new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(4);
			expect(root.getChild(2).character).to.equal('a');

			expect(graveyard.getChildCount()).to.equal(2);
			expect(graveyard.getChild(0).character).to.equal('z');
			expect(graveyard.getChild(1).character).to.equal('b');
		});

		it('should create RemoveOperation with same parameters when cloned', () => {
			let pos = new _position2.default(root, [2]);

			let operation = new _removeoperation2.default(pos, 2, doc.version);
			let clone = operation.clone();

			expect(clone).to.be.instanceof(_removeoperation2.default);
			expect(clone.sourcePosition.isEqual(pos)).to.be.true;
			expect(clone.howMany).to.equal(operation.howMany);
			expect(clone.baseVersion).to.equal(operation.baseVersion);
		});

		it('should create a ReinsertOperation as a reverse', () => {
			let position = new _position2.default(root, [0]);
			let operation = new _removeoperation2.default(position, 2, 0);
			let reverse = operation.getReversed();

			expect(reverse).to.be.an.instanceof(_reinsertoperation2.default);
			expect(reverse.baseVersion).to.equal(1);
			expect(reverse.howMany).to.equal(2);
			expect(reverse.sourcePosition.isEqual(operation.targetPosition)).to.be.true;
			expect(reverse.targetPosition.isEqual(position)).to.be.true;
		});

		it('should undo remove set of nodes by applying reverse operation', () => {
			let position = new _position2.default(root, [0]);
			let operation = new _removeoperation2.default(position, 3, 0);
			let reverse = operation.getReversed();

			root.insertChildren(0, 'bar');

			doc.applyOperation(operation);

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(0);

			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0).character).to.equal('b');
			expect(root.getChild(1).character).to.equal('a');
			expect(root.getChild(2).character).to.equal('r');
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const op = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.RemoveOperation',
					baseVersion: 0,
					howMany: 2,
					isSticky: false,
					movedRangeStart: (0, _utils.jsonParseStringify)(op.movedRangeStart),
					sourcePosition: (0, _utils.jsonParseStringify)(op.sourcePosition),
					targetPosition: (0, _utils.jsonParseStringify)(op.targetPosition)
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper RemoveOperation from json object', () => {
				const op = new _removeoperation2.default(new _position2.default(root, [2]), 2, doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);
				const deserialized = _removeoperation2.default.fromJSON(serialized, doc);

				expect(deserialized).to.deep.equal(op);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
