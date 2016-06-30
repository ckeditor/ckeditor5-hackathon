define('tests', ['/ckeditor5/engine/model/schema.js', '/ckeditor5/engine/model/document.js', '/ckeditor5/engine/model/element.js', '/ckeditor5/engine/model/position.js', '/ckeditor5/utils/ckeditorerror.js', '/tests/ckeditor5/_utils/utils.js'], function (_schema, _document, _element, _position, _ckeditorerror, _utils) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: model */

	'use strict';

	var _schema2 = _interopRequireDefault(_schema);

	var _document2 = _interopRequireDefault(_document);

	var _element2 = _interopRequireDefault(_element);

	var _position2 = _interopRequireDefault(_position);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	let schema;

	beforeEach(() => {
		schema = new _schema2.default();
	});

	describe('constructor', () => {
		it('should register base items: inline, block, root', () => {
			_utils2.default.sinon.spy(_schema2.default.prototype, 'registerItem');

			schema = new _schema2.default();

			expect(schema.registerItem.calledWithExactly('$root', null));
			expect(schema.registerItem.calledWithExactly('$block', null));
			expect(schema.registerItem.calledWithExactly('$inline', null));
		});

		it('should allow block in root', () => {
			expect(schema.check({ name: '$block', inside: ['$root'] })).to.be.true;
		});

		it('should allow inline in block', () => {
			expect(schema.check({ name: '$inline', inside: ['$block'] })).to.be.true;
		});
	});

	describe('registerItem', () => {
		it('should register in schema item under given name', () => {
			schema.registerItem('new');

			expect(schema.hasItem('new')).to.be.true;
		});

		it('should build correct base chains', () => {
			schema.registerItem('first');
			schema.registerItem('secondA', 'first');
			schema.registerItem('secondB', 'first');
			schema.registerItem('third', 'secondA');

			expect(schema._extensionChains.get('first')).to.deep.equal(['first']);
			expect(schema._extensionChains.get('secondA')).to.deep.equal(['first', 'secondA']);
			expect(schema._extensionChains.get('secondB')).to.deep.equal(['first', 'secondB']);
			expect(schema._extensionChains.get('third')).to.deep.equal(['first', 'secondA', 'third']);
		});

		it('should make registered item inherit allows from base item', () => {
			schema.registerItem('image', '$inline');

			expect(schema.check({ name: 'image', inside: ['$block'] })).to.be.true;
		});

		it('should throw if item with given name has already been registered in schema', () => {
			schema.registerItem('new');

			expect(() => {
				schema.registerItem('new');
			}).to.throw(_ckeditorerror2.default, /schema-item-exists/);
		});

		it('should throw if base item has not been registered in schema', () => {
			expect(() => {
				schema.registerItem('new', 'old');
			}).to.throw(_ckeditorerror2.default, /schema-no-item/);
		});
	});

	describe('hasItem', () => {
		it('should return true if given item name has been registered in schema', () => {
			expect(schema.hasItem('$block')).to.be.true;
		});

		it('should return false if given item name has not been registered in schema', () => {
			expect(schema.hasItem('new')).to.be.false;
		});
	});

	describe('_getItem', () => {
		it('should return SchemaItem registered under given name', () => {
			schema.registerItem('new');

			let item = schema._getItem('new');

			expect(item).to.be.instanceof(_schema.SchemaItem);
		});

		it('should throw if there is no item registered under given name', () => {
			expect(() => {
				schema._getItem('new');
			}).to.throw(_ckeditorerror2.default, /schema-no-item/);
		});
	});

	describe('allow', () => {
		it('should add passed query to allowed in schema', () => {
			schema.registerItem('p', '$block');
			schema.registerItem('div', '$block');

			expect(schema.check({ name: 'p', inside: ['div'] })).to.be.false;

			schema.allow({ name: 'p', inside: 'div' });

			expect(schema.check({ name: 'p', inside: ['div'] })).to.be.true;
		});
	});

	describe('disallow', () => {
		it('should add passed query to disallowed in schema', () => {
			schema.registerItem('p', '$block');
			schema.registerItem('div', '$block');

			schema.allow({ name: '$block', attributes: 'bold', inside: 'div' });

			expect(schema.check({ name: 'p', attributes: 'bold', inside: ['div'] })).to.be.true;

			schema.disallow({ name: 'p', attributes: 'bold', inside: 'div' });

			expect(schema.check({ name: 'p', attributes: 'bold', inside: ['div'] })).to.be.false;
		});
	});

	describe('check', () => {
		describe('string or array of strings as inside', () => {
			it('should return false if given element is not registered in schema', () => {
				expect(schema.check({ name: 'new', inside: ['div', 'header'] })).to.be.false;
			});

			it('should handle path given as string', () => {
				expect(schema.check({ name: '$inline', inside: '$block $block $block' })).to.be.true;
			});

			it('should handle attributes', () => {
				schema.registerItem('p', '$block');
				schema.allow({ name: 'p', inside: '$block' });

				expect(schema.check({ name: 'p', inside: ['$block'] })).to.be.true;
				expect(schema.check({ name: 'p', inside: ['$block'], attributes: 'bold' })).to.be.false;
			});

			it('should support required attributes', () => {
				schema.registerItem('a', '$inline');
				schema.requireAttributes('a', ['name']);
				schema.requireAttributes('a', ['href']);
				schema.allow({ name: 'a', inside: '$block', attributes: ['name', 'href', 'title', 'target'] });

				// Even though a is allowed in $block thanks to inheriting from $inline, we require href or name attribute.
				expect(schema.check({ name: 'a', inside: '$block' })).to.be.false;

				// Even though a with title is allowed, we have to meet at least on required attributes set.
				expect(schema.check({ name: 'a', inside: '$block', attributes: ['title'] })).to.be.false;

				expect(schema.check({ name: 'a', inside: '$block', attributes: ['name'] })).to.be.true;
				expect(schema.check({ name: 'a', inside: '$block', attributes: ['href'] })).to.be.true;
				expect(schema.check({ name: 'a', inside: '$block', attributes: ['name', 'href'] })).to.be.true;
				expect(schema.check({ name: 'a', inside: '$block', attributes: ['name', 'title', 'target'] })).to.be.true;
			});

			it('should not require attributes from parent schema items', () => {
				schema.registerItem('parent');
				schema.registerItem('child', 'parent');
				schema.allow({ name: 'parent', inside: '$block' });
				schema.requireAttributes('parent', ['required']);

				// Even though we require "required" attribute on parent, the requirement should not be inherited.
				expect(schema.check({ name: 'child', inside: '$block' })).to.be.true;
			});

			it('should support multiple attributes', () => {
				// Let's take example case, where image item has to have a pair of "alt" and "src" attributes.
				// Then it could have other attribute which is allowed on inline elements, i.e. "bold".
				schema.registerItem('img', '$inline');
				schema.requireAttributes('img', ['alt', 'src']);
				schema.allow({ name: '$inline', inside: '$block', attributes: 'bold' });
				schema.allow({ name: 'img', inside: '$block', attributes: ['alt', 'src'] });

				// Image without any attributes is not allowed.
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt'] })).to.be.false;

				// Image can't have just alt or src.
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt'] })).to.be.false;
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['src'] })).to.be.false;

				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt', 'src'] })).to.be.true;

				// Because of inherting from $inline, image can have bold
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt', 'src', 'bold'] })).to.be.true;
				// But it can't have only bold without alt or/and src.
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt', 'bold'] })).to.be.false;
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['src', 'bold'] })).to.be.false;
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['bold'] })).to.be.false;

				// Even if image has src and alt, it can't have attributes that weren't allowed
				expect(schema.check({ name: 'img', inside: '$block', attributes: ['alt', 'src', 'attr'] })).to.be.false;
			});
		});

		describe('array of elements as inside', () => {
			beforeEach(() => {
				schema.registerItem('div', '$block');
				schema.registerItem('header', '$block');
				schema.registerItem('p', '$block');
				schema.registerItem('img', '$inline');

				schema.allow({ name: '$block', inside: 'div' });
				schema.allow({ name: '$inline', attributes: 'bold', inside: '$block' });

				schema.disallow({ name: '$inline', attributes: 'bold', inside: 'header' });
			});

			it('should return true if given element is allowed by schema at given position', () => {
				// P is block and block is allowed in DIV.
				expect(schema.check({ name: 'p', inside: [new _element2.default('div')] })).to.be.true;

				// IMG is inline and inline is allowed in block.
				expect(schema.check({ name: 'img', inside: [new _element2.default('div')] })).to.be.true;
				expect(schema.check({ name: 'img', inside: [new _element2.default('p')] })).to.be.true;

				// Inline is allowed in any block and is allowed with attribute bold.
				expect(schema.check({ name: 'img', inside: [new _element2.default('div')], attributes: ['bold'] })).to.be.true;
				expect(schema.check({ name: 'img', inside: [new _element2.default('p')], attributes: ['bold'] })).to.be.true;

				// Inline is allowed in header which is allowed in DIV.
				expect(schema.check({ name: 'header', inside: [new _element2.default('div')] })).to.be.true;
				expect(schema.check({ name: 'img', inside: [new _element2.default('header')] })).to.be.true;
				expect(schema.check({ name: 'img', inside: [new _element2.default('div'), new _element2.default('header')] })).to.be.true;
			});

			it('should return false if given element is not allowed by schema at given position', () => {
				// P with attribute is not allowed.
				expect(schema.check({ name: 'p', inside: [new _element2.default('div')], attributes: 'bold' })).to.be.false;

				// Bold text is not allowed in header
				expect(schema.check({ name: '$text', inside: [new _element2.default('header')], attributes: 'bold' })).to.be.false;
			});

			it('should return false if given element is not registered in schema', () => {
				expect(schema.check({ name: 'new', inside: [new _element2.default('div')] })).to.be.false;
			});
		});

		describe('position as inside', () => {
			let doc, root;

			beforeEach(() => {
				doc = new _document2.default();
				root = doc.createRoot('root', 'div');

				root.insertChildren(0, [new _element2.default('div'), new _element2.default('header'), new _element2.default('p')]);

				schema.registerItem('div', '$block');
				schema.registerItem('header', '$block');
				schema.registerItem('p', '$block');

				schema.allow({ name: '$block', inside: 'div' });
				schema.allow({ name: '$inline', attributes: 'bold', inside: '$block' });

				schema.disallow({ name: '$inline', attributes: 'bold', inside: 'header' });
			});

			it('should return true if given element is allowed by schema at given position', () => {
				// Block should be allowed in root.
				expect(schema.check({ name: '$block', inside: new _position2.default(root, [0]) })).to.be.true;

				// P is block and block should be allowed in root.
				expect(schema.check({ name: 'p', inside: new _position2.default(root, [0]) })).to.be.true;

				// P is allowed in DIV by the set rule.
				expect(schema.check({ name: 'p', inside: new _position2.default(root, [0, 0]) })).to.be.true;

				// Inline is allowed in any block and is allowed with attribute bold.
				// We do not check if it is allowed in header, because it is disallowed by the set rule.
				expect(schema.check({ name: '$inline', inside: new _position2.default(root, [0, 0]) })).to.be.true;
				expect(schema.check({ name: '$inline', inside: new _position2.default(root, [2, 0]) })).to.be.true;
				expect(schema.check({ name: '$inline', inside: new _position2.default(root, [0, 0]), attributes: 'bold' })).to.be.true;
				expect(schema.check({ name: '$inline', inside: new _position2.default(root, [2, 0]), attributes: 'bold' })).to.be.true;

				// Header is allowed in DIV.
				expect(schema.check({ name: 'header', inside: new _position2.default(root, [0, 0]) })).to.be.true;

				// Inline is allowed in block and root is DIV, which is block.
				expect(schema.check({ name: '$inline', inside: new _position2.default(root, [0]) })).to.be.true;
			});

			it('should return false if given element is not allowed by schema at given position', () => {
				// P with attribute is not allowed anywhere.
				expect(schema.check({ name: 'p', inside: new _position2.default(root, [0]), attributes: 'bold' })).to.be.false;
				expect(schema.check({ name: 'p', inside: new _position2.default(root, [0, 0]), attributes: 'bold' })).to.be.false;

				// Bold text is not allowed in header
				expect(schema.check({ name: '$text', inside: new _position2.default(root, [1, 0]), attributes: 'bold' })).to.be.false;
			});

			it('should return false if given element is not registered in schema', () => {
				expect(schema.check({ name: 'new', inside: new _position2.default(root, [0]) })).to.be.false;
			});
		});
	});

	describe('_normalizeQueryPath', () => {
		it('should normalize string with spaces to an array of strings', () => {
			expect(_schema2.default._normalizeQueryPath('$root div strong')).to.deep.equal(['$root', 'div', 'strong']);
		});

		it('should normalize model position to an array of strings', () => {
			let doc = new _document2.default();
			let root = doc.createRoot('root', '$root');

			root.insertChildren(0, [new _element2.default('div', null, [new _element2.default('header')])]);

			let position = new _position2.default(root, [0, 0, 0]);

			expect(_schema2.default._normalizeQueryPath(position)).to.deep.equal(['$root', 'div', 'header']);
		});

		it('should normalize array with strings and model elements to an array of strings and drop unrecognized parts', () => {
			let input = ['$root', ['div'], new _element2.default('div'), null, new _element2.default('p'), 'strong'];

			expect(_schema2.default._normalizeQueryPath(input)).to.deep.equal(['$root', 'div', 'p', 'strong']);
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
