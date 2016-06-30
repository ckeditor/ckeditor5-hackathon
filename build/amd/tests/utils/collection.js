define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/utils/collection.js', '/ckeditor5/utils/ckeditorerror.js'], function (_utils, _collection, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _collection2 = _interopRequireDefault(_collection);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	function getItem(id, idProperty) {
		idProperty = idProperty || 'id';

		return {
			[idProperty]: id
		};
	}

	describe('Collection', () => {
		let collection;

		beforeEach(() => {
			collection = new _collection2.default();
		});

		describe('constructor', () => {
			it('allows to change the id property used by the collection', () => {
				let item1 = { id: 'foo', name: 'xx' };
				let item2 = { id: 'foo', name: 'yy' };
				let collection = new _collection2.default({ idProperty: 'name' });

				collection.add(item1);
				collection.add(item2);

				expect(collection).to.have.length(2);

				expect(collection.get('xx')).to.equal(item1);
				expect(collection.remove('yy')).to.equal(item2);
			});
		});

		describe('add', () => {
			it('should be chainable', () => {
				expect(collection.add({})).to.equal(collection);
			});

			it('should change the length', () => {
				expect(collection).to.have.length(0);

				collection.add({});
				expect(collection).to.have.length(1);

				collection.add({});
				expect(collection).to.have.length(2);
			});

			it('should enable get( index )', () => {
				let item1 = {};
				let item2 = {};

				collection.add(item1);
				expect(collection.get(0)).to.equal(item1);

				collection.add(item2);
				expect(collection.get(0)).to.equal(item1);
				expect(collection.get(1)).to.equal(item2);
			});

			it('should enable get( id )', () => {
				let item1 = getItem('foo');
				let item2 = getItem('bar');

				collection.add(item1);
				collection.add(item2);

				expect(collection.get('foo')).to.equal(item1);
				expect(collection.get('bar')).to.equal(item2);
			});

			it('should enable get( id ) - custom id property', () => {
				let collection = new _collection2.default({ idProperty: 'name' });
				let item1 = getItem('foo', 'name');
				let item2 = getItem('bar', 'name');

				collection.add(item1);
				collection.add(item2);

				expect(collection.get('foo')).to.equal(item1);
				expect(collection.get('bar')).to.equal(item2);
			});

			it('should generate an id when not defined', () => {
				let item = {};

				collection.add(item);

				expect(item.id).to.be.a('string');
				expect(collection.get(item.id)).to.equal(item);
			});

			it('should generate an id when not defined - custom id property', () => {
				let collection = new _collection2.default({ idProperty: 'name' });
				let item = {};

				collection.add(item);

				expect(item.name).to.be.a('string');
				expect(collection.get(item.name)).to.equal(item);
			});

			it('should not change an existing id of an item', () => {
				let item = getItem('foo');

				collection.add(item);

				expect(item.id).to.equal('foo');
			});

			it('should throw when item with this id already exists', () => {
				let item1 = getItem('foo');
				let item2 = getItem('foo');

				collection.add(item1);

				expect(() => {
					collection.add(item2);
				}).to.throw(_ckeditorerror2.default, /^collection-add-item-already-exists/);
			});

			it('should throw when item\'s id is not a string', () => {
				let item = { id: 1 };

				expect(() => {
					collection.add(item);
				}).to.throw(_ckeditorerror2.default, /^collection-add-invalid-id/);
			});

			it('should not override item under an existing id in case of a collision ' + 'between existing items and one with an automatically generated id', () => {
				// Add many items to the collection
				// to be sure that next item id will be higher than id already stored in uid cache.
				for (let i = 0; i < 100; i++) {
					collection.add(getItem(String(i)));
				}

				let item = {};

				collection.add(item);

				expect(item.id).to.be.at.least(100);
			});

			it('should generate an id when not defined, which is globally unique ' + 'so it is possible to move items between collections and avoid id collisions', () => {
				const collectionA = new _collection2.default();
				const collectionB = new _collection2.default();
				const itemA = {};
				const itemB = {};

				collectionA.add(itemA);
				collectionB.add(itemB);
				collectionB.add(collectionA.remove(itemA));

				expect(collectionA.length).to.equal(0);
				expect(collectionB.length).to.equal(2);
				expect(collectionB.get(0)).to.equal(itemB);
				expect(collectionB.get(1)).to.equal(itemA);

				expect(itemA.id).to.not.equal(itemB.id);
			});

			it('should generate an id when not defined, which is globally unique ' + 'so it is possible to move items between collections and avoid id collisions ' + '– custom id property', () => {
				const collectionA = new _collection2.default({ idProperty: 'foo' });
				const collectionB = new _collection2.default({ idProperty: 'foo' });
				const itemA = {};
				const itemB = {};

				collectionA.add(itemA);
				collectionB.add(itemB);
				collectionB.add(collectionA.remove(itemA));

				expect(collectionA.length).to.equal(0);
				expect(collectionB.length).to.equal(2);
				expect(collectionB.get(0)).to.equal(itemB);
				expect(collectionB.get(1)).to.equal(itemA);

				expect(itemA.foo).to.not.equal(itemB.foo);
			});

			it('should allow an item which is already in some other collection', () => {
				const collectionA = new _collection2.default();
				const collectionB = new _collection2.default();
				const item = {};

				collectionA.add(item);
				collectionB.add(item);

				expect(collectionA.length).to.equal(1);
				expect(collectionB.length).to.equal(1);
				expect(collectionA.get(item.id)).to.equal(collectionB.get(0));
			});

			it('should fire the "add" event', () => {
				let spy = sinon.spy();
				let item = {};

				collection.on('add', spy);

				collection.add(item);

				sinon.assert.calledWithExactly(spy, sinon.match.has('source', collection), item, 0);
			});

			it('should support an optional index argument', () => {
				let collection = new _collection2.default();
				let item1 = getItem('foo');
				let item2 = getItem('bar');
				let item3 = getItem('baz');
				let item4 = getItem('abc');

				collection.add(item1);
				collection.add(item2, 0);
				collection.add(item3, 1);
				collection.add(item4, 3);

				expect(collection.get(0)).to.equal(item2);
				expect(collection.get(1)).to.equal(item3);
				expect(collection.get(2)).to.equal(item1);
				expect(collection.get(3)).to.equal(item4);
			});

			it('should throw when index argument is invalid', () => {
				let collection = new _collection2.default();
				let item1 = getItem('foo');
				let item2 = getItem('bar');
				let item3 = getItem('baz');

				collection.add(item1);

				expect(() => {
					collection.add(item2, -1);
				}).to.throw(/^collection-add-item-invalid-index/);

				expect(() => {
					collection.add(item2, 2);
				}).to.throw(/^collection-add-item-invalid-index/);

				collection.add(item2, 1);
				collection.add(item3, 0);

				expect(collection.length).to.be.equal(3);
			});

			it('should fire the "add" event with the index argument', () => {
				let spy = sinon.spy();

				collection.add({});
				collection.add({});

				collection.on('add', spy);

				const item = {};
				collection.add(item, 1);

				sinon.assert.calledWithExactly(spy, sinon.match.has('source', collection), item, 1);
			});
		});

		describe('get', () => {
			it('should return an item', () => {
				let item = getItem('foo');
				collection.add(item);

				expect(collection.get('foo')).to.equal(item);
			});

			it('should return null if id does not exist', () => {
				collection.add(getItem('foo'));

				expect(collection.get('bar')).to.be.null;
			});

			it('should throw if neither string or number given', () => {
				expect(() => {
					collection.get(true);
				}).to.throw(_ckeditorerror2.default, /^collection-get-invalid-arg/);
			});
		});

		describe('remove', () => {
			it('should remove the model by index', () => {
				collection.add(getItem('bom'));
				collection.add(getItem('foo'));
				collection.add(getItem('bar'));

				expect(collection).to.have.length(3);

				let removedItem = collection.remove(1);

				expect(collection).to.have.length(2);
				expect(collection.get('foo')).to.be.null;
				expect(collection.get(1)).to.have.property('id', 'bar');
				expect(removedItem).to.have.property('id', 'foo');
			});

			it('should remove the model by index - custom id property', () => {
				let collection = new _collection2.default({ idProperty: 'name' });

				collection.add(getItem('foo', 'name'));

				let removedItem = collection.remove(0);

				expect(collection).to.have.length(0);
				expect(collection.get('foo')).to.be.null;
				expect(removedItem).to.have.property('name', 'foo');
			});

			it('should remove the model by id', () => {
				collection.add(getItem('bom'));
				collection.add(getItem('foo'));
				collection.add(getItem('bar'));

				expect(collection).to.have.length(3);

				let removedItem = collection.remove('foo');

				expect(collection).to.have.length(2);
				expect(collection.get('foo')).to.be.null;
				expect(collection.get(1)).to.have.property('id', 'bar');
				expect(removedItem).to.have.property('id', 'foo');
			});

			it('should remove the model by model', () => {
				let item = getItem('foo');

				collection.add(getItem('bom'));
				collection.add(item);
				collection.add(getItem('bar'));

				expect(collection).to.have.length(3);

				let removedItem = collection.remove(item);

				expect(collection).to.have.length(2);
				expect(collection.get('foo')).to.be.null;
				expect(collection.get(1)).to.have.property('id', 'bar');
				expect(removedItem).to.equal(item);
			});

			it('should remove the model by model - custom id property', () => {
				let collection = new _collection2.default(null, 'name');
				let item = getItem('foo', 'name');

				collection.add(item);

				let removedItem = collection.remove(item);

				expect(collection).to.have.length(0);
				expect(collection.get('foo')).to.be.null;
				expect(removedItem).to.have.property('name', 'foo');
			});

			it('should fire the "remove" event', () => {
				let item1 = getItem('foo');
				let item2 = getItem('bar');
				let item3 = getItem('bom');

				collection.add(item1);
				collection.add(item2);
				collection.add(item3);

				let spy = sinon.spy();

				collection.on('remove', spy);

				collection.remove(1); // by index
				collection.remove(item1); // by model
				collection.remove('bom'); // by id

				sinon.assert.calledThrice(spy);
				sinon.assert.calledWithExactly(spy, sinon.match.has('source', collection), item1);
				sinon.assert.calledWithExactly(spy, sinon.match.has('source', collection), item2);
				sinon.assert.calledWithExactly(spy, sinon.match.has('source', collection), item3);
			});

			it('should throw an error on invalid index', () => {
				collection.add(getItem('foo'));

				expect(() => {
					collection.remove(1);
				}).to.throw(_ckeditorerror2.default, /^collection-remove-404/);

				expect(collection).to.have.length(1);
			});

			it('should throw an error on invalid id', () => {
				collection.add(getItem('foo'));

				expect(() => {
					collection.remove('bar');
				}).to.throw(_ckeditorerror2.default, /^collection-remove-404/);

				expect(collection).to.have.length(1);
			});

			it('should throw an error on invalid model', () => {
				collection.add(getItem('foo'));

				expect(() => {
					collection.remove(getItem('bar'));
				}).to.throw(_ckeditorerror2.default, /^collection-remove-404/);

				expect(collection).to.have.length(1);
			});
		});

		describe('map', () => {
			it('uses native map', () => {
				let spy = _utils2.default.sinon.stub(Array.prototype, 'map', () => {
					return ['foo'];
				});
				let ctx = {};

				let ret = collection.map(callback, ctx);

				sinon.assert.calledWithExactly(spy, callback, ctx);
				expect(ret).to.deep.equal(['foo'], 'ret value was forwarded');

				function callback() {}
			});
		});

		describe('find', () => {
			it('uses native find', () => {
				let needl = getItem('foo');

				let spy = _utils2.default.sinon.stub(Array.prototype, 'find', () => {
					return needl;
				});
				let ctx = {};

				let ret = collection.find(callback, ctx);

				sinon.assert.calledWithExactly(spy, callback, ctx);
				expect(ret).to.equal(needl, 'ret value was forwarded');

				function callback() {}
			});
		});

		describe('filter', () => {
			it('uses native filter', () => {
				let needl = getItem('foo');

				let spy = _utils2.default.sinon.stub(Array.prototype, 'filter', () => {
					return [needl];
				});
				let ctx = {};

				let ret = collection.filter(callback, ctx);

				sinon.assert.calledWithExactly(spy, callback, ctx);
				expect(ret).to.deep.equal([needl], 'ret value was forwarded');

				function callback() {}
			});
		});

		describe('clear', () => {
			it('removes all items', () => {
				const items = [{}, {}, {}];
				const spy = sinon.spy();

				collection.on('remove', spy);

				items.forEach(i => collection.add(i));

				collection.clear();

				expect(spy.callCount).to.equal(3);
				expect(collection.length).to.equal(0);
			});
		});

		describe('iterator', () => {
			it('covers the whole collection', () => {
				let item1 = getItem('foo');
				let item2 = getItem('bar');
				let item3 = getItem('bom');
				let items = [];

				collection.add(item1);
				collection.add(item2);
				collection.add(item3);

				for (let item of collection) {
					items.push(item.id);
				}

				expect(items).to.deep.equal(['foo', 'bar', 'bom']);
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
