define(['exports', './delta.js', './deltafactory.js', './wrapdelta.js', '../batch.js', '../position.js', '../operation/removeoperation.js', '../operation/moveoperation.js', '../../../utils/ckeditorerror.js'], function (exports, _delta, _deltafactory, _wrapdelta, _batch, _position, _removeoperation, _moveoperation, _ckeditorerror) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _delta2 = _interopRequireDefault(_delta);

	var _deltafactory2 = _interopRequireDefault(_deltafactory);

	var _wrapdelta2 = _interopRequireDefault(_wrapdelta);

	var _position2 = _interopRequireDefault(_position);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @classdesc
  * To provide specific OT behavior and better collisions solving, {@link engine.model.Batch#merge} method
  * uses the `UnwrapDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class UnwrapDelta extends _delta2.default {
		/**
   * Position before unwrapped element or `null` if there are no operations in the delta.
   *
   * @type {engine.model.Position|null}
   */
		get position() {
			return this._moveOperation ? this._moveOperation.targetPosition : null;
		}

		/**
   * Operation in the delta that moves unwrapped nodes to their new parent or `null` if there are no operations in the delta.
   *
   * @protected
   * @type {engine.model.operation.MoveOperation|null}
   */
		get _moveOperation() {
			return this.operations[0] || null;
		}

		get _reverseDeltaClass() {
			return _wrapdelta2.default;
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.UnwrapDelta';
		}

		static get _priority() {
			return 10;
		}
	}

	exports.default = UnwrapDelta;
	/**
  * Unwraps specified element, that is moves all it's children before it and then removes it. Throws
  * error if you try to unwrap an element that does not have a parent.
  *
  * @chainable
  * @method engine.model.Batch#unwrap
  * @param {engine.model.Element} position Element to unwrap.
  */
	(0, _batch.register)('unwrap', function (element) {
		if (element.parent === null) {
			/**
    * Trying to unwrap an element that has no parent.
    *
    * @error batch-unwrap-element-no-parent
    */
			throw new _ckeditorerror2.default('batch-unwrap-element-no-parent: Trying to unwrap an element that has no parent.');
		}

		const delta = new UnwrapDelta();
		this.addDelta(delta);

		let sourcePosition = _position2.default.createFromParentAndOffset(element, 0);

		const move = new _moveoperation2.default(sourcePosition, element.getChildCount(), _position2.default.createBefore(element), this.doc.version);
		move.isSticky = true;
		delta.addOperation(move);
		this.doc.applyOperation(move);

		// Computing new position because we moved some nodes before `element`.
		// If we would cache `Position.createBefore( element )` we remove wrong node.
		const remove = new _removeoperation2.default(_position2.default.createBefore(element), 1, this.doc.version);
		delta.addOperation(remove);
		this.doc.applyOperation(remove);

		return this;
	});

	_deltafactory2.default.register(UnwrapDelta);
});