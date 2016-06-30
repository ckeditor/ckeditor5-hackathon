define(['exports', './moveoperation.js', './removeoperation.js'], function (exports, _moveoperation, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Operation to reinsert previously removed nodes back to the non-graveyard root.
  * This is basically {@link engine.model.operation.MoveOperation} but it returns
  * {@link engine.model.operation.RemoveOperation} when reversed.
  *
  * With this class, we achieve two goals: by having separate classes it's easier to distinguish whether move
  * operation is actually a remove/reinsert operation and fire proper events. Also it
  * will be easier to expand if we need to change operation's behavior if it is remove/reinsert.
  *
  * @memberOf engine.model.operation
  * @extends engine.model.operation.Operation
  */
	class ReinsertOperation extends _moveoperation2.default {
		/**
   * Position where re-inserted node will be inserted.
   *
   * @type {engine.model.Position}
   */
		get position() {
			return this.targetPosition;
		}

		set position(pos) {
			this.targetPosition = pos;
		}

		get type() {
			return 'reinsert';
		}

		/**
   * @returns {engine.model.operation.RemoveOperation}
   */
		getReversed() {
			return new _removeoperation2.default(this.targetPosition, this.howMany, this.baseVersion + 1);
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.operation.ReinsertOperation';
		}

	}
	exports.default = ReinsertOperation;
});