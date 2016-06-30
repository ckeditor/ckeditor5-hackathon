define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/delta/wrapdelta.js', '/tests/engine/model/_utils/utils.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _element, _position, _range, _moveoperation, _insertoperation, _mergedelta, _wrapdelta, _utils, _utils2) {
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

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

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

		describe('WrapDelta by', () => {
			let wrapDelta;

			beforeEach(() => {
				let wrapRange = new _range2.default(new _position2.default(root, [3, 3, 3, 1]), new _position2.default(root, [3, 3, 3, 5]));
				let wrapElement = new _element2.default('E');

				wrapDelta = (0, _utils2.getWrapDelta)(wrapRange, wrapElement, baseVersion);
			});

			describe('SplitDelta', () => {
				it('split position is between wrapped nodes', () => {
					let splitPosition = new _position2.default(root, [3, 3, 3, 3]);
					let splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 9, baseVersion);

					let transformed = (0, _transform2.default)(wrapDelta, splitDelta);

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
						type: _wrapdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 3, 5]),
							baseVersion: baseVersion + 2
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 3, 1]),
							howMany: 4,
							targetPosition: new _position2.default(root, [3, 3, 3, 5, 0]),
							baseVersion: baseVersion + 3
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(splitDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);
					(0, _utils2.applyDelta)(transformed[1], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 3]), 1));

					// WrapDelta is applied. SplitDelta is discarded.
					expect(nodesAndText).to.equal('PaEbcfoEobarxyzP');
				});

				it('split position is before wrapped nodes', () => {
					let splitPosition = new _position2.default(root, [3, 3, 3, 1]);
					let splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 11, baseVersion);

					let transformed = (0, _transform2.default)(wrapDelta, splitDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = wrapDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _wrapdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 4, 4]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 4, 0]),
							howMany: 4,
							targetPosition: new _position2.default(root, [3, 3, 4, 4, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(splitDelta, doc);
					(0, _utils2.applyDelta)(transformed[0], doc);

					let nodesAndText = (0, _utils.getNodesAndText)(_range2.default.createFromPositionAndShift(new _position2.default(root, [3, 3, 3]), 2));

					// WrapDelta and SplitDelta are correctly applied.
					expect(nodesAndText).to.equal('PaPPEbcfoEobarxyzP');
				});

				it('split position is inside wrapped node', () => {
					// For this case, we need different WrapDelta so it is overwritten.
					let wrapRange = new _range2.default(new _position2.default(root, [3, 3, 2]), new _position2.default(root, [3, 3, 4]));
					let wrapElement = new _element2.default('E');

					wrapDelta = (0, _utils2.getWrapDelta)(wrapRange, wrapElement, baseVersion);

					let splitPosition = new _position2.default(root, [3, 3, 3, 3]);
					let splitDelta = (0, _utils2.getSplitDelta)(splitPosition, new _element2.default('p'), 9, baseVersion);

					let transformed = (0, _transform2.default)(wrapDelta, splitDelta);

					expect(transformed.length).to.equal(1);

					baseVersion = wrapDelta.operations.length;

					(0, _utils2.expectDelta)(transformed[0], {
						type: _wrapdelta2.default,
						operations: [{
							type: _insertoperation2.default,
							position: new _position2.default(root, [3, 3, 5]),
							baseVersion: baseVersion
						}, {
							type: _moveoperation2.default,
							sourcePosition: new _position2.default(root, [3, 3, 2]),
							howMany: 3,
							targetPosition: new _position2.default(root, [3, 3, 5, 0]),
							baseVersion: baseVersion + 1
						}]
					});

					// Test if deltas do what they should after applying transformed delta.
					(0, _utils2.applyDelta)(splitDelta, doc);
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
