define('tests', ['/tests/ckeditor5/_utils/utils.js', '/ckeditor5/ui/list/list.js', '/ckeditor5/ui/list/listitemview.js', '/ckeditor5/utils/collection.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/controllercollection.js', '/ckeditor5/ui/model.js'], function (_utils, _list, _listitemview, _collection, _controller, _controllercollection, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	/* bender-tags: ui, list */

	'use strict';

	var _utils2 = _interopRequireDefault(_utils);

	var _list2 = _interopRequireDefault(_list);

	var _listitemview2 = _interopRequireDefault(_listitemview);

	var _collection2 = _interopRequireDefault(_collection);

	var _controller2 = _interopRequireDefault(_controller);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_utils2.default.createSinonSandbox();

	describe('List', () => {
		let model, list, items, itemFoo, itemBar;

		beforeEach(() => {
			itemFoo = new _model2.default({ label: 'foo' });
			itemBar = new _model2.default({ label: 'bar' });

			items = new _collection2.default({ idProperty: 'label' });
			items.add(itemFoo);
			items.add(itemBar);

			model = new _model2.default({
				items: items
			});

			list = new _list2.default(model);
		});

		describe('constructor', () => {
			it('creates list collection', () => {
				expect(list.collections).to.have.length(1);
				expect(list.collections.get('list')).to.be.instanceof(_controllercollection2.default);
			});
		});

		describe('init', () => {
			it('fills the "list" collection with model#items', () => {
				const listCollection = list.collections.get('list');

				list.init();

				expect(listCollection).to.have.length(2);
				expect(listCollection.get(0).model).to.equal(itemFoo);
				expect(listCollection.get(1).model).to.equal(itemBar);
			});

			it('binds the "list" collection to model#items', () => {
				const listCollection = list.collections.get('list');

				list.init();

				const removed = items.remove(1);

				items.add(removed, 0);

				expect(listCollection.get(0).model).to.equal(itemBar);
				expect(listCollection.get(1).model).to.equal(itemFoo);
			});

			it('calls super.init()', () => {
				const spy = _utils2.default.sinon.spy(_controller2.default.prototype, 'init');

				list.init();

				expect(spy.calledOnce).to.be.true;
			});
		});

		describe('_addListItem', () => {
			it('adds a new controller to "list" collection', () => {
				const listCollection = list.collections.get('list');

				list._addListItem(new _model2.default({ label: 'baz' }));
				list._addListItem(new _model2.default({ label: 'qux' }), 0);

				expect(listCollection).to.have.length(2);
				expect(listCollection.get(0).model.label).to.equal('qux');
				expect(listCollection.get(1).model.label).to.equal('baz');

				expect(listCollection.get(0).view).to.be.instanceof(_listitemview2.default);
			});

			it('creates a bridge between "click" on item view and model#execute', done => {
				list.init();

				model.on('execute', (evt, itemModel) => {
					expect(itemModel.label).to.equal('foo');

					done();
				});

				list.collections.get('list').get(0).view.fire('click');
			});
		});

		describe('_removeListItem', () => {
			it('removes a controller from "list" collection', () => {
				const listCollection = list.collections.get('list');
				const itemBaz = new _model2.default({ label: 'baz' });
				const itemQux = new _model2.default({ label: 'qux' });

				list._addListItem(itemBaz);
				list._addListItem(itemQux);

				expect(listCollection).to.have.length(2);

				list._removeListItem(itemBaz);

				expect(listCollection).to.have.length(1);
				expect(listCollection.get(0).model.label).to.equal('qux');
			});

			it('deactivates a bridge between "click" on item view and model#execute', done => {
				const listCollection = list.collections.get('list');

				list.init();

				model.on('execute', (evt, itemModel) => {
					expect(itemModel.label).to.equal('bar');

					done();
				});

				const itemFooView = listCollection.get('foo').view;
				const itemBarView = listCollection.get('bar').view;

				items.remove(itemFoo);

				itemFooView.fire('click');
				itemBarView.fire('click');
			});
		});
	});
});
require( [ 'tests' ], bender.defer(), function( err ) {
	// The problem with Require.JS is that there are no stacktraces if we won't log this.
	console.error( err );
	console.log( err.stack );
} );
