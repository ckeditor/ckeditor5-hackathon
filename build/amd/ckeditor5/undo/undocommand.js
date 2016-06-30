define(['exports', '../command/command.js', '../engine/model/batch.js', '../engine/model/delta/transform.js'], function (exports, _command, _batch, _transform) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _command2 = _interopRequireDefault(_command);

	var _batch2 = _interopRequireDefault(_batch);

	var _transform2 = _interopRequireDefault(_transform);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Undo command stores batches in itself and is able to and apply reverted versions of them on the document.
  *
  * @memberOf undo
  */
	class UndoCommand extends _command2.default {
		constructor(editor, type) {
			super(editor);

			/**
    * Items that are pairs of:
    *
    * * batches which are saved by the command and,
    * * model selection state at the moment of saving the batch.
    *
    * @private
    * @member {Array} undo.UndoCommand#_items
    */
			this._items = [];

			/**
    * Command type. Could be `"undo"` or `"redo"`.
    *
    * @private
    * @member {'undo'|'redo'} undo.UndoCommand#_type
    */
			this._type = type;
		}

		/**
   * Stores a batch in the command. Stored batches can be then reverted.
   *
   * @param {engine.model.Batch} batch Batch to add.
   */
		addBatch(batch) {
			const selection = {
				ranges: Array.from(this.editor.document.selection.getRanges()),
				isBackward: this.editor.document.selection.isBackward
			};

			this._items.push({ batch, selection });
			this.refreshState();
		}

		/**
   * Removes all batches from the stack.
   */
		clearStack() {
			this._items = [];
			this.refreshState();
		}

		/**
   * @inheritDoc
   */
		_checkEnabled() {
			return this._items.length > 0;
		}

		/**
   * Executes the command: reverts a {@link engine.model.Batch batch} added to the command's stack,
   * applies it on the document and removes the batch from the stack.
   *
   * @protected
   * @fires undo.undoCommand#event:revert
   * @param {engine.model.Batch} [batch] If set, batch that should be undone. If not set, the last added batch will be undone.
   */
		_doExecute(batch = null) {
			// If batch is not given, set `batchIndex` to the last index in command stack.
			let batchIndex = batch ? this._items.findIndex(a => a.batch == batch) : this._items.length - 1;

			const toUndo = this._items.splice(batchIndex, 1)[0];
			const document = this.editor.document;

			// All changes done by the undo command execution will be saved as one batch.
			const undoingBatch = new _batch2.default();
			undoingBatch.type = this._type;

			// All changes has to be done in one `enqueueChanges` callback so other listeners will not
			// step between consecutive deltas that are undoing given batch, or won't do changes
			// do the document before selection is properly restored.
			document.enqueueChanges(() => {
				undo(toUndo.batch, undoingBatch, this.editor.document);
				restoreSelection(toUndo.selection, toUndo.batch.deltas[0].baseVersion, this.editor.document);
			});

			this.fire('revert', toUndo.batch);
			this.refreshState();
		}
	}

	exports.default = UndoCommand;
	// Helper function for `UndoCommand`.
	// Does all the things needed to undo `batchToUndo` batch.
	function undo(batchToUndo, undoingBatch, document) {
		const history = document.history;
		const deltasToUndo = batchToUndo.deltas.slice();
		deltasToUndo.reverse();

		// For each delta from `batchToUndo`, in reverse order.
		for (let deltaToUndo of deltasToUndo) {
			// Keep in mind that all algorithms return arrays, as the transformation might result
			// in multiple deltas. For simplicity reasons, we will use singular form in description and names.
			// 1. Reverse the delta.
			let reversedDelta = [deltaToUndo.getReversed()];

			// Stores history deltas transformed by `deltaToUndo`. Will be used later to updated document history.
			const updatedHistoryDeltas = {};

			// Base version from which to get history delta. We want to transform through all the deltas from history
			// that happened after this delta, so we set baseVersion just after this delta.
			const historyVersion = deltaToUndo.baseVersion + deltaToUndo.operations.length;

			// 2. Get all active deltas from document history that happened after `deltaToUndo`.
			for (let historyItem of history.getHistoryItems(historyVersion)) {
				// History returns a delta and it's index in the history.
				// Multiple history deltas might be stored under one index, though.
				const historyDelta = historyItem.delta;
				const historyIndex = historyItem.index;

				// 2.1. Transform delta from document history by reversed delta to undo.
				// We need this to update document history.
				const updatedHistoryDelta = transformDelta([historyDelta], reversedDelta, false);

				// 2.2. Transform reversed delta to undo by a delta from document history.
				reversedDelta = transformDelta(reversedDelta, [historyDelta], true);

				// 2.3. Store updated history delta so it will be updated in history after `deltaToUndo` gets processed.
				if (!updatedHistoryDeltas[historyIndex]) {
					updatedHistoryDeltas[historyIndex] = [];
				}

				updatedHistoryDeltas[historyIndex] = updatedHistoryDeltas[historyIndex].concat(updatedHistoryDelta);
			}

			// 3. After `reversedDelta` has been transformed by all active deltas in history, apply it.
			for (let delta of reversedDelta) {
				delta.baseVersion = document.version;

				// Before applying, add the delta to the `undoingBatch`.
				undoingBatch.addDelta(delta);

				// Now, apply all operations of the delta.
				for (let operation of delta.operations) {
					document.applyOperation(operation);
				}
			}

			// 4. Set `reversedDelta` and `deltaToUndo` as inactive deltas in history.
			history.markInactiveDelta(deltaToUndo);

			for (let delta of reversedDelta) {
				history.markInactiveDelta(delta);
			}

			// 5. Update deltas in history.
			for (let historyIndex in updatedHistoryDeltas) {
				history.updateDelta(Number(historyIndex), updatedHistoryDeltas[historyIndex]);
			}
		}
	}

	// Helper function for `UndoCommand`.
	// Performs a transformation of set of deltas `setToTransform` by given
	// `setToTransformBy` set of deltas. If `setToTransform` deltas are more important than
	// `setToTransformBy` deltas, `isStrong` should be true.
	function transformDelta(setToTransform, setToTransformBy, isStrong = false) {
		let results = [];

		for (let toTransform of setToTransform) {
			let to = [toTransform];

			for (let t = 0; t < to.length; t++) {
				for (let transformBy of setToTransformBy) {
					let transformed = (0, _transform2.default)(to[t], transformBy, isStrong);
					to.splice(t, 1, ...transformed);
					t = t - 1 + transformed.length;
				}
			}

			results = results.concat(to);
		}

		return results;
	}

	// Helper function for `UndoCommand`.
	// Is responsible for restoring given `selectionState` and transform it
	// accordingly to the changes that happened to the document after the
	// `selectionState` got saved.
	function restoreSelection(selectionState, baseVersion, document) {
		const history = document.history;

		// Take all selection ranges that were stored with undone batch.
		const ranges = selectionState.ranges;

		// This will keep the transformed selection ranges.
		const transformedRanges = [];

		for (let originalRange of ranges) {
			// We create `transformed` array. At the beginning it will have only the original range.
			// During transformation the original range will change or even break into smaller ranges.
			// After the range is broken into two ranges, we have to transform both of those ranges separately.
			// For that reason, we keep all transformed ranges in one array and operate on it.
			let transformed = [originalRange];

			// The ranges will be transformed by active deltas from history that happened
			// after the selection got stored. Note, that at this point the document history
			// already is updated so we will not transform the range by deltas that got undone,
			// or their reversed version.
			for (let historyItem of history.getHistoryItems(baseVersion)) {
				const delta = historyItem.delta;

				for (let operation of delta.operations) {
					// We look through all operations from all deltas.

					for (let i = 0; i < transformed.length; i++) {
						// We transform every range by every operation.
						// We keep current state of transformation in `transformed` array and update it.
						let result;

						switch (operation.type) {
							case 'insert':
								result = transformed[i].getTransformedByInsertion(operation.position, operation.nodeList.length, true);
								break;

							case 'move':
							case 'remove':
							case 'reinsert':
								result = transformed[i].getTransformedByMove(operation.sourcePosition, operation.targetPosition, operation.howMany, true);
								break;
						}

						// If we have a transformation result, we substitute it in `transformed` array with
						// the range that got transformed. Keep in mind that the result is an array
						// and may contain multiple ranges.
						if (result) {
							transformed.splice(i, 1, ...result);

							// Fix iterator.
							i = i + result.length - 1;
						}
					}
				}
			}

			// After `originalRange` got transformed, we have an array of ranges. Some of those
			// ranges may be "touching" -- they can be next to each other and could be merged.
			// Let's do this. First, we have to sort those ranges because they don't have to be
			// in an order.
			transformed.sort((a, b) => a.start.isBefore(b.start) ? -1 : 1);

			// Then we check if two consecutive ranges are touching. We can do it pair by pair
			// in one dimensional loop because ranges are sorted.
			for (let i = 1; i < transformed.length; i++) {
				let a = transformed[i - 1];
				let b = transformed[i];

				if (a.end.isTouching(b.start)) {
					a.end = b.end;
					transformed.splice(i, 1);
					i--;
				}
			}

			// For each `originalRange` from `ranges`, we take only one transformed range.
			// This is because we want to prevent situation where single-range selection
			// got transformed to mulit-range selection. We will take the first range that
			// is not in the graveyard.
			const transformedRange = transformed.find(range => range.start.root != document.graveyard);

			if (transformedRange) {
				transformedRanges.push(transformedRange);
			}
		}

		// `transformedRanges` may be empty if all ranges ended up in graveyard.
		// If that is the case, do not restore selection.
		if (transformedRanges.length) {
			document.selection.setRanges(transformedRanges, selectionState.isBackward);
		}
	}
});