define(['exports', '../view.js', '../icon/iconview.js', '../model.js'], function (exports, _view, _iconview, _model) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var _iconview2 = _interopRequireDefault(_iconview);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The basic button view class.
  *
  * @memberOf ui.button
  * @extends ui.View
  */
	class ButtonView extends _view2.default {
		constructor(model) {
			super(model);

			const bind = this.attributeBinder;

			this.template = {
				tag: 'button',

				attributes: {
					class: ['ck-button', bind.to('isEnabled', value => value ? 'ck-enabled' : 'ck-disabled'), bind.to('isOn', value => value ? 'ck-on' : 'ck-off')]
				},

				children: [{
					text: bind.to('label')
				}],

				on: {
					mousedown: evt => {
						evt.preventDefault();
					},

					click: () => {
						// We can't make the button disabled using the disabled attribute, because it won't be focusable.
						// Though, shouldn't this condition be moved to the button controller?
						if (model.isEnabled) {
							this.fire('click');
						}
					}
				}
			};

			this.register('children', el => el);
		}

		init() {
			if (this.model.icon) {
				this._setupIcon();
			}

			return super.init();
		}

		_setupIcon() {
			const iconViewModel = new _model2.default();
			const iconView = new _iconview2.default(iconViewModel);

			iconViewModel.bind('icon').to(this.model);
			iconViewModel.bind('align').to(this.model, 'iconAlign');

			this.element.insertBefore(iconView.element, this.element.firstChild);
		}
	}

	exports.default = ButtonView;
});