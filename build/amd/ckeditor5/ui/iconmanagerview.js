define(['exports', './view.js'], function (exports, _view) {
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
  * Icon manager view using {@link ui.iconManager.IconManagerModel}.
  *
  * @memberOf ui.iconManager
  * @extends ui.View
  */

	class IconManagerView extends _view2.default {
		constructor(model, locale) {
			super(model, locale);

			this.template = {
				tag: 'svg',
				ns: 'http://www.w3.org/2000/svg',
				attributes: {
					class: 'ck-icon-manager-sprite'
				}
			};
		}

		init() {
			this.element.innerHTML = this.model.sprite;

			return super.init();
		}
	}
	exports.default = IconManagerView;
});