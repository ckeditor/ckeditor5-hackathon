define(['exports', './insertdelta.js', '../batch.js', './deltafactory.js', '../operation/insertoperation.js', '../nodelist.js'], function (exports, _insertdelta, _batch, _deltafactory, _insertoperation, _nodelist) {
  /**
   * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
   * For licensing, see LICENSE.md.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _insertdelta2 = _interopRequireDefault(_insertdelta);

  var _deltafactory2 = _interopRequireDefault(_deltafactory);

  var _insertoperation2 = _interopRequireDefault(_insertoperation);

  var _nodelist2 = _interopRequireDefault(_nodelist);

  function _interopRequireDefault(obj) {
    /* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @classdesc
   * To provide specific OT behavior and better collisions solving, the {@link engine.model.Batch#insert} method
   * uses the `WeakInsertDelta` class which inherits from the `Delta` class and may overwrite some methods.
   *
   * @memberOf engine.model.delta
   */
  class WeakInsertDelta extends _insertdelta2.default {
    /**
     * @inheritDoc
     */
    static get className() {
      return 'engine.model.delta.WeakInsertDelta';
    }
  }

  exports.default = WeakInsertDelta;
  /**
   * Inserts a node or nodes at the given position. {@link engine.model.Batch#weakInsert weakInsert} is commonly used for actions
   * like typing or plain-text paste (without formatting). There are two differences between
   * {@link engine.model.Batch#insert insert} and {@link engine.model.Batch#weakInsert weakInsert}:
   *
   * * When using `weakInsert`, inserted nodes will have same attributes as the current attributes of
   * {@link engine.model.Document#selection document selection}.
   * * Normal behavior is that inserting inside range changed by
   * {@link engine.model.operation.AttributeOperation AttributeOperation} splits
   * the operation into two operations, which "omit" the inserted nodes. The correct behavior for `WeakInsertDelta` is that
   * {@link engine.model.operation.AttributeOperation AttributeOperation} does not "break" and also
   * applies attributes for inserted nodes.
   * The above has to be reflected during {@link engine.model.operation.transform operational transformation}.
   *
   * @chainable
   * @method engine.model.Batch#weakInsert
   * @param {engine.model.Position} position Position of insertion.
   * @param {engine.model.NodeSet} nodes The list of nodes to be inserted.
   */
  (0, _batch.register)('weakInsert', function (position, nodes) {
    const delta = new WeakInsertDelta();
    this.addDelta(delta);

    nodes = new _nodelist2.default(nodes);

    for (let node of nodes._nodes) {
      node._attrs = new Map(this.doc.selection.getAttributes());
    }

    const operation = new _insertoperation2.default(position, nodes, this.doc.version);
    delta.addOperation(operation);
    this.doc.applyOperation(operation);

    return this;
  });

  _deltafactory2.default.register(WeakInsertDelta);
});