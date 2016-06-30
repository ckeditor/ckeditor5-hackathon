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
  * The basic list view class.
  *
  * @memberOf ui.list
  * @extends ui.View
  */
	class ListView extends _view2.default {
		/**
   * Creates a ListView instance.
   */
		constructor() {
			super();

			this.template = {
				tag: 'ul',

				attributes: {
					class: ['ck-reset', 'ck-list']
				}
			};

			this.register('list', el => el);
		}
	}
	exports.default = ListView;
});