define('tests', ['/ckeditor5/engine/model/delta/basic-transformations.js', '/ckeditor5/engine/model/delta/transform.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/delta/delta.js', '/tests/engine/model/delta/transform/_utils/utils.js'], function (_basicTransformations, _transform, _position, _moveoperation, _delta, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _basicTransformations2 = _interopRequireDefault(_basicTransformations);

	var _transform2 = _interopRequireDefault(_transform);

	var _position2 = _interopRequireDefault(_position);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _delta2 = _interopRequireDefault(_delta);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Delta', () => {
		let doc, root, baseVersion;

		beforeEach(() => {
			doc = (0, _utils.getFilledDocument)();
			root = doc.getRoot('root');
			baseVersion = doc.version;
		});

		it('should have baseVersion property, equal to the baseVersion of first operation in Delta or null', () => {
			let deltaA = new _delta2.default();

			expect(deltaA.baseVersion).to.be.null;

			let version = 5;

			deltaA.addOperation(new _moveoperation2.default(new _position2.default(root, [1, 2, 3]), 4, new _position2.default(root, [4, 0]), version));

			expect(deltaA.baseVersion).to.equal(5);
		});

		it('should be transformable by another Delta', () => {
			let deltaA = new _delta2.default();
			let deltaB = new _delta2.default();

			deltaA.addOperation(new _moveoperation2.default(new _position2.default(root, [1, 2, 3]), 4, new _position2.default(root, [4, 0]), baseVersion));
			deltaB.addOperation(new _moveoperation2.default(new _position2.default(root, [1, 2, 0]), 2, new _position2.default(root, [4, 1]), baseVersion));

			let deltaAbyB = (0, _transform2.default)(deltaA, deltaB);
			let deltaBbyA = (0, _transform2.default)(deltaB, deltaA);

			expect(deltaAbyB.length).to.equal(1);

			(0, _utils.expectDelta)(deltaAbyB[0], {
				type: _delta2.default,
				operations: [{
					type: _moveoperation2.default,
					sourcePosition: new _position2.default(root, [1, 2, 1]),
					howMany: 4,
					targetPosition: new _position2.default(root, [4, 0]),
					baseVersion: 1
				}]
			});

			expect(deltaBbyA.length).to.equal(1);

			(0, _utils.expectDelta)(deltaBbyA[0], {
				type: _delta2.default,
				operations: [{
					type: _moveoperation2.default,
					sourcePosition: new _position2.default(root, [1, 2, 0]),
					howMany: 2,
					targetPosition: new _position2.default(root, [4, 5]),
					baseVersion: 1
				}]
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
