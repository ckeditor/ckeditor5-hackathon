define(['exports', '../utils/collection.js', '../utils/ckeditorerror.js'], function (exports, _collection, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _collection2 = _interopRequireDefault(_collection);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Manages UI Controllers.
  *
  * @memberOf ui
  * @extends utils.Collection
  */
	class ControllerCollection extends _collection2.default {
		/**
   * Creates an instance of the ControllerCollection class, initializing it with a name.
   */
		constructor(name) {
			super();

			if (!name) {
				/**
     * ControllerCollection must be initialized with a name.
     *
     * @error ui-controllercollection-no-name
     */
				throw new _ckeditorerror2.default('ui-controllercollection-no-name: ControllerCollection must be initialized with a name.');
			}

			/**
    * Name of this collection.
    *
    * @member {String} ui.ControllerCollection#name
    */
			this.name = name;

			/**
    * Parent controller of this collection.
    *
    * @member {ui.Controller} ui.ControllerCollection#parent
    */
			this.parent = null;
		}

		/**
   * Adds a child controller to the collection. If {@link ui.ControllerCollection#parent} {@link ui.Controller}
   * instance is ready, the child view is initialized when added.
   *
   * @param {ui.Controller} controller A child controller.
   * @param {Number} [index] Index at which the child will be added to the collection.
   * @returns {Promise} A Promise resolved when the child {@link ui.Controller#init} is done.
   */
		add(controller, index) {
			super.add(controller, index);

			// ChildController.init() returns Promise.
			let promise = Promise.resolve();

			if (this.parent && this.parent.ready && !controller.ready) {
				promise = promise.then(() => {
					return controller.init();
				});
			}

			return promise;
		}
	}
	exports.default = ControllerCollection;
});