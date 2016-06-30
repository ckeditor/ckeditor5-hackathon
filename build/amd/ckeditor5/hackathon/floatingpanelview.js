define(['exports', '/ckeditor5/ui/panel/panelview.js'], function (exports, _panelview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _panelview2 = _interopRequireDefault(_panelview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	class FloatingPanelView extends _panelview2.default {
		constructor(model) {
			super(model);

			this.template.attributes.class.push('ck-floating-panel');

			this.listenTo(this.model, 'change:isOn', this.position, this);
		}

		position() {
			if (!this.model.isOn) {
				return;
			}

			const selRect = document.defaultView.getSelection().getRangeAt(0).getBoundingClientRect();
			const bodyRect = document.body.getBoundingClientRect();

			this.element.style.top = selRect.bottom - bodyRect.top + 'px';
			this.element.style.left = selRect.right - bodyRect.left + 'px';
		}
	}
	exports.default = FloatingPanelView;
});