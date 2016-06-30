define(['exports', '../view.js'], function (exports, _view) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The basic list item view class.
  *
  * @memberOf ui.list
  * @extends ui.View
  */
	class ListItemView extends _view2.default {
		/**
   * Creates a ListItemView instance.
   *
   * @param {utils.Observable} model
   */
		constructor(model) {
			super(model);

			const bind = this.attributeBinder;

			this.template = {
				tag: 'li',

				attributes: {
					class: ['ck-reset', 'ck-list__item'],
					style: bind.to('style')
				},

				children: [{
					text: bind.to('label')
				}],

				on: {
					click: 'click'
				}
			};
		}
	}
	exports.default = ListItemView;
});