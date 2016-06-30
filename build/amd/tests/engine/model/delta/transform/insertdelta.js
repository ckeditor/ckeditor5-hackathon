define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/insertdelta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _element, _position, _range, _insertdelta, _splitdelta, _insertoperation, _moveoperation, _reinsertoperation, _utils, _utils2) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _basicTransformations2 = _interopRequireDefault(_basicTransformations);

	var _transform2 = _interopRequireDefault(_transform);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _insertdelta2 = _interopRequireDefault(_insertdelta);

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('transform', () => {
		let doc, root, gy, baseVersion;

		beforeEach(() => {
			doc = (0, _utils2.getFilledDocument)();
			root = doc.getRoot('root');
			gy = doc.graveyard;
			baseVersion = doc.version;
		});

		describe('InsertDelta by', () => {
			let insertDelta, insertPosition, nodeA, nodeB;

			beforeEach(() => {
				nodeA = new _element2.default('a');
				nodeB = new _element2.default('b');

				insertPosition = new _position2.default(root, [3, 3, 3]);
				insertDelta = (0, _utils2.getInsertDelta)(insertPosition, [nodeA, nodeB], baseVersion);
			});

			describe('InsertDelta', () => {
				it('should be resolved in a same way as two insert operations', () => {
					let insertPositionB = new _position2.default(root, [3, 1]);
					let insertDeltaB = (0, _utils2.getInsertDelta)(insertPositionB, [new _element2.default('c'), new _element2.default('d')], baseVersion);

					let transformed = (0, _transform2.default)(insertDelta, insertDeltaB);

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _insertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 5, 3]),
							nodes: [nodeA, nodeB],
							baseVersion: baseVersion + 1
						}]
					});
				});
			});

			describe('MergeDelta', () => {
				it('merge in same position as insert', () => {
					let mergeDelta = (0, _utils2.getMergeDelta)(insertPosition, 4, 12, baseVersion);
					let transformed = (0, _transform2.default)(insertDelta, mergeDelta);

					baseVersion = mergeDelta.operations.length;

					// Expected: MergeOperation gets reversed (by special case of SplitDelta that has ReinsertOperation
					// instead of InsertOperation. Then InsertDelta is applied as is.

					expect(transformed.length).to.equal(2);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _reinsertoperation2.default,
							sourcePosition: new _position2.default(gy, [0]),
							howMany: 1,
							targetPosition: new _position2.default(root, [3, 3, 3]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2, 4]),
							howMany: 12,
							targetPosition: new _position2.default(root, [3, 3, 3, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					(0, _utils2.expectDelta)(transformed[1], {
						type: _insertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: _position2.default.createFromPosition(insertPosition),
							nodes: [nodeA, nodeB],
							baseVersion: baseVersion + 2
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(mergeDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);
					(0, _utils2.applyDelta)(transformed[1], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 6));

					// Merge between X with "abcd" and P with "abcfoobarxyz" should be reversed and AB should be inserted between X and P.
					expect(nodesAndText).to.equal('XXXXXabcdXAABBPabcfoobarxyzP');
				});

				it('merge the node that is parent of insert position (sticky move test)', () => {
					let mergeDelta = (0, _utils2.getMergeDelta)(new _position2.default(root, [3, 3]), 1, 4, baseVersion);
					let transformed = (0, _transform2.default)(insertDelta, mergeDelta);

					baseVersion = mergeDelta.operations.length;

					// Expected: InsertOperation in InsertDelta has it's path updated.

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _insertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 2, 4]),
							nodes: [nodeA, nodeB],
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(mergeDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 2, 0]), 7));

					// Merge between X with "a" and DIV should be applied. AB should be inserted in new, correct position.
					expect(nodesAndText).to.equal('aXXXXXabcdXAABBPabcfoobarxyzP');
				});

				it('merge at affected position but resolved by default OT', () => {
					let mergeDelta = (0, _utils2.getMergeDelta)(new _position2.default(root, [3]), 1, 4, baseVersion);
					let transformed = (0, _transform2.default)(insertDelta, mergeDelta);

					baseVersion = mergeDelta.operations.length;

					// Expected: InsertOperation in InsertDelta has it's path updated.

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _insertdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [2, 4, 3]),
							nodes: [nodeA, nodeB],
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(mergeDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [2, 0]), 5));

					// Merge between X with "a" and DIV should be applied. AB should be inserted in new, correct position.
					expect(nodesAndText).to.equal('aXXXXXaXDIVXXXXXabcdXAABBPabcfoobarxyzPDIV');
				});
			});
		});
	});
	/*jshint unused: false*/
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
