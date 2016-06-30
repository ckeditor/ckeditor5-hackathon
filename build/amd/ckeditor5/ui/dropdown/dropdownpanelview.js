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
  * The basic dropdown panel view class.
  *
  * @memberOf ui.dropdown
  * @extends ui.View
  */
	class DropdownPanelView extends _view2.default {
		/**
   * Creates a DropdownPanelView instance.
   *
   * @param {utils.Observable} model
   */
		constructor(model) {
			super(model);

			const bind = this.attributeBinder;

			this.template = {
				tag: 'div',

				attributes: {
					class: ['ck-reset', 'ck-dropdown__panel', bind.if('isOn', 'ck-dropdown__panel-active')]
				}
			};

			this.register('content', el => el);
		}
	}
	exports.default = DropdownPanelView;
});