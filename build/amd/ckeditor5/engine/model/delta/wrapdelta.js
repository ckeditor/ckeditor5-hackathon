define(['exports', './delta.js', './deltafactory.js', './unwrapdelta.js', '../batch.js', '../position.js', '../range.js', '../element.js', '../operation/insertoperation.js', '../operation/moveoperation.js', '../../../utils/ckeditorerror.js'], function (exports, _delta, _deltafactory, _unwrapdelta, _batch, _position, _range, _element, _insertoperation, _moveoperation, _ckeditorerror) {
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

	var _unwrapdelta2 = _interopRequireDefault(_unwrapdelta);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _element2 = _interopRequireDefault(_element);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

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
  * uses the `WrapDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class WrapDelta extends _delta2.default {
		/**
   * Range to wrap or `null` if there are no operations in the delta.
   *
   * @type {engine.model.Range|null}
   */
		get range() {
			let moveOp = this._moveOperation;

			return moveOp ? _range2.default.createFromPositionAndShift(moveOp.sourcePosition, moveOp.howMany) : null;
		}

		/**
   * How many nodes is wrapped by the delta or `null` if there are no operations in delta.
   *
   * @type {Number}
   */
		get howMany() {
			let range = this.range;

			return range ? range.end.offset - range.start.offset : 0;
		}

		/**
   * Operation that inserts wrapping element or `null` if there are no operations in the delta.
   *
   * @protected
   * @type {engine.model.operation.InsertOperation|engine.model.operation.ReinsertOperation}
   */
		get _insertOperation() {
			return this.operations[0] || null;
		}

		/**
   * Operation that moves wrapped nodes to their new parent or `null` if there are no operations in the delta.
   *
   * @protected
   * @type {engine.model.operation.MoveOperation|null}
   */
		get _moveOperation() {
			return this.operations[1] || null;
		}

		get _reverseDeltaClass() {
			return _unwrapdelta2.default;
		}

		static get className() {
			return 'engine.model.delta.WrapDelta';
		}

		static get _priority() {
			return 10;
		}
	}

	exports.default = WrapDelta;
	/**
  * Wraps given range with given element or with a new element of specified name if string has been passed.
  * **Note:** given range should be a "flat range" (see {@link engine.model.Range#isFlat}). If not, error will be thrown.
  *
  * @chainable
  * @method engine.model.Batch#wrap
  * @param {engine.model.Range} range Range to wrap.
  * @param {engine.model.Element|String} elementOrString Element or name of element to wrap the range with.
  */
	(0, _batch.register)('wrap', function (range, elementOrString) {
		if (!range.isFlat) {
			/**
    * Range to wrap is not flat.
    *
    * @error batch-wrap-range-not-flat
    */
			throw new _ckeditorerror2.default('batch-wrap-range-not-flat: Range to wrap is not flat.');
		}

		let element = elementOrString instanceof _element2.default ? elementOrString : new _element2.default(elementOrString);

		if (element.getChildCount() > 0) {
			/**
    * Element to wrap with is not empty.
    *
    * @error batch-wrap-element-not-empty
    */
			throw new _ckeditorerror2.default('batch-wrap-element-not-empty: Element to wrap with is not empty.');
		}

		if (element.parent !== null) {
			/**
    * Element to wrap with is already attached to a tree model.
    *
    * @error batch-wrap-element-attached
    */
			throw new _ckeditorerror2.default('batch-wrap-element-attached: Element to wrap with is already attached to tree model.');
		}

		const delta = new WrapDelta();
		this.addDelta(delta);

		let insert = new _insertoperation2.default(range.end, element, this.doc.version);
		delta.addOperation(insert);
		this.doc.applyOperation(insert);

		let targetPosition = _position2.default.createFromParentAndOffset(element, 0);
		let move = new _moveoperation2.default(range.start, range.end.offset - range.start.offset, targetPosition, this.doc.version);
		delta.addOperation(move);
		this.doc.applyOperation(move);

		return this;
	});

	_deltafactory2.default.register(WrapDelta);
});