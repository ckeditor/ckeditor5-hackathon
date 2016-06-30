define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/delta/unwrapdelta.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _element, _position, _range, _moveoperation, _mergedelta, _unwrapdelta, _utils, _utils2) {
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

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

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

		describe('UnwrapDelta by', () => {
			let unwrapDelta;

			beforeEach(() => {
				unwrapDelta = (0, _utils2.getUnwrapDelta)(new _position2.default(root, [3, 3, 3]), 12, baseVersion);
			});

			describe('SplitDelta', () => {
				it('split position directly in unwrapped node', () => {
					let splitPosition = new _position2.default(root, [3, 3, 3, 3]);
					let splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 9, baseVersion);

					let transformed = (0, _transform2.default)(unwrapDelta, splitDelta);

					expect(transformed.length).to.equal(2);

					baseVersion = splitDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _mergedelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 4, 0]),
							howMany: 9,
							targetPosition: new _position2.default(root, [3, 3, 3, 3]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 4]),
							howMany: 1,
							targetPosition: new _position2.default(gy, [0]),
							baseVersion: baseVersion + 1
						}]
					});

					(0, _utils2.expectDelta)(transformed[1], {
						type: _unwrapdelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 0]),
							howMany: 12,
							targetPosition: new _position2.default(root, [3, 3, 3]),
							baseVersion: baseVersion + 2
						}, {
							// `RemoveOperation` as `MoveOperation`
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 15]),
							howMany: 1,
							targetPosition: new _position2.default(gy, [0]),
							baseVersion: baseVersion + 3
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(splitDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);
					(0, _utils2.applyDelta)(transformed[1], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 1));

					// UnwrapDelta is applied. SplitDelta is discarded.
					expect(nodesAndText).to.equal('DIVXXXXXabcdXabcfoobarxyzDIV');
				});

				it('split position before unwrapped node', () => {
					let splitPosition = new _position2.default(root, [3, 3, 3]);
					let splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('div'), 1, baseVersion);

					let transformed = (0, _transform2.default)(unwrapDelta, splitDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = splitDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _unwrapdelta2.default,
						operations: [{
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 4, 0, 0]),
							howMany: 12,
							targetPosition: new _position2.default(root, [3, 4, 0]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 4, 12]),
							howMany: 1,
							targetPosition: new _position2.default(gy, [0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(splitDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3]), 2));

					// UnwrapDelta and SplitDelta are applied.
					expect(nodesAndText).to.equal('DIVXXXXXabcdXDIVDIVabcfoobarxyzDIV');
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
