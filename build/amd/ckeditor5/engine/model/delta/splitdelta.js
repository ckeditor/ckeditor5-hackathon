define(['exports', './delta.js', './deltafactory.js', '../batch.js', '../position.js', '../element.js', '../operation/insertoperation.js', '../operation/moveoperation.js', '../../../utils/ckeditorerror.js', '../delta/mergedelta.js'], function (exports, _delta, _deltafactory, _batch, _position, _element, _insertoperation, _moveoperation, _ckeditorerror, _mergedelta) {
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

	var _position2 = _interopRequireDefault(_position);

	var _element2 = _interopRequireDefault(_element);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	var _moveoperation2 = _interopRequireDefault(_moveoperation);

	var _ckeditorerror2 = _interopRequireDefault(_ckeditorerror);

	var _mergedelta2 = _interopRequireDefault(_mergedelta);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @classdesc
  * To provide specific OT behavior and better collisions solving, the {@link engine.model.Batch#split} method
  * uses `SplitDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class SplitDelta extends _delta2.default {
		/**
   * Position of split or `null` if there are no operations in the delta.
   *
   * @type {engine.model.Position|null}
   */
		get position() {
			return this._moveOperation ? this._moveOperation.sourcePosition : null;
		}

		getReversed() {
			let delta = super.getReversed();

			if (delta.operations.length > 0) {
				delta.operations[0].isSticky = true;
			}

			return delta;
		}

		/**
   * Operation in the delta that adds a node to the tree model where split elements will be moved to or `null` if
   * there are no operations in the delta.
   *
   * Most commonly this will be insert operation, as `SplitDelta` has to create a new node. If `SplitDelta` was created
   * through {@link engine.model.delta.MergeDelta MergeDelta} {@link engine.model.delta.Delta#getReversed reversing},
   * this will be a reinsert operation, as we will want to "insert-back" the node that was removed by `MergeDelta`.
   *
   * @protected
   * @type {engine.model.operation.InsertOpertaion|engine.model.operation.ReinsertOperation|null}
   */
		get _cloneOperation() {
			return this.operations[0] || null;
		}

		/**
   * Operation in the delta that moves nodes from after split position to their new parent
   * or `null` if there are no operations in the delta.
   *
   * @protected
   * @type {engine.model.operation.MoveOperation|null}
   */
		get _moveOperation() {
			return this.operations[1] || null;
		}

		get _reverseDeltaClass() {
			return _mergedelta2.default;
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.SplitDelta';
		}

		static get _priority() {
			return 5;
		}
	}

	exports.default = SplitDelta;
	/**
  * Splits a node at the given position.
  *
  * This cannot be a position inside the root element. The `batch-split-root` error will be thrown if
  * you try to split the root element.
  *
  * @chainable
  * @method engine.model.Batch#split
  * @param {engine.model.Position} position Position of split.
  */
	(0, _batch.register)('split', function (position) {
		const delta = new SplitDelta();
		this.addDelta(delta);

		const splitElement = position.parent;

		if (!splitElement.parent) {
			/**
    * Root element can not be split.
    *
    * @error batch-split-root
    */
			throw new _ckeditorerror2.default('batch-split-root: Root element can not be split.');
		}

		const copy = new _element2.default(splitElement.name, splitElement._attrs);

		const insert = new _insertoperation2.default(_position2.default.createAfter(splitElement), copy, this.doc.version);

		delta.addOperation(insert);
		this.doc.applyOperation(insert);

		const move = new _moveoperation2.default(position, splitElement.getChildCount() - position.offset, _position2.default.createFromParentAndOffset(copy, 0), this.doc.version);
		move.isSticky = true;

		delta.addOperation(move);
		this.doc.applyOperation(move);

		return this;
	});

	_deltafactory2.default.register(SplitDelta);
});