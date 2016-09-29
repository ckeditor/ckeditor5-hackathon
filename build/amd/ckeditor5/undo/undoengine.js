define(['exports', '../feature.js', './undocommand.js'], function (exports, _feature, _undocommand) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _feature2 = _interopRequireDefault(_feature);

	var _undocommand2 = _interopRequireDefault(_undocommand);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Undo engine feature.
  *
  * Undo brings in possibility to undo and redo changes done in the model by deltas through
  * the {@link engine.model.Document#batch Batch API}.
  *
  * @memberOf undo
  * @extends ckeditor5.Feature
  */
	class UndoEngine extends _feature2.default {
		/**
   * @inheritDoc
   */
		constructor(editor) {
			super(editor);

			/**
    * Undo command which manages undo {@link engine.model.Batch batches} stack (history).
    * Created and registered during {@link undo.UndoEngine#init feature initialization}.
    *
    * @private
    * @member {undo.UndoEngineCommand} undo.UndoEngine#_undoCommand
    */
			this._undoCommand = null;

			/**
    * Undo command which manages redo {@link engine.model.Batch batches} stack (history).
    * Created and registered during {@link undo.UndoEngine#init feature initialization}.
    *
    * @private
    * @member {undo.UndoEngineCommand} undo.UndoEngine#_redoCommand
    */
			this._redoCommand = null;

			/**
    * Keeps track of which batch has already been added to undo manager.
    *
    * @private
    * @member {WeakSet.<engine.model.Batch>} undo.UndoEngine#_batchRegistry
    */
			this._batchRegistry = new WeakSet();
		}

		/**
   * @inheritDoc
   */
		init() {
			// Create commands.
			this._redoCommand = new _undocommand2.default(this.editor);
			this._undoCommand = new _undocommand2.default(this.editor);

			// Register command to the editor.
			this.editor.commands.set('redo', this._redoCommand);
			this.editor.commands.set('undo', this._undoCommand);

			this.listenTo(this.editor.document, 'change', (evt, type, changes, batch) => {
				// Whenever a new batch is created add it to the undo history and clear redo history.
				if (batch && !this._batchRegistry.has(batch)) {
					this._batchRegistry.add(batch);
					this._undoCommand.addBatch(batch);
					this._redoCommand.clearStack();
				}
			});

			// Whenever batch is reverted by undo command, add it to redo history.
			this.listenTo(this._redoCommand, 'revert', (evt, batch) => {
				this._undoCommand.addBatch(batch);
			});

			// Whenever batch is reverted by redo command, add it to undo history.
			this.listenTo(this._undoCommand, 'revert', (evt, batch) => {
				this._redoCommand.addBatch(batch);
			});
		}
	}
	exports.default = UndoEngine;
});