define('tests', ['/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/operation/attributeoperation.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/engine/model/range.js', '/ckeditor5/engine/model/text.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/engine/model/_utils/utils.js'], function (_document, _element, _attributeoperation, _position, _range, _text, _ckeditorerror, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model, operation */

	'use strict';

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _attributeoperation2 = _interopRequireDefault(_attributeoperation);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _text2 = _interopRequireDefault(_text);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('AttributeOperation', () => {
		let doc, root;

		beforeEach(() => {
			doc = new _document2.default();
			root = doc.createRoot('root');
		});

		describe('type', () => {
			it('should be addAttribute for adding attribute', () => {
				const op = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2])), 'key', null, 'newValue', doc.version);

				expect(op.type).to.equal('addAttribute');
			});

			it('should be removeAttribute for removing attribute', () => {
				const op = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2])), 'key', 'oldValue', null, doc.version);

				expect(op.type).to.equal('removeAttribute');
			});

			it('should be changeAttribute for removing attribute', () => {
				const op = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2])), 'key', 'oldValue', 'newValue', doc.version);

				expect(op.type).to.equal('changeAttribute');
			});
		});

		it('should insert attribute to the set of nodes', () => {
			root.insertChildren(0, 'bar');

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2])), 'isNew', null, true, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0).hasAttribute('isNew')).to.be.true;
			expect(root.getChild(1).hasAttribute('isNew')).to.be.true;
			expect(root.getChild(2)._attrs.size).to.equal(0);
		});

		it('should add attribute to the existing attributes', () => {
			root.insertChildren(0, new _text2.default('x', { foo: true, bar: true }));

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'isNew', null, true, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(1);
			expect(root.getChild(0)._attrs.size).to.equal(3);
			expect(root.getChild(0).hasAttribute('isNew')).to.be.true;
			expect(root.getChild(0).hasAttribute('foo')).to.be.true;
			expect(root.getChild(0).hasAttribute('bar')).to.be.true;
		});

		it('should change attribute to the set of nodes', () => {
			root.insertChildren(0, new _text2.default('bar', { isNew: false }));

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2])), 'isNew', false, true, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0)._attrs.size).to.equal(1);
			expect(root.getChild(0).getAttribute('isNew')).to.be.true;
			expect(root.getChild(1)._attrs.size).to.equal(1);
			expect(root.getChild(1).getAttribute('isNew')).to.be.true;
			expect(root.getChild(2)._attrs.size).to.equal(1);
			expect(root.getChild(2).getAttribute('isNew')).to.be.false;
		});

		it('should change attribute in the middle of existing attributes', () => {
			root.insertChildren(0, new _text2.default('x', { foo: true, x: 1, bar: true }));

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'x', 1, 2, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(1);
			expect(root.getChild(0)._attrs.size).to.equal(3);
			expect(root.getChild(0).getAttribute('foo')).to.be.true;
			expect(root.getChild(0).getAttribute('x')).to.equal(2);
			expect(root.getChild(0).getAttribute('bar')).to.be.true;
		});

		it('should remove attribute', () => {
			root.insertChildren(0, new _text2.default('x', { foo: true, x: true, bar: true }));

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'x', true, null, doc.version));

			expect(doc.version).to.equal(1);
			expect(root.getChildCount()).to.equal(1);
			expect(root.getChild(0)._attrs.size).to.equal(2);
			expect(root.getChild(0).hasAttribute('foo')).to.be.true;
			expect(root.getChild(0).hasAttribute('bar')).to.be.true;
		});

		it('should create an AttributeOperation as a reverse', () => {
			let range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [3]));
			let operation = new _attributeoperation2.default(range, 'x', 'old', 'new', doc.version);
			let reverse = operation.getReversed();

			expect(reverse).to.be.an.instanceof(_attributeoperation2.default);
			expect(reverse.baseVersion).to.equal(1);
			expect(reverse.range.isEqual(range)).to.be.true;
			expect(reverse.key).to.equal('x');
			expect(reverse.oldValue).to.equal('new');
			expect(reverse.newValue).to.equal('old');
		});

		it('should undo adding attribute by applying reverse operation', () => {
			root.insertChildren(0, 'bar');

			let operation = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [3])), 'isNew', null, true, doc.version);

			let reverse = operation.getReversed();

			doc.applyOperation(operation);
			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0)._attrs.size).to.equal(0);
			expect(root.getChild(1)._attrs.size).to.equal(0);
			expect(root.getChild(2)._attrs.size).to.equal(0);
		});

		it('should not set attribute of element if change range starts in the middle of that element', () => {
			let eleA = new _element2.default('a', [], 'abc');
			let eleB = new _element2.default('b', [], 'xyz');

			root.insertChildren(0, [eleA, eleB]);

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0, 2]), new _position2.default(root, [1, 2])), 'foo', null, true, doc.version));

			expect(root.getChild(0).hasAttribute('foo')).to.be.false;
		});

		it('should not remove attribute of element if change range starts in the middle of that element', () => {
			let fooAttr = { foo: true };

			let eleA = new _element2.default('a', fooAttr, 'abc');
			let eleB = new _element2.default('b', fooAttr, 'xyz');

			root.insertChildren(0, [eleA, eleB]);

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0, 3]), new _position2.default(root, [1, 0])), 'foo', true, null, doc.version));

			expect(root.getChild(0).hasAttribute('foo')).to.be.true;
		});

		it('should undo changing attribute by applying reverse operation', () => {
			root.insertChildren(0, new _text2.default('bar', { isNew: false }));

			let operation = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [3])), 'isNew', false, true, doc.version);

			let reverse = operation.getReversed();

			doc.applyOperation(operation);
			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0)._attrs.size).to.equal(1);
			expect(root.getChild(0).getAttribute('isNew')).to.be.false;
			expect(root.getChild(1)._attrs.size).to.equal(1);
			expect(root.getChild(1).getAttribute('isNew')).to.be.false;
			expect(root.getChild(2)._attrs.size).to.equal(1);
			expect(root.getChild(2).getAttribute('isNew')).to.be.false;
		});

		it('should undo remove attribute by applying reverse operation', () => {
			root.insertChildren(0, new _text2.default('bar', { foo: true }));

			let operation = new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [3])), 'foo', true, null, doc.version);

			let reverse = operation.getReversed();

			doc.applyOperation(operation);
			doc.applyOperation(reverse);

			expect(doc.version).to.equal(2);
			expect(root.getChildCount()).to.equal(3);
			expect(root.getChild(0)._attrs.size).to.equal(1);
			expect(root.getChild(0).getAttribute('foo')).to.be.true;
			expect(root.getChild(1)._attrs.size).to.equal(1);
			expect(root.getChild(1).getAttribute('foo')).to.be.true;
			expect(root.getChild(2)._attrs.size).to.equal(1);
			expect(root.getChild(2).getAttribute('foo')).to.be.true;
		});

		it('should throw an error when one try to remove and the attribute does not exists', () => {
			root.insertChildren(0, 'x');

			expect(() => {
				doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'foo', true, null, doc.version));
			}).to.throw(_ckeditorerror2.default, /operation-attribute-no-attr-to-remove/);
		});

		it('should throw an error when one try to insert and the attribute already exists', () => {
			root.insertChildren(0, new _text2.default('x', { x: 1 }));

			expect(() => {
				doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1])), 'x', null, 2, doc.version));
			}).to.throw(_ckeditorerror2.default, /operation-attribute-attr-exists/);
		});

		it('should create an AttributeOperation with the same parameters when cloned', () => {
			let range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [1]));
			let baseVersion = doc.version;

			let op = new _attributeoperation2.default(range, 'foo', 'old', 'new', baseVersion);

			let clone = op.clone();

			// New instance rather than a pointer to the old instance.
			expect(clone).not.to.be.equal(op);

			expect(clone).to.be.instanceof(_attributeoperation2.default);
			expect(clone.range.isEqual(range)).to.be.true;
			expect(clone.key).to.equal('foo');
			expect(clone.oldValue).to.equal('old');
			expect(clone.newValue).to.equal('new');
			expect(clone.baseVersion).to.equal(baseVersion);
		});

		it('should merge characters in node list', () => {
			let attrA = { foo: 'a' };
			let attrB = { foo: 'b' };

			root.insertChildren(0, new _text2.default('abc', attrA));
			root.insertChildren(3, new _text2.default('xyz', attrB));

			doc.applyOperation(new _attributeoperation2.default(new _range2.default(new _position2.default(root, [1]), new _position2.default(root, [3])), 'foo', 'a', 'b', doc.version));

			expect(root._children._nodes[0].text).to.equal('a');
			expect(root._children._nodes[1].text).to.equal('bcxyz');
		});

		describe('toJSON', () => {
			it('should create proper serialized object', () => {
				const range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2]));
				const op = new _attributeoperation2.default(range, 'key', null, 'newValue', doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);

				expect(serialized.__className).to.equal('engine.model.operation.AttributeOperation');
				expect(serialized).to.deep.equal({
					__className: 'engine.model.operation.AttributeOperation',
					baseVersion: 0,
					key: 'key',
					newValue: 'newValue',
					oldValue: null,
					range: (0, _utils.jsonParseStringify)(range)
				});
			});
		});

		describe('fromJSON', () => {
			it('should create proper AttributeOperation from json object', () => {
				const range = new _range2.default(new _position2.default(root, [0]), new _position2.default(root, [2]));
				const op = new _attributeoperation2.default(range, 'key', null, 'newValue', doc.version);

				const serialized = (0, _utils.jsonParseStringify)(op);
				const deserialized = _attributeoperation2.default.fromJSON(serialized, doc);

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
