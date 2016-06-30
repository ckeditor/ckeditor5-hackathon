define(['exports', '../../ui/view.js'], function (exports, _view) {
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
  * The basic icon view class.
  *
  * @memberOf ui.icon
  * @extends ui.View
  */
	class IconView extends _view2.default {
		constructor(model) {
			super(model);

			const bind = this.attributeBinder;

			this.template = {
				tag: 'svg',
				ns: 'http://www.w3.org/2000/svg',
				attributes: {
					class: ['ck-icon', bind.to('align', a => a ? `ck-icon-${ a.toLowerCase() }` : '')]
				},
				children: [{
					tag: 'use',
					ns: 'http://www.w3.org/2000/svg',
					attributes: {
						href: {
							ns: 'http://www.w3.org/1999/xlink',
							value: bind.to('icon', i => `#ck-icon-${ i }`)
						}
					}
				}]
			};
		}
	}
	exports.default = IconView;
});