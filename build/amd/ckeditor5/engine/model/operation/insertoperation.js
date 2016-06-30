define(['exports', './operation.js', '../nodelist.js', '../position.js', '../range.js', './removeoperation.js'], function (exports, _operation, _nodelist, _position, _range, _removeoperation) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _operation2 = _interopRequireDefault(_operation);

	var _nodelist2 = _interopRequireDefault(_nodelist);

	var _position2 = _interopRequireDefault(_position);

	var _range2 = _interopRequireDefault(_range);

	var _removeoperation2 = _interopRequireDefault(_removeoperation);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Operation to insert list of nodes on the given position in the tree data model.
  *
  * @memberOf engine.model.operation
  * @extends engine.model.operation.Operation
  */
	class InsertOperation extends _operation2.default {
		/**
   * Creates an insert operation.
   *
   * @param {engine.model.Position} position Position of insertion.
   * @param {engine.model.NodeSet} nodes The list of nodes to be inserted.
   * List of nodes can be any type accepted by the {@link engine.model.NodeList} constructor.
   * @param {Number} baseVersion {@link engine.model.Document#version} on which operation can be applied.
   */
		constructor(position, nodes, baseVersion) {
			super(baseVersion);

			/**
    * Position of insertion.
    *
    * @readonly
    * @member {engine.model.Position} engine.model.operation.InsertOperation#position
    */
			this.position = _position2.default.createFromPosition(position);

			/**
    * List of nodes to insert.
    *
    * @readonly
    * @member {engine.model.NodeList} engine.model.operation.InsertOperation#nodeList
    */
			this.nodeList = new _nodelist2.default(nodes);
		}

		get type() {
			return 'insert';
		}

		/**
   * @returns {engine.model.operation.InsertOperation}
   */
		clone() {
			return new InsertOperation(this.position, this.nodeList, this.baseVersion);
		}

		/**
   * @returns {engine.model.operation.RemoveOperation}
   */
		getReversed() {
			return new _removeoperation2.default(this.position, this.nodeList.length, this.baseVersion + 1);
		}

		_execute() {
			this.position.parent.insertChildren(this.position.offset, this.nodeList);

			return {
				range: _range2.default.createFromPositionAndShift(this.position, this.nodeList.length)
			};
		}

		/**
   * @inheritDoc
   */
		static get className() {
			return 'engine.model.operation.InsertOperation';
		}

		/**
   * Creates InsertOperation object from deserilized object, i.e. from parsed JSON string.
   *
   * @param {Object} json Deserialized JSON object.
   * @param {engine.model.Document} document Document on which this operation will be applied.
   * @returns {engine.model.operation.InsertOperation}
   */
		static fromJSON(json, document) {
			return new InsertOperation(_position2.default.fromJSON(json.position, document), _nodelist2.default.fromJSON(json.nodeList), json.baseVersion);
		}
	}
	exports.default = InsertOperation;
});