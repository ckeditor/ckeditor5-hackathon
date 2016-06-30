define(['exports', '../utils/collection.js', '../utils/ckeditorerror.js', '../utils/emittermixin.js', '../utils/mix.js'], function (exports, _collection, _ckeditorerror, _emittermixin, _mix) {
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

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Basic Controller class.
  *
  * @memberOf ui
  * @mixes utils.EmitterMixin
  */

	class Controller {
		/**
   * Creates an instance of the {@link ui.Controller} class.
   *
   * @param {ui.Model} [model] Model of this Controller.
   * @param {ui.View} [view] View instance of this Controller.
   */
		constructor(model, view) {
			/**
    * Model of this controller.
    *
    * @member {ui.Model} ui.Controller#model
    */
			this.model = model || null;

			/**
    * Set `true` after {@link #init}.
    *
    * @member {Boolean} ui.Controller#ready
    */
			this.ready = false;

			/**
    * View of this controller.
    *
    * @member {ui.View} ui.Controller#view
    */
			this.view = view || null;

			/**
    * A collection of {@link ControllerCollection} instances containing
    * child controllers.
    *
    * @member {utils.Collection} ui.Controller#collections
    */
			this.collections = new _collection2.default({
				idProperty: 'name'
			});

			// Listen to {@link ControllerCollection#add} and {@link ControllerCollection#remove}
			// of newly added Collection to synchronize this controller's view and children
			// controllers' views in the future.
			this.collections.on('add', (evt, collection) => {
				// Set the {@link ControllerCollection#parent} to this controller.
				// It allows the collection to determine the {@link #ready} state of this controller
				// and accordingly initialize a child controller when added.
				collection.parent = this;

				this.listenTo(collection, 'add', (evt, childController, index) => {
					// Child view is added to corresponding region in this controller's view
					// when a new Controller joins the collection.
					if (this.ready && childController.view) {
						this.view.regions.get(collection.name).views.add(childController.view, index);
					}
				});

				this.listenTo(collection, 'remove', (evt, childController) => {
					// Child view is removed from corresponding region in this controller's view
					// when a new Controller is removed from the the collection.
					if (this.ready && childController.view) {
						this.view.regions.get(collection.name).views.remove(childController.view);
					}
				});
			});

			this.collections.on('remove', (evt, collection) => {
				// Release the collection. Once removed from {@link #collections}, it can be
				// moved to another controller.
				collection.parent = null;

				this.stopListening(collection);
			});
		}

		/**
   * Initializes the controller instance. The process includes:
   *
   * 1. Initialization of the child {@link #view}.
   * 2. Initialization of child controllers in {@link #collections}.
   * 3. Setting {@link #ready} flag `true`.
   *
   * @returns {Promise} A Promise resolved when the initialization process is finished.
   */
		init() {
			if (this.ready) {
				/**
     * This Controller already been initialized.
     *
     * @error ui-controller-init-reinit
     */
				throw new _ckeditorerror2.default('ui-controller-init-reinit: This Controller already been initialized.');
			}

			return Promise.resolve().then(this._initView.bind(this)).then(this._initCollections.bind(this)).then(() => {
				this.ready = true;
				this.fire('ready');
			});
		}

		/**
   * Destroys the controller instance. The process includes:
   *
   * 1. Destruction of the child {@link #view}.
   * 2. Destruction of child controllers in {@link #collections}.
   *
   * @returns {Promise} A Promise resolved when the destruction process is finished.
   */
		destroy() {
			let promises = [];
			let collection, childController;

			for (collection of this.collections) {
				for (childController of collection) {
					promises.push(childController.destroy());
				}

				collection.clear();
			}

			this.collections.clear();

			if (this.view) {
				promises.push(Promise.resolve().then(() => {
					return this.view.destroy();
				}));
			}

			promises.push(Promise.resolve().then(() => {
				this.model = this.ready = this.view = this.collections = null;
			}));

			return Promise.all(promises);
		}

		/**
   * Adds a child {@link Controller} instance to {@link #collections} at given index.
   *
   * @param {String} collectionName Name of the Controller Collection.
   * @param {ui.Controller} controller A controller instance to be added.
   * @param {Number} [index] An index in the collection.
   */
		add(collectionName, controller, index) {
			this.collections.get(collectionName).add(controller, index);
		}

		/**
   * Removes a child {@link ui.Controller} instance from one of {@link ui.Controller#collections}.
   *
   * @param {String} collectionName Name of the Controller Collection.
   * @param {ui.Controller|Number} toRemove A Controller instance or index to be removed.
   */
		remove(collectionName, toRemove) {
			return this.collections.get(collectionName).remove(toRemove);
		}

		/**
   * Initializes the {@link #view} of this controller instance.
   *
   * @protected
   * @returns {Promise} A Promise resolved when initialization process is finished.
   */
		_initView() {
			let promise = Promise.resolve();

			if (this.view) {
				promise = promise.then(this.view.init.bind(this.view));
			}

			return promise;
		}

		/**
   * Initializes the {@link #collections} of this controller instance.
   *
   * @protected
   * @returns {Promise} A Promise resolved when initialization process is finished.
   */
		_initCollections() {
			const promises = [];
			let collection, childController;

			for (collection of this.collections) {
				for (childController of collection) {
					if (this.view && childController.view) {
						this.view.regions.get(collection.name).views.add(childController.view);
					}

					promises.push(childController.init());
				}
			}

			return Promise.all(promises);
		}
	}

	exports.default = Controller;
	(0, _mix2.default)(Controller, _emittermixin2.default);

	/**
  * Fired when the controller is fully initialized.
  *
  * @event ui.Controller#ready
  */
});