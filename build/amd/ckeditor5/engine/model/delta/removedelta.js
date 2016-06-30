define(['exports', './movedelta.js', '../batch.js', './deltafactory.js', '../operation/removeoperation.js', '../position.js', '../range.js'], function (exports, _movedelta, _batch, _deltafactory, _removeoperation, _position, _range) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _movedelta2 = _interopRequireDefault(_movedelta);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @classdesc
  * To provide specific OT behavior and better collisions solving, {@link engine.model.Batch#remove} method
  * uses the `RemoveDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class RemoveDelta extends _movedelta2.default {
		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.RemoveDelta';
		}
	}

	exports.default = RemoveDelta;
	function addRemoveOperation(batch, delta, position, howMany) {
		const operation = new _removeoperation2.default(position, howMany, batch.doc.version);
		delta.addOperation(operation);
		batch.doc.applyOperation(operation);
	}

	/**
  * Removes given node or range of nodes.
  *
  * @chainable
  * @method engine.model.Batch#remove
  * @param {engine.model.Node|engine.model.Range} nodeOrRange Node or range of nodes to remove.
  */
	(0, _batch.register)('remove', function (nodeOrRange) {
		const delta = new RemoveDelta();
		this.addDelta(delta);

		if (nodeOrRange instanceof _range2.default) {
			// The array is reversed, so the ranges are correct and do not have to be updated.
			let ranges = nodeOrRange.getMinimalFlatRanges().reverse();

			for (let flat of ranges) {
				addRemoveOperation(this, delta, flat.start, flat.end.offset - flat.start.offset);
			}
		} else {
			addRemoveOperation(this, delta, _position2.default.createBefore(nodeOrRange), 1);
		}

		return this;
	});

	_deltafactory2.default.register(RemoveDelta);
});