define(['exports', './emittermixin.js', './ckeditorerror.js', './uid.js', './mix.js'], function (exports, _emittermixin, _ckeditorerror, _uid, _mix) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _uid2 = _interopRequireDefault(_uid);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Collections are ordered sets of objects. Items in the collection can be retrieved by their indexes
  * in the collection (like in an array) or by their ids.
  *
  * If an object without an `id` property is being added to the collection, the `id` property will be generated
  * automatically. Note that the automatically generated id is unique only within this single collection instance.
  *
  * By default an item in the collection is identified by its `id` property. The name of the identifier can be
  * configured through the constructor of the collection.
  *
  * @memberOf utils
  * @mixes EventEmitter
  */
	class Collection {
		/**
   * Creates a new Collection instance.
   *
   * @param {Iterable} [items] Items to be added to the collection.
   * @param {Object} options The options object.
   * @param {String} [options.idProperty='id'] The name of the property which is considered to identify an item.
   */
		constructor(options) {
			/**
    * The internal list of items in the collection.
    *
    * @private
    * @type {Object[]}
    */
			this._items = [];

			/**
    * The internal map of items in the collection.
    *
    * @private
    * @type {Map}
    */
			this._itemMap = new Map();

			/**
    * The name of the property which is considered to identify an item.
    *
    * @private
    * @type {String}
    */
			this._idProperty = options && options.idProperty || 'id';
		}

		/**
   * The number of items available in the collection.
   *
   * @property length
   */
		get length() {
			return this._items.length;
		}

		/**
   * Adds an item into the collection.
   *
   * If the item does not have an id, then it will be automatically generated and set on the item.
   *
   * @chainable
   * @param {Object} item
   * @param {Number} [index] The position of the item in the collection. The item
   * is pushed to the collection when `index` not specified.
   * @fires utils.Collection#add
   */
		add(item, index) {
			let itemId;
			const idProperty = this._idProperty;

			if (idProperty in item) {
				itemId = item[idProperty];

				if (typeof itemId != 'string') {
					/**
      * This item's id should be a string.
      *
      * @error collection-add-invalid-id
      */
					throw new _ckeditorerror2.default('collection-add-invalid-id');
				}

				if (this.get(itemId)) {
					/**
      * This item already exists in the collection.
      *
      * @error collection-add-item-already-exists
      */
					throw new _ckeditorerror2.default('collection-add-item-already-exists');
				}
			} else {
				itemId = this._getNextId();
				item[idProperty] = itemId;
			}

			// TODO: Use ES6 default function argument.
			if (index === undefined) {
				index = this._items.length;
			} else if (index > this._items.length || index < 0) {
				/**
     * The index number has invalid value.
     *
     * @error collection-add-item-bad-index
     */
				throw new _ckeditorerror2.default('collection-add-item-invalid-index');
			}

			this._items.splice(index, 0, item);

			this._itemMap.set(itemId, item);

			this.fire('add', item, index);

			return this;
		}

		/**
   * Gets item by its id or index.
   *
   * @param {String|Number} idOrIndex The item id or index in the collection.
   * @returns {Object} The requested item or `null` if such item does not exist.
   */
		get(idOrIndex) {
			let item;

			if (typeof idOrIndex == 'string') {
				item = this._itemMap.get(idOrIndex);
			} else if (typeof idOrIndex == 'number') {
				item = this._items[idOrIndex];
			} else {
				/**
     * Index or id must be given.
     *
     * @error collection-get-invalid-arg
     */
				throw new _ckeditorerror2.default('collection-get-invalid-arg: Index or id must be given.');
			}

			return item || null;
		}

		/**
   * Removes an item from the collection.
   *
   * @param {Object|Number|String} subject The item to remove, its id or index in the collection.
   * @returns {Object} The removed item.
   * @fires utils.Collection#remove
   */
		remove(subject) {
			let index, id, item;
			let itemDoesNotExist = false;
			const idProperty = this._idProperty;

			if (typeof subject == 'string') {
				id = subject;
				item = this._itemMap.get(id);
				itemDoesNotExist = !item;

				if (item) {
					index = this._items.indexOf(item);
				}
			} else if (typeof subject == 'number') {
				index = subject;
				item = this._items[index];
				itemDoesNotExist = !item;

				if (item) {
					id = item[idProperty];
				}
			} else {
				item = subject;
				id = item[idProperty];
				index = this._items.indexOf(item);
				itemDoesNotExist = index == -1 || !this._itemMap.get(id);
			}

			if (itemDoesNotExist) {
				/**
     * Item not found.
     *
     * @error collection-remove-404
     */
				throw new _ckeditorerror2.default('collection-remove-404: Item not found.');
			}

			this._items.splice(index, 1);
			this._itemMap.delete(id);

			this.fire('remove', item);

			return item;
		}

		/**
   * Executes the callback for each item in the collection and composes an array or values returned by this callback.
   *
   * @param {Function} callback
   * @param {Item} callback.item
   * @param {Number} callback.index
   * @params {Object} ctx Context in which the `callback` will be called.
   * @returns {Array} The result of mapping.
   */
		map(callback, ctx) {
			return this._items.map(callback, ctx);
		}

		/**
   * Finds the first item in the collection for which the `callback` returns a true value.
   *
   * @param {Function} callback
   * @param {Object} callback.item
   * @param {Number} callback.index
   * @returns {Object} The item for which `callback` returned a true value.
   * @params {Object} ctx Context in which the `callback` will be called.
   */
		find(callback, ctx) {
			return this._items.find(callback, ctx);
		}

		/**
   * Returns an array with items for which the `callback` returned a true value.
   *
   * @param {Function} callback
   * @param {Object} callback.item
   * @param {Number} callback.index
   * @params {Object} ctx Context in which the `callback` will be called.
   * @returns {Object[]} The array with matching items.
   */
		filter(callback, ctx) {
			return this._items.filter(callback, ctx);
		}

		/**
   * Removes all items from the collection.
   */
		clear() {
			while (this.length) {
				this.remove(0);
			}
		}

		/**
   * Collection iterator.
   */
		[Symbol.iterator]() {
			return this._items[Symbol.iterator]();
		}

		/**
   * Generates next (not yet used) id for unidentified item being add to the collection.
   *
   * @private
   * @returns {String} The next id.
   */
		_getNextId() {
			let id;

			do {
				id = String((0, _uid2.default)());
			} while (this._itemMap.has(id));

			return id;
		}
	}

	exports.default = Collection;
	(0, _mix2.default)(Collection, _emittermixin2.default);

	/**
  * Fired when an item is added to the collection.
  *
  * @event utils.Collection#add
  * @param {Object} item The added item.
  */

	/**
  * Fired when an item is removed from the collection.
  *
  * @event utils.Collection#remove
  * @param {Object} item The removed item.
  */
});