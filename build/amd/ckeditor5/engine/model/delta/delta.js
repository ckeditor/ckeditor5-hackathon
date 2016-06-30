define(['exports', '../../../utils/lib/lodash/clone.js', './deltafactory.js'], function (exports, _clone, _deltafactory) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _clone2 = _interopRequireDefault(_clone);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Base class for all deltas.
  *
  * Delta is a single, from the user action point of view, change in the editable document, like insert, split or
  * rename element. Delta is composed of operations, which are unit changes needed to be done to execute user action.
  *
  * Multiple deltas are grouped into a single {@link engine.model.Batch}.
  *
  * @memberOf engine.model.delta
  */
	class Delta {
		/**
   * Creates a delta instance.
   */
		constructor() {
			/**
    * {@link engine.model.Batch} which delta is a part of. This property is null by default and set by the
    * {@link engine.model.Batch#addDelta} method.
    *
    * @readonly
    * @member {engine.model.Batch} engine.model.delta.Delta#batch
    */
			this.batch = null;

			/**
    * Array of operations which compose delta.
    *
    * @readonly
    * @member {engine.model.operation.Operation[]} engine.model.delta.Delta#operations
    */
			this.operations = [];
		}

		/**
   * Returns delta base version which is equal to the base version of the first operation in delta. If there
   * are no operations in delta, returns `null`.
   *
   * @see engine.model.Document
   * @type {Number|null}
   */
		get baseVersion() {
			if (this.operations.length > 0) {
				return this.operations[0].baseVersion;
			}

			return null;
		}

		/**
   * @protected
   * @param {Number} baseVersion
   */
		set baseVersion(baseVersion) {
			for (let operation of this.operations) {
				operation.baseVersion = baseVersion++;
			}
		}

		/**
   * A class that will be used when creating reversed delta.
   *
   * @private
   * @type {Function}
   */
		get _reverseDeltaClass() {
			return Delta;
		}

		/**
   * Add operation to the delta.
   *
   * @param {engine.model.operation.Operation} operation Operation instance.
   */
		addOperation(operation) {
			operation.delta = this;
			this.operations.push(operation);

			return operation;
		}

		/**
   * Creates and returns a delta that has the same parameters as this delta.
   *
   * @returns {engine.model.delta.Delta} Clone of this delta.
   */
		clone() {
			let delta = new this.constructor();

			for (let op of this.operations) {
				delta.addOperation(op.clone());
			}

			return delta;
		}

		/**
   * Creates and returns a reverse delta. Reverse delta when executed right after the original delta will bring back
   * tree model state to the point before the original delta execution. In other words, it reverses changes done
   * by the original delta.
   *
   * Keep in mind that tree model state may change since executing the original delta, so reverse delta may be "outdated".
   * In that case you will need to {@link engine.model.delta.transform} it by all deltas that were executed after
   * the original delta.
   *
   * @returns {engine.model.delta.Delta} Reversed delta.
   */
		getReversed() {
			let delta = new this._reverseDeltaClass();

			for (let op of this.operations) {
				delta.addOperation(op.getReversed());
			}

			delta.operations.reverse();

			for (let i = 0; i < delta.operations.length; i++) {
				delta.operations[i].baseVersion = this.operations[this.operations.length - 1].baseVersion + i + 1;
			}

			return delta;
		}

		/**
   * Custom toJSON method to make deltas serializable.
   *
   * @returns {Object} Clone of this delta with added class name.
   */
		toJSON() {
			let json = (0, _clone2.default)(this);

			json.__className = this.constructor.className;

			// Remove parent batch to avoid circular dependencies.
			delete json.batch;

			return json;
		}

		/**
   * Delta class name. Used by {@link engine.model.delta.Delta#toJSON} method for serialization and
   * {@link engine.model.delta.DeltaFactory.fromJSON} during deserialization.
   *
   * @type {String}
   * @readonly
   */
		static get className() {
			return 'engine.model.delta.Delta';
		}

		/**
   * Delta priority. Used in {@link engine.model.delta.transform delta transformations}. Delta with the higher
   * priority will be treated as more important when resolving transformation conflicts. If deltas have same
   * priority, other factors will be used to determine which delta is more important.
   *
   * @private
   * @type {Number}
   */
		static get _priority() {
			return 0;
		}
	}

	exports.default = Delta;
	_deltafactory2.default.register(Delta);
});