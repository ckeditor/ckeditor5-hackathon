define(['exports', './delta/basic-deltas.js', './delta/basic-transformations.js', './rootelement.js', './batch.js', './history.js', './selection.js', '../../utils/emittermixin.js', '../../utils/ckeditorerror.js', '../../utils/mix.js', './schema.js', './composer/composer.js', '../../utils/lib/lodash/clone.js'], function (exports, _basicDeltas, _basicTransformations, _rootelement, _batch, _history, _selection, _emittermixin, _ckeditorerror, _mix, _schema, _composer, _clone) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	// Load all basic deltas and transformations, they register themselves, but they need to be imported somewhere.

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _basicDeltas2 = _interopRequireDefault(_basicDeltas);

	var _basicTransformations2 = _interopRequireDefault(_basicTransformations);

	var _rootelement2 = _interopRequireDefault(_rootelement);

	var _batch2 = _interopRequireDefault(_batch);

	var _history2 = _interopRequireDefault(_history);

	var _selection2 = _interopRequireDefault(_selection);

	var _emittermixin2 = _interopRequireDefault(_emittermixin);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _mix2 = _interopRequireDefault(_mix);

	var _schema2 = _interopRequireDefault(_schema);

	var _composer2 = _interopRequireDefault(_composer);

	var _clone2 = _interopRequireDefault(_clone);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// jshint ignore:line

	const graveyardName = '$graveyard';

	/**
  * Document tree model describes all editable data in the editor. It may contain multiple
  * {@link engine.model.Document#roots root elements}, for example if the editor have multiple editable areas, each area will be
  * represented by the separate root.
  *
  * All changes in the document are done by {@link engine.model.operation.Operation operations}. To create operations in
  * the simple way use use the {@link engine.model.Batch} API, for example:
  *
  *		doc.batch().insert( position, nodes ).split( otherPosition );
  *
  * @see engine.model.Document#batch
  *
  * @memberOf engine.model
  */
	// jshint ignore:line
	class Document {
		/**
   * Creates an empty document instance with no {@link engine.model.Document#roots} (other than graveyard).
   */
		constructor() {
			/**
    * Document version. It starts from `0` and every operation increases the version number. It is used to ensure that
    * operations are applied on the proper document version. If the {@link engine.model.operation.Operation#baseVersion} will
    * not match document version the {@link document-applyOperation-wrong-version} error is thrown.
    *
    * @readonly
    * @member {Number} engine.model.Document#version
    */
			this.version = 0;

			/**
    * Selection done on this document.
    *
    * @readonly
    * @member {engine.model.Selection} engine.model.Document#selection
    */
			this.selection = new _selection2.default(this);

			/**
    * Schema for this document.
    *
    * @member {engine.model.Schema} engine.model.Document#schema
    */
			this.schema = new _schema2.default();

			/**
    * Composer for this document. Set of tools to work with the document.
    *
    * The features can tune up these tools to better work on their specific cases.
    *
    * @member {engine.model.composer.Composer} engine.model.Document#composer
    */
			this.composer = new _composer2.default();

			/**
    * Array of pending changes. See: {@link engine.model.Document#enqueueChanges}.
    *
    * @private
    * @member {Array.<Function>} engine.model.Document#_pendingChanges
    */
			this._pendingChanges = [];

			/**
    * List of roots that are owned and managed by this document. Use {@link engine.model.document#createRoot} and
    * {@link engine.model.document#getRoot} to manipulate it.
    *
    * @readonly
    * @protected
    * @member {Map} engine.model.Document#roots
    */
			this._roots = new Map();

			// Add events that will update selection attributes.
			this.selection.on('change:range', () => {
				this.selection._updateAttributes();
			});

			this.on('changesDone', () => {
				this.selection._updateAttributes();
			});

			// Graveyard tree root. Document always have a graveyard root, which stores removed nodes.
			this.createRoot(graveyardName);

			/**
    * Document's history.
    *
    * @readonly
    * @member {engine.model.History} engine.model.Document#history
    */
			this.history = new _history2.default();
		}

		/**
   * Graveyard tree root. Document always have a graveyard root, which stores removed nodes.
   *
   * @readonly
   * @type {engine.model.RootElement}
   */
		get graveyard() {
			return this.getRoot(graveyardName);
		}

		/**
   * Gets names of all roots (without the {@link engine.model.Document#graveyard}).
   *
   * @readonly
   * @type {Iterable.<String>}
   */
		get rootNames() {
			return Array.from(this._roots.keys()).filter(name => name != graveyardName);
		}

		/**
   * This is the entry point for all document changes. All changes on the document are done using
   * {@link engine.model.operation.Operation operations}. To create operations in the simple way use the
   * {@link engine.model.Batch} API available via {@link engine.model.Document#batch} method.
   *
   * @fires @link engine.model.Document#change
   * @param {engine.model.operation.Operation} operation Operation to be applied.
   */
		applyOperation(operation) {
			if (operation.baseVersion !== this.version) {
				/**
     * Only operations with matching versions can be applied.
     *
     * @error document-applyOperation-wrong-version
     * @param {engine.model.operation.Operation} operation
     */
				throw new _ckeditorerror2.default('document-applyOperation-wrong-version: Only operations with matching versions can be applied.', { operation: operation });
			}

			let changes = operation._execute();

			this.version++;

			this.history.addOperation(operation);

			const batch = operation.delta && operation.delta.batch;

			if (changes) {
				// `NoOperation` returns no changes, do not fire event for it.
				this.fire('change', operation.type, changes, batch);
			}
		}

		/**
   * Creates a {@link engine.model.Batch} instance which allows to change the document.
   *
   * @returns {engine.model.Batch} Batch instance.
   */
		batch() {
			return new _batch2.default(this);
		}

		/**
   * Creates a new top-level root.
   *
   * @param {String} [rootName='main'] Unique root name.
   * @param {String} [elementName='$root'] Element name. Defaults to `'$root'` which also have
   * some basic schema defined (`$block`s are allowed inside the `$root`). Make sure to define a proper
   * schema if you use a different name.
   * @returns {engine.model.RootElement} Created root.
   */
		createRoot(rootName = 'main', elementName = '$root') {
			if (this._roots.has(rootName)) {
				/**
     * Root with specified name already exists.
     *
     * @error document-createRoot-name-exists
     * @param {engine.model.Document} doc
     * @param {String} name
     */
				throw new _ckeditorerror2.default('document-createRoot-name-exists: Root with specified name already exists.', { name: rootName });
			}

			const root = new _rootelement2.default(this, elementName, rootName);
			this._roots.set(rootName, root);

			return root;
		}

		/**
   * Removes all events listeners set by document instance.
   */
		destroy() {
			this.selection.destroy();
			this.stopListening();
		}

		/**
   * Enqueues document changes. Any changes to be done on document (mostly using {@link engine.model.Document#batch}
   * should be placed in the queued callback. If no other plugin is changing document at the moment, the callback will be
   * called immediately. Otherwise it will wait for all previously queued changes to finish happening. This way
   * queued callback will not interrupt other callbacks.
   *
   * When all queued changes are done {@link engine.model.Document#changesDone} event is fired.
   *
   * @fires @link engine.model.Document#changesDone
   * @param {Function} callback Callback to enqueue.
   */
		enqueueChanges(callback) {
			this._pendingChanges.push(callback);

			if (this._pendingChanges.length == 1) {
				while (this._pendingChanges.length) {
					this._pendingChanges[0]();
					this._pendingChanges.shift();
				}

				this.fire('changesDone');
			}
		}

		/**
   * Returns top-level root by its name.
   *
   * @param {String} [name='main'] Unique root name.
   * @returns {engine.model.RootElement} Root registered under given name.
   */
		getRoot(name = 'main') {
			if (!this._roots.has(name)) {
				/**
     * Root with specified name does not exist.
     *
     * @error document-getRoot-root-not-exist
     * @param {String} name
     */
				throw new _ckeditorerror2.default('document-getRoot-root-not-exist: Root with specified name does not exist.', { name: name });
			}

			return this._roots.get(name);
		}

		/**
   * Checks if root with given name is defined.
   *
   * @param {String} name Name of root to check.
   * @returns {Boolean}
   */
		hasRoot(name) {
			return this._roots.has(name);
		}

		/**
   * Custom toJSON method to solve child-parent circular dependencies.
   *
   * @returns {Object} Clone of this object with the document property changed to string.
   */
		toJSON() {
			const json = (0, _clone2.default)(this);

			// Due to circular references we need to remove parent reference.
			json.selection = '[engine.model.Selection]';

			return {};
		}

		/**
   * Returns default root for this document which is either the first root that was added to the the document using
   * {@link engine.model.Document#createRoot} or the {@link engine.model.Document#graveyard graveyard root} if
   * no other roots were created.
   *
   * @protected
   * @returns {engine.model.RootElement} The default root for this document.
   */
		_getDefaultRoot() {
			for (let root of this._roots.values()) {
				if (root !== this.graveyard) {
					return root;
				}
			}

			return this.graveyard;
		}

		/**
   * Fired when document changes by applying an operation.
   *
   * There are 5 types of change:
   *
   * * 'insert' when nodes are inserted,
   * * 'remove' when nodes are removed,
   * * 'reinsert' when remove is undone,
   * * 'move' when nodes are moved,
   * * 'addAttribute' when attributes are added,
   * * 'removeAttribute' when attributes are removed,
   * * 'changeAttribute' when attributes change,
   * * 'addRootAttribute' when attribute for root is added,
   * * 'removeRootAttribute' when attribute for root is removed,
   * * 'changeRootAttribute' when attribute for root changes.
   *
   * @event engine.model.Document#change
   * @param {String} type Change type, possible option: 'insert', 'remove', 'reinsert', 'move', 'attribute'.
   * @param {Object} data Additional information about the change.
   * @param {engine.model.Range} data.range Range in model containing changed nodes. Note that the range state is
   * after changes has been done, i.e. for 'remove' the range will be in the {@link engine.model.Document#graveyard graveyard root}.
   * This is `undefined` for "...root..." types.
   * @param {engine.model.Position} [data.sourcePosition] Change source position. Exists for 'remove', 'reinsert' and 'move'.
   * Note that this position state is before changes has been done, i.e. for 'reinsert' the source position will be in the
   * {@link engine.model.Document#graveyard graveyard root}.
   * @param {String} [data.key] Only for attribute types. Key of changed / inserted / removed attribute.
   * @param {*} [data.oldValue] Only for 'removeAttribute', 'removeRootAttribute', 'changeAttribute' or
   * 'changeRootAttribute' type.
   * @param {*} [data.newValue] Only for 'addAttribute', 'addRootAttribute', 'changeAttribute' or
   * 'changeRootAttribute' type.
   * @param {engine.model.RootElement} [changeInfo.root] Root element which attributes got changed. This is defined
   * only for root types.
   * @param {engine.model.Batch} batch A {@link engine.model.Batch batch} of changes which this change is a part of.
   */

		/**
   * Fired when all queued document changes are done. See {@link engine.model.Document#enqueueChanges}.
   *
   * @event engine.model.Document#changesDone
   */
	}

	exports.default = Document;
	(0, _mix2.default)(Document, _emittermixin2.default);
});