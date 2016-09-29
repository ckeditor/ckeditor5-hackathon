define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/operation/reinsertoperation.js'], function (_document, _position, _element, _ckeditorerror, _mergedelta, _splitdelta, _moveoperation, _removeoperation, _reinsertoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, delta */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, p1, p2, batch;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			p1 = new _element2.default('p', { key1: 'value1' }, 'foo');
			p2 = new _element2.default('p', { key2: 'value2' }, 'bar');

			root.insertChildren(0, [p1, p2]);
		});

		describe('merge', () => {
			it('should merge foo and bar into foobar', () => {
				doc.batch().merge(new _position2.default(root, [1]));

				expect(root.getChildCount()).to.equal(1);
				expect(root.getChild(0).name).to.equal('p');
				expect(root.getChild(0).getChildCount()).to.equal(6);
				expect(root.getChild(0)._attrs.size).to.equal(1);
				expect(root.getChild(0).getAttribute('key1')).to.equal('value1');
				expect(root.getChild(0).getChild(0).character).to.equal('f');
				expect(root.getChild(0).getChild(1).character).to.equal('o');
				expect(root.getChild(0).getChild(2).character).to.equal('o');
				expect(root.getChild(0).getChild(3).character).to.equal('b');
				expect(root.getChild(0).getChild(4).character).to.equal('a');
				expect(root.getChild(0).getChild(5).character).to.equal('r');
			});

			it('should throw if there is no element after', () => {
				expect(() => {
					doc.batch().merge(new _position2.default(root, [2]));
				}).to.throw(_ckeditorerror2.default, /^batch-merge-no-element-after/);
			});

			it('should throw if there is no element before', () => {
				expect(() => {
					doc.batch().merge(new _position2.default(root, [0, 2]));
				}).to.throw(_ckeditorerror2.default, /^batch-merge-no-element-before/);
			});

			it('should be chainable', () => {
				batch = doc.batch();

				const chain = batch.merge(new _position2.default(root, [1]));
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				batch = doc.batch().merge(new _position2.default(root, [1]));

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('MergeDelta', () => {
		let mergeDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			mergeDelta = new _mergedelta2.default();
		});

		describe('constructor', () => {
			it('should create merge delta with no operations added', () => {
				expect(mergeDelta.operations.length).to.equal(0);
			});
		});

		describe('position', () => {
			it('should be null if there are no operations in delta', () => {
				expect(mergeDelta.position).to.be.null;
			});

			it('should be equal to the position between merged nodes', () => {
				mergeDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 2, 0]), 4, new _position2.default(root, [1, 1, 4])));
				mergeDelta.operations.push(new _removeoperation2.default(new _position2.default(root, [1, 2, 0]), 1));

				expect(mergeDelta.position.root).to.equal(root);
				expect(mergeDelta.position.path).to.deep.equal([1, 2, 0]);
			});
		});

		describe('getReversed', () => {
			it('should return empty SplitDelta if there are no operations in delta', () => {
				let reversed = mergeDelta.getReversed();

				expect(reversed).to.be.instanceof(_splitdelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct SplitDelta', () => {
				mergeDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 2, 0]), 4, new _position2.default(root, [1, 1, 4])));
				mergeDelta.operations.push(new _removeoperation2.default(new _position2.default(root, [1, 2, 0]), 1));

				let reversed = mergeDelta.getReversed();

				expect(reversed).to.be.instanceof(_splitdelta2.default);
				expect(reversed.operations.length).to.equal(2);

				expect(reversed.operations[0]).to.be.instanceof(_reinsertoperation2.default);
				expect(reversed.operations[0].howMany).to.equal(1);
				expect(reversed.operations[0].targetPosition.path).to.deep.equal([1, 2, 0]);

				expect(reversed.operations[1]).to.be.instanceof(_moveoperation2.default);
				expect(reversed.operations[1].sourcePosition.path).to.deep.equal([1, 1, 4]);
				expect(reversed.operations[1].howMany).to.equal(4);
				expect(reversed.operations[1].targetPosition.path).to.deep.equal([1, 2, 0]);
			});
		});

		it('should provide proper className', () => {
			expect(_mergedelta2.default.className).to.equal('engine.model.delta.MergeDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
