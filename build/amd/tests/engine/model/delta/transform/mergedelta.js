define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/nooperation.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _element, _position, _range, _delta, _mergedelta, _moveoperation, _removeoperation, _nooperation, _utils, _utils2) {
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

	var _delta2 = _interopRequireDefault(_delta);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

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

		describe('MergeDelta by', () => {
			let mergeDelta, mergePosition;

			beforeEach(() => {
				mergePosition = new _position2.default(root, [3, 3, 3]);
				mergeDelta = (0, _utils2.getMergeDelta)(mergePosition, 4, 12, baseVersion);
			});

			describe('InsertDelta', () => {
				let nodeA, nodeB;

				beforeEach(() => {
					nodeA = new _element2.default('a');
					nodeB = new _element2.default('b');
				});

				it('insert at same position as merge', () => {
					let insertDelta = (0, _utils2.getInsertDelta)(mergePosition, [nodeA, nodeB], baseVersion);
					let transformed = (0, _transform2.default)(mergeDelta, insertDelta);

					// Expected: MergeDelta gets ignored and is not applied.

					baseVersion = insertDelta.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _delta2.default,
						operations: [{
							type: _nooperation2.default,
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(insertDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 6));

					// InsertDelta is applied. Merge between X and P is discarded.
					expect(nodesAndText).to.equal('XXXXXabcdXAABBPabcfoobarxyzP');
				});

				it('insert inside merged node (sticky move test)', () => {
					let insertDelta = (0, _utils2.getInsertDelta)(new _position2.default(root, [3, 3, 3, 12]), [nodeA, nodeB], baseVersion);
					let transformed = (0, _transform2.default)(mergeDelta, insertDelta);

					baseVersion = insertDelta.operations.length;

					expect(transformed.length).to.equal(1);

					// Expected: MoveOperation in MergeDelta has it's "range" expanded.

					(0, _utils2.expectDelta)(transformed[0], {
						type: _mergedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 0]),
							howMany: 14,
							targetPosition: new _position2.default(root, [3, 3, 2, 4]),
							baseVersion: baseVersion
						}, {
							// This is `MoveOperation` instead of `RemoveOperation` because during OT,
							// `RemoveOperation` may get converted to `MoveOperation`. Still, this expectation is
							// correct because `RemoveOperation` is deriving from `MoveOperation`. So we can expect
							// that something that was `RemoveOperation` is a `MoveOperation`.
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3]),
							howMany: 1,
							targetPosition: new _position2.default(gy, [0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(insertDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 3));

					// InsertDelta is applied. Merge between X and P is discarded.
					expect(nodesAndText).to.equal('XXXXXabcdabcfoobarxyzAABBX');
				});
			});

			describe('MoveDelta', () => {
				it('node on the right side of merge was moved', () => {
					let moveDelta = (0, _utils2.getMoveDelta)(new _position2.default(root, [3, 3, 3]), 1, new _position2.default(root, [3, 3, 0]), baseVersion);
					let transformed = (0, _transform2.default)(mergeDelta, moveDelta);

					baseVersion = moveDelta.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _delta2.default,
						operations: [{
							type: _nooperation2.default,
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(moveDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 1));

					// MoveDelta is applied. MergeDelta is discarded.
					expect(nodesAndText).to.equal('DIVPabcfoobarxyzPXXXXXabcdXDIV');
				});

				it('node on the left side of merge was moved', () => {
					let moveDelta = (0, _utils2.getMoveDelta)(new _position2.default(root, [3, 3, 2]), 1, new _position2.default(root, [3, 3, 0]), baseVersion);
					let transformed = (0, _transform2.default)(mergeDelta, moveDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = moveDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _mergedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 0]),
							howMany: 12,
							targetPosition: new _position2.default(root, [3, 3, 0, 4]),
							baseVersion: baseVersion
						}, {
							type: _removeoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3]),
							howMany: 1,
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(moveDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 1));

					// MoveDelta is applied. MergeDelta is discarded.
					expect(nodesAndText).to.equal('DIVXabcdabcfoobarxyzXXXXXDIV');
				});
			});

			describe('MergeDelta', () => {
				it('merge two consecutive elements, transformed merge is after', () => {
					let mergeDeltaB = (0, _utils2.getMergeDelta)(new _position2.default(root, [3, 3, 2]), 0, 4, baseVersion);
					let transformed = (0, _transform2.default)(mergeDelta, mergeDeltaB);

					expect(transformed.length).to.equal(1);

					baseVersion = mergeDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _mergedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2, 0]),
							howMany: 12,
							targetPosition: new _position2.default(root, [3, 3, 1, 4]),
							baseVersion: baseVersion
						}, {
							type: _removeoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2]),
							howMany: 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(mergeDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 2));

					// Both merge deltas are applied and merged nodes children are together in one node.
					expect(nodesAndText).to.equal('XXXabcdabcfoobarxyzX');
				});

				it('merge two consecutive elements, transformed merge is before', () => {
					mergeDelta = (0, _utils2.getMergeDelta)(new _position2.default(root, [3, 3, 2]), 0, 4, baseVersion);
					let mergeDeltaB = (0, _utils2.getMergeDelta)(new _position2.default(root, [3, 3, 3]), 4, 12, baseVersion);

					let transformed = (0, _transform2.default)(mergeDelta, mergeDeltaB);

					expect(transformed.length).to.equal(1);

					baseVersion = mergeDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _mergedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2, 0]),
							howMany: 16,
							targetPosition: new _position2.default(root, [3, 3, 1, 0]),
							baseVersion: baseVersion
						}, {
							type: _removeoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2]),
							howMany: 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(mergeDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 2));

					// Both merge deltas are applied and merged nodes children are together in one node.
					expect(nodesAndText).to.equal('XXXabcdabcfoobarxyzX');
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
