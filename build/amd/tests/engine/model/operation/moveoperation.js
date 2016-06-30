define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/model/_utils/utils.js'], function (_document, _moveoperation, _position, _element, _ckeditorerror, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('MoveOperation', () => {
		let doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
		});

		it('should have proper type', () => {
			const op = new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version);

			expect(op.type).to.equal('move');
		});

		it('should be sticky', () => {
			const op = new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version);

			expect(op.isSticky).to.be.false;
		});

		it('should move from one node to another', () => {
			let p1 = new _element2.default('p1', [], new _element2.default('x'));
			let p2 = new _element2.default('p2');

			root.insertChildren(0, [p1, p2]);

			doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(2);
			expect(root.getChild(0).name).to.equal('p1');
			expect(root.getChild(1).name).to.equal('p2');
			expect(p1.getChildCount()).to.equal(0);
			expect(p2.getChildCount()).to.equal(1);
			expect(p2.getChild(0).name).to.equal('x');
		});

		it('should move position of children in one node backward', () => {
			root.insertChildren(0, 'xbarx');

			doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [2]), 2, new _position2.default(root, [1]), doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(5);
			expect(root.getChild(0).character).to.equal('x');
			expect(root.getChild(1).character).to.equal('a');
			expect(root.getChild(2).character).to.equal('r');
			expect(root.getChild(3).character).to.equal('b');
			expect(root.getChild(4).character).to.equal('x');
		});

		it('should move position of children in one node forward', () => {
			root.insertChildren(0, 'xbarx');

			doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [1]), 2, new _position2.default(root, [4]), doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(5);
			expect(root.getChild(0).character).to.equal('x');
			expect(root.getChild(1).character).to.equal('r');
			expect(root.getChild(2).character).to.equal('b');
			expect(root.getChild(3).character).to.equal('a');
			expect(root.getChild(4).character).to.equal('x');
		});

		it('should create a proper MoveOperation as a reverse', () => {
			let sourcePosition = new _position2.default(root, [0]);
			let targetPosition = new _position2.default(root, [4]);

			let operation = new _moveoperation2.default(sourcePosition, 3, targetPosition, doc.version);
			let reverse = operation.getReversed();

			expect(reverse).to.be.an.instanceof(_moveoperation2.default);
			expect(reverse.baseVersion).to.equal(1);
			expect(reverse.howMany).to.equal(3);
			expect(reverse.sourcePosition.path).is.deep.equal([1]);
			expect(reverse.targetPosition.path).is.deep.equal([0]);

			operation = new _moveoperation2.default(targetPosition, 3, sourcePosition, doc.version);
			reverse = operation.getReversed();

			expect(reverse.sourcePosition.path).is.deep.equal([0]);
			expect(reverse.targetPosition.path).is.deep.equal([7]);
		});

		it('should undo move node by applying reverse operation', () => {
			let p1 = new _element2.default('p1', [], new _element2.default('x'));
			let p2 = new _element2.default('p2');

			root.insertChildren(0, [p1, p2]);

			let operation = new _moveoperation2.default(new _position2.default(root, [0, 0]), 1, new _position2.default(root, [1, 0]), doc.version);

			doc.applyOperation(operation);

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(2);
			expect(p1.getChildCount()).to.equal(0);
			expect(p2.getChildCount()).to.equal(1);
			expect(p2.getChild(0).name).to.equal('x');

			doc.applyOperation(operation.getReversed());

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(2);
			expect(p1.getChildCount()).to.equal(1);
			expect(p1.getChild(0).name).to.equal('x');
			expect(p2.getChildCount()).to.equal(0);
		});

		it('should throw an error if number of nodes to move exceeds the number of existing nodes in given element', () => {
			root.insertChildren(0, 'xbarx');

			let operation = new _moveoperation2.default(new _position2.default(root, [3]), 3, new _position2.default(root, [1]), doc.version);

			expect(() => doc.applyOperation(operation)).to.throw(_ckeditorerror2.default, /operation-move-nodes-do-not-exist/);
		});

		it('should throw an error if target or source parent-element specified by position does not exist', () => {
			let p = new _element2.default('p');
			p.insertChildren(0, 'foo');
			root.insertChildren(0, ['ab', p]);

			let operation = new _moveoperation2.default(new _position2.default(root, [2, 0]), 3, new _position2.default(root, [1]), doc.version);

			root.removeChildren(2, 1);

			expect(() => doc.applyOperation(operation)).to.throw(_ckeditorerror2.default, /operation-move-position-invalid/);
		});

		it('should throw an error if operation tries to move a range between the beginning and the end of that range', () => {
			root.insertChildren(0, 'xbarx');

			let operation = new _moveoperation2.default(new _position2.default(root, [1]), 3, new _position2.default(root, [2]), doc.version);

			expect(() => doc.applyOperation(operation)).to.throw(_ckeditorerror2.default, /operation-move-range-into-itself/);
		});

		it('should throw an error if operation tries to move a range into a sub-tree of a node that is in that range', () => {
			let p = new _element2.default('p', [], [new _element2.default('p')]);
			root.insertChildren(0, ['ab', p, 'xy']);

			let operation = new _moveoperation2.default(new _position2.default(root, [1]), 3, new _position2.default(root, [2, 0, 0]), doc.version);

			expect(() => doc.applyOperation(operation)).to.throw(_ckeditorerror2.default, /operation-move-node-into-itself/);
		});

		it('should not throw an error if operation move a range into a sibling', () => {
			let p = new _element2.default('p');
			root.insertChildren(0, ['ab', p, 'xy']);

			let operation = new _moveoperation2.default(new _position2.default(root, [1]), 1, new _position2.default(root, [2, 0]), doc.version);

			expect(() => {
				doc.applyOperation(operation);
			}).not.to.throw();

			expect(root.getChildCount()).to.equal(4);
			expect(p.getChildCount()).to.equal(1);
			expect(p.getChild(0).character).to.equal('b');
		});

		it('should not throw when operation paths looks like incorrect but move is between different roots', () => {
			let p = new _element2.default('p');
			root.insertChildren(0, ['a', p, 'b']);
			doc.graveyard.insertChildren(0, ['abc']);

			let operation = new _moveoperation2.default(new _position2.default(doc.graveyard, [0]), 2, new _position2.default(root, [1, 0]), doc.version);

			expect(() => {
				doc.applyOperation(operation);
			}).not.to.throw();
		});

		it('should create MoveOperation with the same parameters when cloned', () => {
			let sourcePosition = new _position2.default(root, [0]);
			let targetPosition = new _position2.default(root, [1]);
			let howMany = 4;
			let baseVersion = doc.version;

			let op = new _moveoperation2.default(sourcePosition, howMany, targetPosition, baseVersion);

			let clone = op.clone();

			// New instance rather than a pointer to the old instance.
			expect(clone).not.to.be.equal(op);

			expect(clone).to.be.instanceof(_moveoperation2.default);
			expect(clone.sourcePosition.isEqual(sourcePosition)).to.be.true;
			expect(clone.targetPosition.isEqual(targetPosition)).to.be.true;
			expect(clone.howMany).to.equal(howMany);
			expect(clone.baseVersion).to.equal(baseVersion);
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const sourcePosition = new _position2.default(root, [0, 0]);
				const targetPosition = new _position2.default(root, [1, 0]);
				const op = new _moveoperation2.default(sourcePosition, 1, targetPosition, doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.MoveOperation',
					baseVersion: 0,
					howMany: 1,
					isSticky: false,
					movedRangeStart: (0, _utils.jsonParseStringify)(op.movedRangeStart),
					sourcePosition: (0, _utils.jsonParseStringify)(sourcePosition),
					targetPosition: (0, _utils.jsonParseStringify)(targetPosition)
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper MoveOperation from json object', () => {
				const sourcePosition = new _position2.default(root, [0, 0]);
				const targetPosition = new _position2.default(root, [1, 0]);
				const op = new _moveoperation2.default(sourcePosition, 1, targetPosition, doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);
				const deserialized = _moveoperation2.default.fromJSON(serialized, doc);

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
