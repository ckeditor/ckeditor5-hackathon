define(['exports', './delta.js', './deltafactory.js', './removedelta.js', '../batch.js', '../operation/insertoperation.js'], function (exports, _delta, _deltafactory, _removedelta, _batch, _insertoperation) {
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

	var _removedelta2 = _interopRequireDefault(_removedelta);

	var _insertoperation2 = _interopRequireDefault(_insertoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * @classdesc
  * To provide specific OT behavior and better collisions solving, the {@link engine.model.Batch#insert Batch#insert} method
  * uses the `InsertDelta` class which inherits from the `Delta` class and may overwrite some methods.
  *
  * @memberOf engine.model.delta
  */
	class InsertDelta extends _delta2.default {
		/**
   * Position where the delta inserts nodes or `null` if there are no operations in the delta.
   *
   * @type {engine.model.Position|null}
   */
		get position() {
			return this._insertOperation ? this._insertOperation.position : null;
		}

		/**
   * Node list containing all the nodes inserted by the delta or `null` if there are no operations in the delta.
   *
   * @type {engine.model.NodeList|null}
   */
		get nodeList() {
			return this._insertOperation ? this._insertOperation.nodeList : null;
		}

		/**
   * Insert operation that is saved in this delta or `null` if there are no operations in the delta.
   *
   * @protected
   * @type {engine.model.operation.InsertOperation|null}
   */
		get _insertOperation() {
			return this.operations[0] || null;
		}

		get _reverseDeltaClass() {
			return _removedelta2.default;
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.delta.InsertDelta';
		}

		static get _priority() {
			return 20;
		}
	}

	exports.default = InsertDelta;
	/**
  * Inserts a node or nodes at the given position.
  *
  * @chainable
  * @method engine.model.Batch#insert
  * @param {engine.model.Position} position Position of insertion.
  * @param {engine.model.NodeSet} nodes The list of nodes to be inserted.
  */
	(0, _batch.register)('insert', function (position, nodes) {
		const delta = new InsertDelta();
		const insert = new _insertoperation2.default(position, nodes, this.doc.version);

		this.addDelta(delta);
		delta.addOperation(insert);
		this.doc.applyOperation(insert);

		return this;
	});

	_deltafactory2.default.register(InsertDelta);
});