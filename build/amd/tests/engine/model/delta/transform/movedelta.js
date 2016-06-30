define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/delta/movedelta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _position, _range, _movedelta, _splitdelta, _moveoperation, _utils, _utils2) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _basicTransformations2 = _interopRequireDefault(_basicTransformations);

	var _transform2 = _interopRequireDefault(_transform);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _movedelta2 = _interopRequireDefault(_movedelta);

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

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

		describe('MoveDelta by', () => {
			let moveDelta;

			beforeEach(() => {
				let sourcePosition = new _position2.default(root, [3, 3, 3]);
				let howMany = 1;
				let targetPosition = new _position2.default(root, [3, 3, 0]);

				moveDelta = (0, _utils2.getMoveDelta)(sourcePosition, howMany, targetPosition, baseVersion);
			});

			describe('MergeDelta', () => {
				it('node on the right side of merge was moved', () => {
					let mergePosition = new _position2.default(root, [3, 3, 3]);
					let mergeDelta = (0, _utils2.getMergeDelta)(mergePosition, 4, 12, baseVersion);

					let transformed = (0, _transform2.default)(moveDelta, mergeDelta);

					expect(transformed.length).to.equal(2);

					baseVersion = mergeDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _splitdelta2.default,
						operations: [{
							// This `SplitDelta` got created through reversing `MergeDelta`. It means that operations in
							// a `MergeDelta` had been reversed. One of them is `RemoveOperation` which got reversed into
							// `ReinsertOperation` because we want to get back the node from graveyard. `ReinsertOperation`
							// is treated in OT as `MoveOperation` and might be converted to it. This is why we have to
							// check whether the operation type is `MoveOperation`. This is all perfectly valid.
							type: _moveoperation2.default,
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
						type: _movedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: moveDelta._moveOperation.sourcePosition,
							howMany: moveDelta._moveOperation.howMany,
							targetPosition: moveDelta._moveOperation.targetPosition,
							baseVersion: baseVersion + 2
						}]
					});

					// Test if deltas do what they should after applying transformed delta.

					(0, _utils2.applyDelta)(mergeDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);
					(0, _utils2.applyDelta)(transformed[1], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 1));

					// MoveDelta is applied. MergeDelta is discarded.
					expect(nodesAndText).to.equal('DIVPabcfoobarxyzPXXXXXabcdXDIV');
				});

				it('move range in merged node', () => {
					let mergePosition = new _position2.default(root, [3, 3]);
					let mergeDelta = (0, _utils2.getMergeDelta)(mergePosition, 1, 4, baseVersion);

					let transformed = (0, _transform2.default)(moveDelta, mergeDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = mergeDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _movedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 2, 4]),
							howMany: 1,
							targetPosition: new _position2.default(root, [3, 2, 1]),
							baseVersion: baseVersion
						}]
					});
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
