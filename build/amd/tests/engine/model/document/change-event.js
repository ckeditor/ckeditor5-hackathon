define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/ckeditor5/engine/model/operation/insertoperation.js', '/ckeditor5/engine/model/operation/moveoperation.js', '/ckeditor5/engine/model/operation/removeoperation.js'], function (_document, _element, _position, _range, _attributeoperation, _insertoperation, _moveoperation, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Document change event', () => {
		let doc, root, graveyard, types, changes;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
			graveyard = doc.graveyard;

			types = [];
			changes = [];

			doc.on('change', (evt, type, change) => {
				types.push(type);
				changes.push(change);
			});
		});

		it('should be fired when text is inserted', () => {
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), 'foo', doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('insert');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, root, 3));
		});

		it('should be fired when element is inserted', () => {
			const element = new _element2.default('p');
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), element, doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('insert');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, root, 1));
		});

		it('should be fired when nodes are inserted', () => {
			const element = new _element2.default('p');
			doc.applyOperation(new _insertoperation2.default(new _position2.default(root, [0]), [element, 'foo'], doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('insert');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, root, 4));
		});

		it('should be fired when nodes are moved', () => {
			const p1 = new _element2.default('p');
			p1.insertChildren(0, [new _element2.default('p'), 'foo']);

			const p2 = new _element2.default('p');

			root.insertChildren(0, [p1, p2]);

			doc.applyOperation(new _moveoperation2.default(new _position2.default(root, [0, 0]), 3, new _position2.default(root, [1, 0]), doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('move');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(p2, 0, p2, 3));
			expect(changes[0].sourcePosition).to.deep.equal(_position2.default.createFromParentAndOffset(p1, 0));
		});

		it('should be fired when multiple nodes are removed and reinserted', () => {
			root.insertChildren(0, 'foo');

			const removeOperation = new _removeoperation2.default(new _position2.default(root, [0]), 3, doc.version);
			doc.applyOperation(removeOperation);

			const reinsertOperation = removeOperation.getReversed();
			doc.applyOperation(reinsertOperation);

			expect(changes).to.have.length(2);

			expect(types[0]).to.equal('remove');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(graveyard, 0, graveyard, 3));
			expect(changes[0].sourcePosition).to.deep.equal(_position2.default.createFromParentAndOffset(root, 0));

			expect(types[1]).to.equal('reinsert');
			expect(changes[1].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, root, 3));
			expect(changes[1].sourcePosition).to.deep.equal(_position2.default.createFromParentAndOffset(graveyard, 0));
		});

		it('should be fired when attribute is inserted', () => {
			root.insertChildren(0, 'foo');

			doc.applyOperation(new _attributeoperation2.default(_range2.default.createFromParentsAndOffsets(root, 0, root, 3), 'key', null, 'new', doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('addAttribute');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, root, 3));
			expect(changes[0].key).to.equal('key');
			expect(changes[0].oldValue).to.be.null;
			expect(changes[0].newValue).to.equal('new');
		});

		it('should be fired when attribute is removed', () => {
			const elem = new _element2.default('p', { key: 'old' });
			root.insertChildren(0, elem);

			doc.applyOperation(new _attributeoperation2.default(_range2.default.createFromParentsAndOffsets(root, 0, elem, 0), 'key', 'old', null, doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('removeAttribute');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, elem, 0));
			expect(changes[0].key).to.equal('key');
			expect(changes[0].oldValue).to.equal('old');
			expect(changes[0].newValue).to.be.null;
		});

		it('should be fired when attribute changes', () => {
			const elem = new _element2.default('p', { key: 'old' });
			root.insertChildren(0, elem);

			doc.applyOperation(new _attributeoperation2.default(_range2.default.createFromParentsAndOffsets(root, 0, elem, 0), 'key', 'old', 'new', doc.version));

			expect(changes).to.have.length(1);
			expect(types[0]).to.equal('changeAttribute');
			expect(changes[0].range).to.deep.equal(_range2.default.createFromParentsAndOffsets(root, 0, elem, 0));
			expect(changes[0].key).to.equal('key');
			expect(changes[0].oldValue).to.equal('old');
			expect(changes[0].newValue).to.equal('new');
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
