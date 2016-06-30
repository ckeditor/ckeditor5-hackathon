define(['exports', '/ckeditor5/ui/view.js', '/ckeditor5/ui/controller.js', '/ckeditor5/ui/controllercollection.js'], function (exports, _view, _controller, _controllercollection) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var _controller2 = _interopRequireDefault(_controller);

	var _controllercollection2 = _interopRequireDefault(_controllercollection);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Test utils for CKEditor UI.
  */
	const utils = {
		/**
   * Returns UI controller for given region/DOM selector pairs, which {@link ui.Controller#view}
   * is `document.body`. It is useful for manual tests which engage various UI components and/or
   * UI {@link ui.Controller} instances, where initialization and the process of insertion into
   * DOM could be problematic i.e. because of the number of instances.
   *
   * Usage:
   *
   *		// Get the controller.
   *		const controller = testUtils.createTestUIController();
   *
   *		// Then use it to organize and initialize children.
   *		controller.add( 'some-collection', childControllerInstance );
   *
   * @param {Object} regions An object literal with `regionName: DOM Selector pairs`.
   * See {@link ui.View#register}.
   */
		createTestUIController(regions) {
			const TestUIView = class extends _view2.default {
				constructor() {
					super();

					this.element = document.body;

					for (let r in regions) {
						this.register(r, regions[r]);
					}
				}
			};

			const controller = new _controller2.default(null, new TestUIView());

			for (let r in regions) {
				controller.collections.add(new _controllercollection2.default(r));
			}

			return controller.init().then(() => {
				return controller;
			});
		}
	};

	exports.default = utils;
});