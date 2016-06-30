define(['exports', '../button/buttonview.js'], function (exports, _buttonview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _buttonview2 = _interopRequireDefault(_buttonview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The basic dropdown button view class.
  *
  * @memberOf ui.dropdown
  * @extends ui.button.ButtonView
  */
	class DropdownButtonView extends _buttonview2.default {
		/**
   * Creates a DropdownButtonView instance.
   *
   * @param {utils.Observable} model
   */
		constructor(model) {
			super(model);

			this.template.attributes.class.push('ck-dropdown__button');
		}
	}
	exports.default = DropdownButtonView;
});