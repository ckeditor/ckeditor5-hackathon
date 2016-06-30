define(['exports', './delta.js', './deltafactory.js', './splitdelta.js', '../batch.js', '../position.js', '../element.js', '../operation/removeoperation.js', '../operation/moveoperation.js', '../../../utils/ckeditorerror.js'], function (exports, _delta, _deltafactory, _splitdelta, _batch, _position, _element, _removeoperation, _moveoperation, _ckeditorerror) {
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

	var _splitdelta2 = _interopRequireDefault(_splitdelta);

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

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
  * uses the `MergeDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class MergeDelta extends _delta2.default {
		/**
   * Position between to merged nodes or `null` if the delta has no operations.
   *
   * @type {engine.model.Position|null}
   */
		get position() {
			return this._removeOperation ? this._removeOperation.sourcePosition : null;
		}

		getReversed() {
			let delta = super.getReversed();

			if (delta.operations.length > 0) {
				delta.operations[1].isSticky = false;
			}

			return delta;
		}

		/**
   * Operation in this delta that removes the node after merge position (which will be empty at that point) or
   * `null` if the delta has no operations. Note, that after {@link engine.model.delta.transform transformation}
   * this might be an instance of {@link engine.model.operation.MoveOperation} instead of
   * {@link engine.model.operation.RemoveOperation}.
   *
   * @protected
   * @type {engine.model.operation.MoveOperation|null}
   */
		get _removeOperation() {
			return this.operations[1] || null;
		}

		get _reverseDeltaClass() {
			return _splitdelta2.default;
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.MergeDelta';
		}
	}

	exports.default = MergeDelta;
	/**
  * Merges two siblings at the given position.
  *
  * Node before and after the position have to be an element. Otherwise `batch-merge-no-element-before` or
  * `batch-merge-no-element-after` error will be thrown.
  *
  * @chainable
  * @method engine.model.Batch#merge
  * @param {engine.model.Position} position Position of merge.
  */
	(0, _batch.register)('merge', function (position) {
		const delta = new MergeDelta();
		this.addDelta(delta);

		const nodeBefore = position.nodeBefore;
		const nodeAfter = position.nodeAfter;

		if (!(nodeBefore instanceof _element2.default)) {
			/**
    * Node before merge position must be an element.
    *
    * @error batch-merge-no-element-before
    */
			throw new _ckeditorerror2.default('batch-merge-no-element-before: Node before merge position must be an element.');
		}

		if (!(nodeAfter instanceof _element2.default)) {
			/**
    * Node after merge position must be an element.
    *
    * @error batch-merge-no-element-after
    */
			throw new _ckeditorerror2.default('batch-merge-no-element-after: Node after merge position must be an element.');
		}

		const positionAfter = _position2.default.createFromParentAndOffset(nodeAfter, 0);
		const positionBefore = _position2.default.createFromParentAndOffset(nodeBefore, nodeBefore.getChildCount());

		const move = new _moveoperation2.default(positionAfter, nodeAfter.getChildCount(), positionBefore, this.doc.version);
		move.isSticky = true;
		delta.addOperation(move);
		this.doc.applyOperation(move);

		const remove = new _removeoperation2.default(position, 1, this.doc.version);
		delta.addOperation(remove);
		this.doc.applyOperation(remove);

		return this;
	});

	_deltafactory2.default.register(MergeDelta);
});