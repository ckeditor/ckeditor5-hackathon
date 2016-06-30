define(['exports', '../controller.js', '../controllercollection.js', './listitemview.js'], function (exports, _controller, _controllercollection, _listitemview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _controller2 = _interopRequireDefault(_controller);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	var _listitemview2 = _interopRequireDefault(_listitemview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The basic list controller class.
  *
  * @memberOf ui.list
  * @extends ui.Controller
  */
	class List extends _controller2.default {
		/**
   * Creates a List instance.
   *
   * @param {utils.Observable} model
   * @param {ui.View} view
   */
		constructor(model, view) {
			super(model, view);

			this.collections.add(new _controllercollection2.default('list'));
		}

		init() {
			// Initially populate "list" controller collection with children from model.items.
			for (let itemModel of this.model.items) {
				this._addListItem(itemModel);
			}

			// Synchronize adding to model#items collection with "list" controller collection.
			this.model.items.on('add', (evt, itemModel, index) => {
				this._addListItem(itemModel, index);
			});

			// Synchronize removal from model#items collection with "list" controller collection.
			this.model.items.on('remove', (evt, itemModel) => {
				this._removeListItem(itemModel);
			});

			return super.init();
		}

		/**
   * Adds an item to "list" collection and activates event bubbling
   * between item view and the List.
   *
   * @protected
   * @param {utils.Observable} itemModel
   * @param {Number} index
   */
		_addListItem(itemModel, index) {
			const itemView = new _listitemview2.default(itemModel);
			const listItemController = new _controller2.default(itemModel, itemView);

			// Save model#label in controller instance so it can be later
			// retrieved from "list" collection easily by that model.
			listItemController.id = itemModel.label;

			this.listenTo(itemView, 'click', () => {
				this.model.fire('execute', itemModel);
			});

			this.add('list', listItemController, index);
		}

		/**
   * Removes an item from "list" collection and deactivates event bubbling
   * between item view and the List.
   *
   * @protected
   * @param {utils.Observable} itemModel
   */
		_removeListItem(itemModel) {
			const itemView = this.collections.get('list').get(itemModel.label).view;

			this.stopListening(itemView, 'click');

			this.remove('list', itemModel.label);
		}
	}
	exports.default = List;
});