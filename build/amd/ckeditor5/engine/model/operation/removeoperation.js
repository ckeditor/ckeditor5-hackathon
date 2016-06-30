define(['exports', './moveoperation.js', '../position.js', './reinsertoperation.js'], function (exports, _moveoperation, _position, _reinsertoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _position2 = _interopRequireDefault(_position);

	var _reinsertoperation2 = _interopRequireDefault(_reinsertoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Operation to remove a range of nodes.
  *
  * @memberOf engine.model.operation
  * @extends engine.model.operation.Operation
  */
	class RemoveOperation extends _moveoperation2.default {
		/**
   *
   * Creates a remove operation.
   *
   * @param {engine.model.Position} position Position before the first node to remove.
   * @param {Number} howMany How many nodes to remove.
   * @param {Number} baseVersion {@link engine.model.Document#version} on which operation can be applied.
   */
		constructor(position, howMany, baseVersion) {
			// Position in a graveyard where nodes were moved.
			const graveyardPosition = _position2.default.createFromParentAndOffset(position.root.document.graveyard, 0);

			super(position, howMany, graveyardPosition, baseVersion);
		}

		get type() {
			return 'remove';
		}

		/**
   * @returns {engine.model.operation.ReinsertOperation}
   */
		getReversed() {
			return new _reinsertoperation2.default(this.targetPosition, this.howMany, this.sourcePosition, this.baseVersion + 1);
		}

		/**
   * @returns {engine.model.operation.RemoveOperation}
   */
		clone() {
			return new RemoveOperation(this.sourcePosition, this.howMany, this.baseVersion);
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.operation.RemoveOperation';
		}
	}
	exports.default = RemoveOperation;
});