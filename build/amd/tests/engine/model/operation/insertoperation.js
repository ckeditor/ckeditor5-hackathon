define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/node.js', '/ckeditor5/engine/model/nodelist.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/text.js', '/tests/engine/model/_utils/utils.js'], function (_document, _node, _nodelist, _insertoperation, _removeoperation, _position, _text, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _node2 = _interopRequireDefault(_node);

	var _nodelist2 = _interopRequireDefault(_nodelist);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _position2 = _interopRequireDefault(_position);

	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('InsertOperation', () => {
		let doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
		});

		it('should have proper type', () => {
			const op = new _insertoperation2.default(new _position2.default(root, [0]), new _text2.default('x'), doc.version);

			expect(op.type).to.equal('insert');
		});

		it('should insert node', () => {
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), new _text2.default('x'), doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(1);
			expect(root.getChild(0).character).to.equal('x');
		});

		it('should insert set of nodes', () => {
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), 'bar', doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0).character).to.equal('b');
			expect(root.getChild(1).character).to.equal('a');
			expect(root.getChild(2).character).to.equal('r');
		});

		it('should insert between existing nodes', () => {
			root.insertChildren(0, 'xy');

			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [1]), 'bar', doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(5);
			expect(root.getChild(0).character).to.equal('x');
			expect(root.getChild(1).character).to.equal('b');
			expect(root.getChild(2).character).to.equal('a');
			expect(root.getChild(3).character).to.equal('r');
			expect(root.getChild(4).character).to.equal('y');
		});

		it('should insert text', () => {
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), ['foo', new _text2.default('x'), 'bar'], doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(7);
			expect(root.getChild(0).character).to.equal('f');
			expect(root.getChild(1).character).to.equal('o');
			expect(root.getChild(2).character).to.equal('o');
			expect(root.getChild(3).character).to.equal('x');
			expect(root.getChild(4).character).to.equal('b');
			expect(root.getChild(5).character).to.equal('a');
			expect(root.getChild(6).character).to.equal('r');
		});

		it('should create a RemoveOperation as a reverse', () => {
			let position = new _position2.default(root, [0]);
			let operation = new _insertoperation2.default(position, ['foo', new _text2.default('x'), 'bar'], 0);

			let reverse = operation.getReversed();

			expect(reverse).to.be.an.instanceof(_removeoperation2.default);
			expect(reverse.baseVersion).to.equal(1);
			expect(reverse.sourcePosition.isEqual(position)).to.be.true;
			expect(reverse.howMany).to.equal(7);
		});

		it('should undo insert node by applying reverse operation', () => {
			let operation = new _insertoperation2.default(new _position2.default(root, [0]), new _text2.default('x'), doc.version);

			let reverse = operation.getReversed();

			doc.applyOperation(operation);

			expect(doc.version).to.equal(1);

			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(0);
		});

		it('should undo insert set of nodes by applying reverse operation', () => {
			let operation = new _insertoperation2.default(new _position2.default(root, [0]), 'bar', doc.version);

			let reverse = operation.getReversed();

			doc.applyOperation(operation);

			expect(doc.version).to.equal(1);

			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(0);
		});

		it('should create operation with the same parameters when cloned', () => {
			let position = new _position2.default(root, [0]);
			let nodeA = new _node2.default();
			let nodeB = new _node2.default();
			let nodes = new _nodelist2.default([nodeA, nodeB]);
			let baseVersion = doc.version;

			let op = new _insertoperation2.default(position, nodes, baseVersion);

			let clone = op.clone();

			// New instance rather than a pointer to the old instance.
			expect(clone).not.to.be.equal(op);

			expect(clone).to.be.instanceof(_insertoperation2.default);
			expect(clone.position.isEqual(position)).to.be.true;
			expect(clone.nodeList.get(0)).to.equal(nodeA);
			expect(clone.nodeList.get(1)).to.equal(nodeB);
			expect(clone.nodeList.length).to.equal(2);
			expect(clone.baseVersion).to.equal(baseVersion);
		});

		describe('toJSON', () => {
			it('should create proper json object', () => {
				const position = new _position2.default(root, [0]);
				const op = new _insertoperation2.default(position, new _text2.default('x'), doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);

				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.InsertOperation',
					baseVersion: 0,
					nodeList: (0, _utils.jsonParseStringify)(new _nodelist2.default('x')),
					position: (0, _utils.jsonParseStringify)(position)
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper InsertOperation from json object', () => {
				const position = new _position2.default(root, [0]);
				const op = new _insertoperation2.default(position, new _text2.default('x'), doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);
				const deserialized = _insertoperation2.default.fromJSON(serialized, doc);

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
