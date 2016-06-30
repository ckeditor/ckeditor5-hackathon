define(['exports', './delta/basic-deltas.js', './delta/basic-transformations.js', './delta/transform.js', '../../utils/ckeditorerror.js'], function (exports, _basicDeltas, _basicTransformations, _transform, _ckeditorerror) {
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

	var _transform2 = _interopRequireDefault(_transform);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * History keeps the track of all the deltas applied to the {@link engine.model.Document document} and provides
  * utility tools to operate on the history. Most of times history is needed to transform a delta that has wrong
  * {@link engine.model.delta.Delta#baseVersion} to a state where it can be applied to the document.
  *
  * @memberOf engine.model
  */
	// jshint ignore:line

	class History {
		/**
   * Creates an empty History instance.
   */
		constructor() {
			/**
    * Deltas added to the history.
    *
    * @private
    * @member {Array.<engine.model.delta.Delta>} engine.model.History#_deltas
    */
			this._deltas = [];

			/**
    * Helper structure that maps added delta's base version to the index in {@link engine.model.History#_deltas}
    * at which the delta was added.
    *
    * @private
    * @member {Map} engine.model.History#_historyPoints
    */
			this._historyPoints = new Map();
		}

		/**
   * Gets the number of base version which an up-to-date operation should have.
   *
   * @private
   * @type {Number}
   */
		get _nextHistoryPoint() {
			const lastDelta = this._deltas[this._deltas.length - 1];

			return lastDelta.baseVersion + lastDelta.operations.length;
		}

		/**
   * Adds an operation to the history.
   *
   * @param {engine.model.operation.Operation} operation Operation to add.
   */
		addOperation(operation) {
			const delta = operation.delta;

			// History cares about deltas not singular operations.
			// Operations from a delta are added one by one, from first to last.
			// Operations from one delta cannot be mixed with operations from other deltas.
			// This all leads us to the conclusion that we could just save deltas history.
			// What is more, we need to check only the last position in history to check if delta is already in the history.
			if (delta && this._deltas[this._deltas.length - 1] !== delta) {
				const index = this._deltas.length;

				this._deltas[index] = delta;
				this._historyPoints.set(delta.baseVersion, index);
			}
		}

		/**
   * Transforms out-dated delta by all deltas that were added to the history since the given delta's base version. In other
   * words, it makes the delta up-to-date with the history. The transformed delta(s) is (are) ready to be applied
   * to the {@link engine.model.Document document}.
   *
   * @param {engine.model.delta.Delta} delta Delta to update.
   * @returns {Array.<engine.model.delta.Delta>} Result of transformation which is an array containing one or more deltas.
   */
		getTransformedDelta(delta) {
			if (delta.baseVersion === this._nextHistoryPoint) {
				return [delta];
			}

			let transformed = [delta];

			for (let historyDelta of this.getDeltas(delta.baseVersion)) {
				let allResults = [];

				for (let deltaToTransform of transformed) {
					const transformedDelta = History._transform(deltaToTransform, historyDelta);
					allResults = allResults.concat(transformedDelta);
				}

				transformed = allResults;
			}

			// Fix base versions.
			let baseVersion = transformed[0].operations[0].baseVersion;

			for (let i = 0; i < transformed.length; i++) {
				transformed[i].baseVersion = baseVersion;
				baseVersion += transformed[i].operations.length;
			}

			return transformed;
		}

		/**
   * Returns all deltas from history, starting from given history point (if passed).
   *
   * @param {Number} from History point.
   * @returns {Iterator.<engine.model.delta.Delta>} Deltas from given history point to the end of history.
   */
		*getDeltas(from = 0) {
			let i = this._historyPoints.get(from);

			if (i === undefined) {
				throw new _ckeditorerror2.default('history-wrong-version: Cannot retrieve given point in the history.');
			}

			for (; i < this._deltas.length; i++) {
				yield this._deltas[i];
			}
		}

		/**
   * Transforms given delta by another given delta. Exposed for testing purposes.
   *
   * @protected
   * @param {engine.model.delta.Delta} toTransform Delta to be transformed.
   * @param {engine.model.delta.Delta} transformBy Delta to transform by.
   * @returns {Array.<engine.model.delta.Delta>} Result of the transformation.
   */
		static _transform(toTransform, transformBy) {
			return (0, _transform2.default)(toTransform, transformBy, true);
		}
	}
	exports.default = History;
});