define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/delta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/nooperation.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _element, _position, _range, _delta, _splitdelta, _insertoperation, _reinsertoperation, _moveoperation, _nooperation, _utils, _utils2) {
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

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _nooperation2 = _interopRequireDefault(_nooperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/*jshint unused: false*/

	describe('transform', () => {
		let doc, root, gy, baseVersion;

		beforeEach(() => {
			doc = (0, _utils2.getFilledDocument)();
			root = doc.getRoot('root');
			gy = doc.graveyard;
			baseVersion = doc.version;
		});

		describe('SplitDelta by', () => {
			let splitDelta, splitPosition;

			beforeEach(() => {
				splitPosition = new _position2.default(root, [3, 3, 3, 3]);
				splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 9, baseVersion);
			});

			describe('SplitDelta', () => {
				it('split in same parent and offset', () => {
					let splitDeltaB = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 9, baseVersion);
					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _delta2.default,
						operations: [{
							type: _nooperation2.default,
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(splitDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 5));

					// Incoming split delta is discarded. Only one new element is created after applying both split deltas.
					// There are no empty P elements.
					expect(nodesAndText).to.equal('XXXXXabcdXPabcPPfoobarxyzP');
				});

				it('split in same parent, incoming delta splits closer', () => {
					let splitDeltaB = (0, _utils2.getSplitDelta)(new _position2.default(root, [3, 3, 3, 5]), new _element2.default('p'), 7, baseVersion);
					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 4]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 3]),
							howMany: 2,
							targetPosition: new _position2.default(root, [3, 3, 4, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(splitDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 6));

					// P element is correctly split, there are three P elements, letters in P elements are in correct order.
					expect(nodesAndText).to.equal('XXXXXabcdXPabcPPfoPPobarxyzP');
				});

				it('split in same parent, incoming delta splits closer, split deltas have reinsert operations', () => {
					let reOp = new _reinsertoperation2.default(new _position2.default(gy, [1]), 1, _position2.default.createFromPosition(splitDelta.operations[0].position), splitDelta.operations[0].baseVersion);
					splitDelta.operations[0] = reOp;

					let splitDeltaB = (0, _utils2.getSplitDelta)(new _position2.default(root, [3, 3, 3, 5]), new _element2.default('p'), 7, baseVersion);
					reOp = new _reinsertoperation2.default(new _position2.default(gy, [0]), 1, _position2.default.createFromPosition(splitDeltaB.operations[0].position), splitDeltaB.operations[0].baseVersion);
					splitDeltaB.operations[0] = reOp;

					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _reinsertoperation2.default,
							sourcePosition: new _position2.default(gy, [0]),
							howMany: 1,
							targetPosition: new _position2.default(root, [3, 3, 4]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 3]),
							howMany: 2,
							targetPosition: new _position2.default(root, [3, 3, 4, 0]),
							baseVersion: baseVersion + 1
						}]
					});
				});

				it('split in same parent, incoming delta splits further', () => {
					let splitDeltaB = (0, _utils2.getSplitDelta)(new _position2.default(root, [3, 3, 3, 1]), new _element2.default('p'), 11, baseVersion);
					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 5]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 4, 2]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 3, 5, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(splitDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 0]), 6));

					// P element is correctly split, there are three P elements, letters in P elements are in correct order.
					expect(nodesAndText).to.equal('XXXXXabcdXPaPPbcPPfoobarxyzP');
				});

				it('split in same parent, incoming delta splits further, split deltas have reinsert operations', () => {
					let reOp = new _reinsertoperation2.default(new _position2.default(gy, [1]), 1, _position2.default.createFromPosition(splitDelta.operations[0].position), splitDelta.operations[0].baseVersion);
					splitDelta.operations[0] = reOp;

					let splitDeltaB = (0, _utils2.getSplitDelta)(new _position2.default(root, [3, 3, 3, 1]), new _element2.default('p'), 11, baseVersion);
					reOp = new _reinsertoperation2.default(new _position2.default(gy, [0]), 1, _position2.default.createFromPosition(splitDeltaB.operations[0].position), splitDeltaB.operations[0].baseVersion);
					splitDeltaB.operations[0] = reOp;

					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _reinsertoperation2.default,
							sourcePosition: new _position2.default(gy, [0]),
							howMany: 1,
							targetPosition: new _position2.default(root, [3, 3, 5]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 4, 2]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 3, 5, 0]),
							baseVersion: baseVersion + 1
						}]
					});
				});

				it('split in split parent', () => {
					let splitDeltaB = (0, _utils2.getSplitDelta)(new _position2.default(root, [3, 3, 3]), new _element2.default('div'), 1, baseVersion);
					let transformed = (0, _transform2.default)(splitDelta, splitDeltaB);

					baseVersion = splitDeltaB.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 4, 1]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 4, 0, 3]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 4, 1, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(splitDeltaB, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 2));

					// DIV and P elements are correctly split.
					expect(nodesAndText).to.equal('DIVXXXXXabcdXDIVDIVPabcPPfoobarxyzPDIV');
				});
			});

			describe('UnwrapDelta', () => {
				it('split position directly in unwrapped node', () => {
					let unwrapDelta = (0, _utils2.getUnwrapDelta)(new _position2.default(root, [3, 3, 3]), 12, baseVersion);
					let transformed = (0, _transform2.default)(splitDelta, unwrapDelta);

					baseVersion = unwrapDelta.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _delta2.default,
						operations: [{
							type: _nooperation2.default,
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(unwrapDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 1));

					// UnwrapDelta is applied. SplitDelta is discarded.
					expect(nodesAndText).to.equal('DIVXXXXXabcdXabcfoobarxyzDIV');
				});

				it('split position indirectly in unwrapped node', () => {
					let unwrapDelta = (0, _utils2.getUnwrapDelta)(new _position2.default(root, [3, 3]), 4, baseVersion);

					let transformed = (0, _transform2.default)(splitDelta, unwrapDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = unwrapDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 7]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 6, 3]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 7, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(unwrapDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3]), 1));

					// UnwrapDelta and SplitDelta are correctly applied.
					expect(nodesAndText).to.equal('DIVXXXXXaXXXXXXabcdXPabcPPfoobarxyzPDIV');
				});
			});

			describe('WrapDelta', () => {
				it('split position is between wrapped nodes', () => {
					let wrapRange = new _range2.default(new _position2.default(root, [3, 3, 3, 1]), new _position2.default(root, [3, 3, 3, 5]));
					let wrapElement = new _element2.default('E');
					let wrapDelta = (0, _utils2.getWrapDelta)(wrapRange, wrapElement, baseVersion);

					let transformed = (0, _transform2.default)(splitDelta, wrapDelta);

					baseVersion = wrapDelta.operations.length;

					expect(transformed.length).to.equal(1);

					(0, _utils2.expectDelta)(transformed[0], {
						type: _delta2.default,
						operations: [{
							type: _nooperation2.default,
							baseVersion: baseVersion
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(wrapDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 3]), 1));

					// WrapDelta is applied. SplitDelta is discarded.
					expect(nodesAndText).to.equal('PaEbcfoEobarxyzP');
				});

				it('split position is before wrapped nodes', () => {
					let wrapRange = new _range2.default(new _position2.default(root, [3, 3, 3, 5]), new _position2.default(root, [3, 3, 3, 7]));
					let wrapElement = new _element2.default('E');
					let wrapDelta = (0, _utils2.getWrapDelta)(wrapRange, wrapElement, baseVersion);

					let transformed = (0, _transform2.default)(splitDelta, wrapDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = wrapDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 4]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 3]),
							howMany: 8,
							targetPosition: new _position2.default(root, [3, 3, 4, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(wrapDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 3]), 2));

					// WrapDelta and SplitDelta are correctly applied.
					expect(nodesAndText).to.equal('PabcPPfoEobEarxyzP');
				});

				it('split position is inside wrapped node', () => {
					let wrapRange = new _range2.default(new _position2.default(root, [3, 3, 2]), new _position2.default(root, [3, 3, 4]));
					let wrapElement = new _element2.default('E');
					let wrapDelta = (0, _utils2.getWrapDelta)(wrapRange, wrapElement, baseVersion);

					let transformed = (0, _transform2.default)(splitDelta, wrapDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = wrapDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 2, 2]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2, 1, 3]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 3, 2, 2, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(wrapDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 2]), 1));

					// WrapDelta and SplitDelta are correctly applied.
					expect(nodesAndText).to.equal('EXabcdXPabcPPfoobarxyzPE');
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
