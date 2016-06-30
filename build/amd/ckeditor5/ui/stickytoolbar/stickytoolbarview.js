define(['exports', '../toolbar/toolbarview.js'], function (exports, _toolbarview) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _toolbarview2 = _interopRequireDefault(_toolbarview);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The sticky toolbar view class.
  *
  * @memberOf ui.stickyToolbar
  * @extends ui.toolbar.ToolbarView
  */
	class StickyToolbarView extends _toolbarview2.default {
		constructor(model) {
			super(model);

			const bind = this.attributeBinder;

			this.model.set('isSticky', false);

			// Toggle class of the toolbar when "sticky" state changes in the model.
			this.template.attributes.class.push(bind.if('isSticky', 'ck-toolbar_sticky'));
		}

		init() {
			super.init();

			/**
    * A dummy element which visually fills the space as long as the
    * actual toolbar is sticky. It prevents flickering of the UI.
    *
    * @private
    * @property {HTMLElement} ui.stickyToobar.StickyToolbarView#_elementPlaceholder
    */
			this._elementPlaceholder = document.createElement('div');
			this._elementPlaceholder.classList.add('ck-toolbar__placeholder');
			this.element.parentNode.insertBefore(this._elementPlaceholder, this.element);

			// Update sticky state of the toolbar as the window is being scrolled.
			this.listenTo(window, 'scroll', () => {
				this._checkIfShouldBeSticky();
			});

			// Synchronize with `model.isActive` because sticking an inactive toolbar is pointless.
			this.listenTo(this.model, 'change:isActive', (evt, name, value) => {
				if (value) {
					this._checkIfShouldBeSticky();
				} else {
					this._detach();
				}
			});
		}

		/**
   * Destroys the toolbar and removes the {@link _elementPlaceholder}.
   */
		destroy() {
			super.destroy();

			this._elementPlaceholder.remove();
		}

		/**
   * Analyzes the environment to decide whether the toolbar should
   * be sticky or not. Then, it uses {@link _stick} and {@link _detach}
   * methods to manage the state of the toolbar.
   *
   * @protected
   */
		_checkIfShouldBeSticky() {
			const rectElement = this.model.isSticky ? this._elementPlaceholder : this.element;
			const rect = rectElement.getBoundingClientRect();

			if (rect.top < 0 && this.model.isActive) {
				this._stick(rect);
			} else {
				this._detach();
			}
		}

		/**
   * Sticks the toolbar to the top edge of the viewport simulating
   * CSS position:sticky. Also see {@link #_detach}.
   *
   * TODO: Possibly replaced by CSS in the future
   * http://caniuse.com/#feat=css-sticky
   *
   * @protected
   * @param {Object} regionRect An output of getBoundingClientRect native DOM method.
   */
		_stick(regionRect) {
			// Setup placeholder.
			Object.assign(this._elementPlaceholder.style, {
				display: 'block',
				height: regionRect.height + 'px'
			});

			// Stick the top region.
			Object.assign(this.element.style, {
				// Compensate 1px border which is added when becoming "sticky".
				width: regionRect.width + 2 + 'px',
				marginLeft: -window.scrollX - 1 + 'px'
			});

			this.model.isSticky = true;
		}

		/**
   * Detaches the toolbar from the top edge of the viewport.
   * See {@link #_stick}.
   *
   * @protected
   */
		_detach() {
			// Release the placeholder.
			Object.assign(this._elementPlaceholder.style, {
				display: 'none'
			});

			// Detach the top region.
			Object.assign(this.element.style, {
				width: 'auto',
				marginLeft: 'auto'
			});

			this.model.isSticky = false;
		}
	}

	exports.default = StickyToolbarView;
});