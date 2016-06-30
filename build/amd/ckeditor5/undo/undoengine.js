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
  * Undo features brings in possibility to undo and re-do changes done in Tree Model by deltas through Batch API.
  *
  * @memberOf undo
  */
	class UndoEngine extends _feature2.default {
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
    * Keeps track of which batch has been added to undo command.
    *
    * @private
    * @member {WeakSet.<engine.model.Batch>} undo.UndoCommand#_batchRegistry
    */
			this._batchRegistry = new WeakSet();
		}

		/**
   * @inheritDoc
   */
		init() {
			// Create commands.
			this._undoCommand = new _undocommand2.default(this.editor, 'undo');
			this._redoCommand = new _undocommand2.default(this.editor, 'redo');

			// Register command to the editor.
			this.editor.commands.set('redo', this._redoCommand);
			this.editor.commands.set('undo', this._undoCommand);

			this.listenTo(this.editor.document, 'change', (evt, type, changes, batch) => {
				// If changes are not a part of a batch or this is not a new batch, omit those changes.
				if (!batch || this._batchRegistry.has(batch) || batch.type == 'ignore') {
					return;
				}

				if (batch.type == 'undo') {
					// If this batch comes from `undoCommand`, add it to `redoCommand` stack.
					this._redoCommand.addBatch(batch);
				} else if (batch.type == 'redo') {
					// If this batch comes from `redoCommand`, add it to `undoCommand` stack.
					this._undoCommand.addBatch(batch);
				} else {
					// Any other batch - these are new changes in the document.
					// Add them to `undoCommand` stack and clear `redoCommand` stack.
					this._undoCommand.addBatch(batch);
					this._redoCommand.clearStack();
				}

				// Add the batch to the registry so it will not be processed again.
				this._batchRegistry.add(batch);
			});
		}
	}
	exports.default = UndoEngine;
});