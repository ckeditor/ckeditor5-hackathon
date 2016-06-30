define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js', '/ckeditor5/engine/model/delta/mergedelta.js', '/ckeditor5/engine/model/delta/splitdelta.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (_document, _position, _element, _ckeditorerror, _mergedelta, _splitdelta, _insertoperation, _moveoperation, _removeoperation) {
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

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Batch', () => {
		let doc, root, p;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');

			p = new _element2.default('p', { key: 'value' }, 'foobar');

			root.insertChildren(0, p);
		});

		describe('split', () => {
			it('should split foobar to foo and bar', () => {
				doc.batch().split(new _position2.default(root, [0, 3]));

				expect(root.getChildCount()).to.equal(2);

				expect(root.getChild(0).name).to.equal('p');
				expect(root.getChild(0).getChildCount()).to.equal(3);
				expect(root.getChild(0)._attrs.size).to.equal(1);
				expect(root.getChild(0).getAttribute('key')).to.equal('value');
				expect(root.getChild(0).getChild(0).character).to.equal('f');
				expect(root.getChild(0).getChild(1).character).to.equal('o');
				expect(root.getChild(0).getChild(2).character).to.equal('o');

				expect(root.getChild(1).name).to.equal('p');
				expect(root.getChild(1).getChildCount()).to.equal(3);
				expect(root.getChild(1)._attrs.size).to.equal(1);
				expect(root.getChild(1).getAttribute('key')).to.equal('value');
				expect(root.getChild(1).getChild(0).character).to.equal('b');
				expect(root.getChild(1).getChild(1).character).to.equal('a');
				expect(root.getChild(1).getChild(2).character).to.equal('r');
			});

			it('should create an empty paragraph if we split at the end', () => {
				doc.batch().split(new _position2.default(root, [0, 6]));

				expect(root.getChildCount()).to.equal(2);

				expect(root.getChild(0).name).to.equal('p');
				expect(root.getChild(0).getChildCount()).to.equal(6);
				expect(root.getChild(0)._attrs.size).to.equal(1);
				expect(root.getChild(0).getAttribute('key')).to.equal('value');
				expect(root.getChild(0).getChild(0).character).to.equal('f');
				expect(root.getChild(0).getChild(1).character).to.equal('o');
				expect(root.getChild(0).getChild(2).character).to.equal('o');
				expect(root.getChild(0).getChild(3).character).to.equal('b');
				expect(root.getChild(0).getChild(4).character).to.equal('a');
				expect(root.getChild(0).getChild(5).character).to.equal('r');

				expect(root.getChild(1).name).to.equal('p');
				expect(root.getChild(1).getChildCount()).to.equal(0);
				expect(root.getChild(1)._attrs.size).to.equal(1);
				expect(root.getChild(1).getAttribute('key')).to.equal('value');
			});

			it('should throw if we try to split a root', () => {
				expect(() => {
					doc.batch().split(new _position2.default(root, [0]));
				}).to.throw(_ckeditorerror2.default, /^batch-split-root/);
			});

			it('should be chainable', () => {
				const batch = doc.batch();

				const chain = batch.split(new _position2.default(root, [0, 3]));
				expect(chain).to.equal(batch);
			});

			it('should add delta to batch and operation to delta before applying operation', () => {
				sinon.spy(doc, 'applyOperation');
				const batch = doc.batch().split(new _position2.default(root, [0, 3]));

				const correctDeltaMatcher = sinon.match(operation => {
					return operation.delta && operation.delta.batch && operation.delta.batch == batch;
				});

				expect(doc.applyOperation.calledWith(correctDeltaMatcher)).to.be.true;
			});
		});
	});

	describe('SplitDelta', () => {
		let splitDelta, doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			splitDelta = new _splitdelta2.default();
		});

		describe('constructor', () => {
			it('should create split delta with no operations added', () => {
				expect(splitDelta.operations.length).to.equal(0);
			});
		});

		describe('position', () => {
			it('should be null if there are no operations in delta', () => {
				expect(splitDelta.position).to.be.null;
			});

			it('should be equal to the position where node is split', () => {
				splitDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 2]), new _element2.default('p'), 0));
				splitDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1, 4]), 4, new _position2.default(root, [1, 2, 0]), 1));

				expect(splitDelta.position.root).to.equal(root);
				expect(splitDelta.position.path).to.deep.equal([1, 1, 4]);
			});
		});

		describe('getReversed', () => {
			it('should return empty MergeDelta if there are no operations in delta', () => {
				let reversed = splitDelta.getReversed();

				expect(reversed).to.be.instanceof(_mergedelta2.default);
				expect(reversed.operations.length).to.equal(0);
			});

			it('should return correct SplitDelta', () => {
				splitDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 2]), new _element2.default('p'), 0));
				splitDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1, 4]), 4, new _position2.default(root, [1, 2, 0]), 1));

				let reversed = splitDelta.getReversed();

				expect(reversed).to.be.instanceof(_mergedelta2.default);
				expect(reversed.operations.length).to.equal(2);

				expect(reversed.operations[0]).to.be.instanceof(_moveoperation2.default);
				expect(reversed.operations[0].sourcePosition.path).to.deep.equal([1, 2, 0]);
				expect(reversed.operations[0].howMany).to.equal(4);
				expect(reversed.operations[0].targetPosition.path).to.deep.equal([1, 1, 4]);

				expect(reversed.operations[1]).to.be.instanceof(_removeoperation2.default);
				expect(reversed.operations[1].sourcePosition.path).to.deep.equal([1, 2]);
				expect(reversed.operations[1].howMany).to.equal(1);
			});
		});

		describe('_cloneOperation', () => {
			it('should return null if delta has no operations', () => {
				expect(splitDelta._cloneOperation).to.be.null;
			});

			it('should return the first operation in the delta, which is InsertOperation or ReinsertOperation', () => {
				let p = new _element2.default('p');
				splitDelta.operations.push(new _insertoperation2.default(new _position2.default(root, [1, 2]), p, 0));
				splitDelta.operations.push(new _moveoperation2.default(new _position2.default(root, [1, 1, 4]), 4, new _position2.default(root, [1, 2, 0]), 1));

				expect(splitDelta._cloneOperation).to.be.instanceof(_insertoperation2.default);
				expect(splitDelta._cloneOperation.nodeList.get(0)).to.equal(p);
				expect(splitDelta._cloneOperation.position.path).to.deep.equal([1, 2]);
			});
		});

		it('should provide proper className', () => {
			expect(_splitdelta2.default.className).to.equal('engine.model.delta.SplitDelta');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
