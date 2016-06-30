define(['exports', '../../../utils/ckeditorerror.js', '../operation/operationfactory.js'], function (exports, _ckeditorerror, _operationfactory) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _operationfactory2 = _interopRequireDefault(_operationfactory);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const deserializers = new Map();

	/**
  * A factory class for creating operations.
  *
  * Delta is a single, from the user action point of view, change in the editable document, like insert, split or
  * rename element. Delta is composed of operations, which are unit changes needed to be done to execute user action.
  *
  * Multiple deltas are grouped into a single {@link engine.model.Batch}.
  *
  * @memberOf engine.model.delta
  */
	class DeltaFactory {
		/**
   * Creates InsertDelta from deserialized object, i.e. from parsed JSON string.
   *
   * @param {Object} json
   * @param {engine.model.Document} doc Document on which this delta will be applied.
   * @returns {engine.model.delta.InsertDelta}
   */
		static fromJSON(json, doc) {
			if (!deserializers.has(json.__className)) {
				/**
     * This delta has no defined deserializer.
     *
     * @error delta-fromjson-no-deserializer
     * @param {String} name
     */
				throw new _ckeditorerror2.default('delta-fromjson-no-deserializer: This delta has no defined deserializer', { name: json.__className });
			}

			let Delta = deserializers.get(json.__className);

			let delta = new Delta();

			for (let operation of json.operations) {
				delta.addOperation(_operationfactory2.default.fromJSON(operation, doc));
			}

			return delta;
		}

		/**
   * Registers a class for delta factory.
   *
   * @param {Function} Delta A delta class to register.
   */
		static register(Delta) {
			deserializers.set(Delta.className, Delta);
		}
	}
	exports.default = DeltaFactory;
});