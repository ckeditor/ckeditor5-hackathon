define(['exports', './operation.js'], function (exports, _operation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _operation2 = _interopRequireDefault(_operation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Operation which is doing nothing ("empty operation", "do-nothing operation", "noop").
  * This is an operation, which when executed does not change the tree model.
  * It still has some parameters defined for transformation purposes.
  *
  * In most cases this operation is a result of transforming operations. When transformation returns
  * {@link engine.model.operation.NoOperation} it means that changes done by the transformed operation
  * have already been applied.
  *
  * @memberOf engine.model.operation
  * @extends engine.model.operation.Operation
  */
	class NoOperation extends _operation2.default {
		/**
   * @returns {engine.model.operation.NoOperation}
   */
		clone() {
			return new NoOperation(this.baseVersion);
		}

		/**
   * @returns {engine.model.operation.NoOperation}
   */
		getReversed() {
			return new NoOperation(this.baseVersion + 1);
		}

		_execute() {}
		// Do nothing.


		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.operation.NoOperation';
		}
	}
	exports.default = NoOperation;
});