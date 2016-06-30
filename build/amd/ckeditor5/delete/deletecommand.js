define(['exports', '../command/command.js'], function (exports, _command) {
	/**
  * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
  * For licensing, see LICENSE.md.
  */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _command2 = _interopRequireDefault(_command);

	function _interopRequireDefault(obj) {
		/* istanbul ignore next */
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Delete command. Used by the {@link delete.Delete delete feature} to handle <kbd>Delete</kbd> and
  * <kbd>Backspace</kbd> keys.
  *
  * @member delete
  * @extends ckeditor5.command.Command
  */
	class DeleteCommand extends _command2.default {
		/**
   * Creates instance of the command;
   *
   * @param {ckeditor5.Editor} editor
   * @param {'FORWARD'|'BACKWARD'} direction The directionality of the delete (in what direction it should
   * consume the content when selection is collapsed).
   */
		constructor(editor, direction) {
			super(editor);

			/**
    * The directionality of the delete (in what direction it should
    * consume the content when selection is collapsed).
    *
    * @readonly
    * @member {'FORWARD'|'BACKWARD'} delete.DeleteCommand#direction
    */
			this.direction = direction;
		}

		/**
   * Executes the command: depending on whether the selection is collapsed or not, deletes its contents
   * or piece of content in the {@link delete.DeleteCommand#direction defined direction}.
   *
   * @param {Object} [options] The command options.
   * @param {'CHARACTER'} [options.unit='CHARACTER'] See {@link engine.model.composer.modifySelection}'s options.
   */
		_doExecute(options = {}) {
			const doc = this.editor.document;

			doc.enqueueChanges(() => {
				// Try to extend the selection in the specified direction.
				if (doc.selection.isCollapsed) {
					doc.composer.modifySelection(doc.selection, { direction: this.direction, unit: options.unit });
				}

				// If selection is still collapsed, then there's nothing to delete.
				if (doc.selection.isCollapsed) {
					return;
				}

				doc.composer.deleteContents(doc.batch(), doc.selection, {
					direction: this.direction,
					merge: true
				});
			});
		}
	}
	exports.default = DeleteCommand;
});